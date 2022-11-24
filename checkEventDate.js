let authToken = null;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const trackingCode = urlParams.get("tracking_code");

(function() {
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
    if(data['status'] && data['end_date'] !== null)
      checkDate(data['end_date']);
    else
      window.location.replace("https://www.worldfamily.com.hk/free-trial/");
  }).catch(function (err) {
    console.log(err);
  });
}

function checkDate(date) {
  const parts = date.match(/.{2}/g);
  const endDate = new Date('20' + parts[0], parts[1] - 1, parts[2]);
  const currentDate = new Date();

  if(currentDate.setHours(0,0,0,0) >= endDate) {
    alert("<<是次講座名額已滿，多謝各位支持﹗>>");
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
