(function() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const trackingCode = urlParams.get("tracking_code");
  
  const trackingCode = 'nv1806';
  
  if(token == null) {
    getAccessToken().then(function () {
      getEventDate(trackingCode);
    });
  }
  else getEventDate(trackingCode);
})();

function getEventDate(trackingCode) {
  return fetch('https://apps.dwe.hk/wfhk/api/leads/3/info/' + trackingCode, {
    headers: {
      'Authorization': 'bearer ' + token,
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
  }).catch(function (err) {
    console.log(err);
  });
}

function getAccessToken() {
  const email = "chrisbrewer@worldfamilyenglish.com";
  const password = "worldfamilychris!#";
  
  return fetch('https://apps.dwe.hk/wfhk/api/auth/token/generate', {
    method: 'POST',
    body: "email=" + email + "&password=" + password,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (res) {
      return res.json();
  }).then(function (data) {
      token = data.token;
  }).catch(function (err) {});
}
