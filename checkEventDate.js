let authToken = null;

(function() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const trackingCode = urlParams.get("tracking_code");
  
  const trackingCode = 'nv1806';
  
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
    checkDate(data['end_date']);
  }).catch(function (err) {
    console.log(err);
  });
}

function checkDate(date) {
  if(date === null) {
    console.log("Date is NULL");
    window.location.replace("https://www.worldfamily.com.hk/free-trial/");
  }
  
  else {
    const parts = date.match(/.{2}/g);
    const endDate = new Date('20' + parts[0], parts[1] - 1, parts[2]);
    const currentDate = (new Date()).setHours(0,0,0,0);
    
    if(currentDate >= endDate) {
      alert("<<是次講座名額已滿，多謝各位支持﹗>>");
    }
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
