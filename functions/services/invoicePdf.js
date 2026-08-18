'use strict';
// Renders a rental invoice as a PDF buffer, emailed as an attachment on
// application approval (see controllers/dataController.js). Pure JS via
// pdfkit — no headless browser or native binary, so this runs fine inside a
// Cloud Function.

const PDFDocument = require('pdfkit');

function money(v) {
  return 'R ' + Number(v || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
}

// rental: { ref, clientName, equipmentName, vehicleLabel, startDate,
//   returnDate, valueZar, orgName }
function buildInvoicePdf(rental) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.fontSize(20).fillColor('#00838a').text('EquipCore', { continued: false });
    doc.fontSize(10).fillColor('#555').text('Novara Terra Industrials — Rental Invoice');
    doc.moveDown(1.5);

    doc.fontSize(14).fillColor('#000').text(`Invoice — ${rental.ref || ''}`);
    doc.fontSize(9).fillColor('#777').text(`Issued ${fmtDate(new Date())}`);
    doc.moveDown(1);

    doc.strokeColor('#ddd').moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.8);

    doc.fontSize(11).fillColor('#000');
    const row = (label, value) => {
      const y = doc.y;
      doc.font('Helvetica-Bold').text(label, 50, y, { width: 140 });
      doc.font('Helvetica').text(value || '—', 190, y, { width: 355 });
    };
    row('Client:', rental.clientName);
    row('Organisation:', rental.orgName);
    row('Equipment:', rental.equipmentName);
    if (rental.vehicleLabel) row('Vehicle:', rental.vehicleLabel);
    row('Rental Period:', `${fmtDate(rental.startDate)} – ${fmtDate(rental.returnDate)}`);
    doc.moveDown(1);

    doc.strokeColor('#ddd').moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.8);

    doc.font('Helvetica-Bold').fontSize(13).text('Total Rental Value', 50, doc.y, { continued: true, width: 300 });
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#00838a').text(money(rental.valueZar), { align: 'right' });
    doc.moveDown(2);

    doc.fontSize(8).fillColor('#999').text(
      'This invoice was generated automatically upon rental application approval. ' +
      'Amounts are in South African Rand (ZAR). For queries, contact your account administrator.',
      { width: 495 }
    );

    doc.end();
  });
}

module.exports = { buildInvoicePdf };
