function transfer() {
  var tablink;
  chrome.tabs.getSelected(null, function (tab) {
    const original_url = tab.url
    tablink = tab.url;
    if (tablink.length > 20) {
      tablink = tablink.slice(0, 20) + ' ...';
    }
    $('#site').text(tablink);

    var url = new XMLHttpRequest();
    params = 'url=' + original_url;
    var markup =
      'url=' + original_url + '&html=' + document.documentElement.innerHTML;
    url.open('POST', 'http://localhost:8000', true);
    url.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    url.onload = () => {
      if (url.responseText === 'benign') {
        $('#div1').text(url.responseText);
      }
      if(url.responseText === "Malware")
      {
        $('#div1').text(url.responseText);
      }
      if(url.responseText === "defacement")
      {
        $('#div1').text(url.responseText);
      }
      if(url.responseText === "phishing ")
      {
        $('#div1').text(url.responseText);
      }
      else {
        $('#div2').text(url.responseText);
      }
      return url.responseText;
    };
    url.send(markup);
  });
}

$(document).ready(function () {
  $('button').click(function () {
    var val = transfer();
  });
});

chrome.tabs.getSelected(null, function (tab) {
  var tablink = tab.url;
  if (tablink.length > 30) {
    tablink = tablink.slice(0, 30) + ' ....';
  }
  $('#site').text(tablink + '\n\n');
});
