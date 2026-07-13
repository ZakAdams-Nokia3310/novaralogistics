'use strict';
// Bounces visitors on Firebase's default hosting domains to the custom domain.
// Loaded first, before other resources, so the redirect fires as early as possible.
(function () {
  var CANONICAL_HOST = 'logisticsandconstructionrentals.com';
  var OLD_HOSTS = ['novara-f985b.web.app', 'novara-f985b.firebaseapp.com'];
  if (OLD_HOSTS.indexOf(location.hostname) !== -1) {
    location.replace('https://' + CANONICAL_HOST + location.pathname + location.search + location.hash);
  }
})();
