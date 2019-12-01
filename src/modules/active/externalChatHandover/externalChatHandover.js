function openLiveBankWindow(url) {
  var left = screen.width / 2 - 854 / 2;
  var top = screen.height / 2 - 480 / 2;
  var windowoption =
    'width=854,height=480,left=' +
    left +
    ',top=' +
    top +
    ',resizable=yes,scrollbars=yes' +
    top +
    ', left=' +
    left;
  var mediumType = getParameter(url, 'mediumType');
  var entryType = getParameter(url, 'entryType');
  var subjectId = getParameter(url, 'subjectId');
  if (!subjectId) subjectId = 'Default';
  var token = getParameter(url, 'token');
  var chaturl = url.split('?')[0];

  var params = {
    mediumType: mediumType,
    entryType: entryType,
    subjectId: subjectId,
    token: token
  };
  openWindowWithPost(chaturl, windowoption, '_system', params);
}

function openWindowWithPost(url, windowoption, name, params) {
  var form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', url);
  form.setAttribute('target', '_system');

  for (var i in params) {
    if (params.hasOwnProperty(i)) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = i;
      input.value = params[i];
      form.appendChild(input);
    }
  }

  document.body.appendChild(form);
  var popupwindow = window.open(url, '_system', windowoption);
  form.submit();
  document.body.removeChild(form);
}

function getParameter(url, parameterName) {
  var result = null,
    tmp = [];
  var items = url.split('?')[1].split('&');
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split('=');
    if (tmp[0].toUpperCase() === parameterName.toUpperCase()) result = decodeURIComponent(tmp[1]);
  }
  return result;
}
