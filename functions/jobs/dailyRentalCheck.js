'use strict';
// Daily sweep over ACTIVE rentals — flags overdue ones and sends a heads-up
// notification a few days before the return date. This is the only
// time-triggered function in this codebase; everything else is HTTP-request-
// triggered (see functions/index.js's exports.api). Invoked by
// exports.dailyRentalCheck (functions/index.js), a firebase-functions/v2/
// scheduler onSchedule trigger.
//
// No "already notified" flag needed on Rental: the upcoming-return reminder
// only fires on the exact day daysUntilReturn equals REMINDER_DAYS_BEFORE
// (naturally fires once per rental, given the schedule runs daily), and the
// overdue flip only happens while status is still ACTIVE — once flipped to
// OVERDUE, ListActiveRentals no longer selects it, so it can't refire either.

const { runQuery, runMutation } = require('../services/dataConnect');
const { sendMail } = require('../services/email');

const REMINDER_DAYS_BEFORE = 2;

async function notify(userId, email, title, body, linkPath) {
  if (userId) {
    try {
      await runMutation('CreateNotification', { userId, type: 'RENTAL_STATUS', title, body, linkPath: linkPath || null });
    } catch (err) {
      console.error('[dailyRentalCheck] notify', err.message);
    }
  }
  if (email) {
    try {
      await sendMail({ to: email, subject: title, text: body });
    } catch (err) {
      console.error('[dailyRentalCheck] sendMail', err.message);
    }
  }
}

// Plain YYYY-MM-DD date-only arithmetic — Rental.returnDate is a Date
// scalar, not a Timestamp, so there's no time-of-day/timezone component to
// worry about here.
function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(String(dateStr).slice(0, 10) + 'T00:00:00');
  return Math.round((target - today) / 86400000);
}

async function runDailyRentalCheck() {
  const data = await runQuery('ListActiveRentals', {});
  const rentals = data.rentals || [];
  let reminders = 0, overdue = 0;

  for (const r of rentals) {
    const applicant = r.application?.applicantUser;
    const ref = r.application?.ref || r.equipmentName;
    const diff = daysUntil(r.returnDate);

    if (diff < 0) {
      try {
        await runMutation('UpdateRentalStatus', { id: r.id, status: 'OVERDUE' });
        await runMutation('CreateRentalEvent', {
          rentalId: r.id,
          type: 'STATUS_CHANGED',
          description: 'Status changed from active to overdue (automatic — return date has passed).',
          fromStatus: 'ACTIVE',
          toStatus: 'OVERDUE',
          actorUserId: null,
        });
        await notify(
          applicant?.id, applicant?.email,
          'Rental overdue',
          `Your rental for ${r.equipmentName} (${ref}) is overdue — please arrange the return as soon as possible.`,
          'my-rentals',
        );
        overdue++;
      } catch (err) {
        console.error('[dailyRentalCheck] overdue flip failed for rental', r.id, err.message);
      }
    } else if (diff === REMINDER_DAYS_BEFORE) {
      await notify(
        applicant?.id, applicant?.email,
        'Return date approaching',
        `Your rental for ${r.equipmentName} (${ref}) is due back in ${REMINDER_DAYS_BEFORE} days.`,
        'my-rentals',
      );
      reminders++;
    }
  }

  console.log(`[dailyRentalCheck] scanned ${rentals.length} active rental(s) — ${reminders} reminder(s) sent, ${overdue} flagged overdue.`);
  return { scanned: rentals.length, reminders, overdue };
}

module.exports = { runDailyRentalCheck };
