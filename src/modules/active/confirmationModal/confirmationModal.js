/* globals document, langClickEvent */

// confirmation modal functions

document.getElementById('confirmation-agree').addEventListener('click', function() {
  langClickEvent(document.getElementById('confirmation-modal').dataset.lang);
});
