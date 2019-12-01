/* globals kai, $, displayMaintenance */

/**
 * Attempt to reach the engine /ping endpoint.
 * Is successful when URL is reachable and/or endpoint returns with data
 * Fails when URL is not reachable, takes too long, or receives errors
 */

function ping() {
  $.ajax({
    url: kai.options.serverConfig.SERVER_URL.replace('/kai/api/v2/capi', '/ping'),
    type: 'GET',
    cache: false,
    timeout: kai.options.responseTimeout * 1000,
    success: function(data) {
      if ('OK' === data.status) {
        // hide maintenance page
        $('.maintenance').hide();
        $('.tnc').show();
        $('.kai-wrap').show();
      } else {
        displayMaintenance();
      }
    },
    error: function(error) {
      displayMaintenance();
    }
  });
}
