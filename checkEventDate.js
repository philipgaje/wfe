let authToken = null;

(function() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const trackingCode = urlParams.get("tracking_code");
  
  const trackingCode = 'nv180';
  
  if(authToken == null) {
    getAccessToken().then(function () {
      getEventDate(trackingCode);
    });
  }
  else getEventDate(trackingCode);
})();

function getEventDate(trackingCode) {
  return fetch('https://apps.dwe.hk/wfhk/api/leads/3/info/' + trackingCode, {
    headers: {
      'Authorization': 'bearer ' + authToken,
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
    checkDate(data['event_date']);
  }).catch(function (err) {
    console.log(err);
  });
}

function checkDate(eventDate) {
  if(eventDate === null) {
    console.log("Event Date is NULL");
    window.location.replace("https://www.worldfamily.com.hk/free-trial/");
  }
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
      authToken = data.token;
  }).catch(function (err) {});
}
