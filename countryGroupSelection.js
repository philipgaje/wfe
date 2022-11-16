var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwcy5kd2UuaGtcL3dmaGtcL2FwaVwvYXV0aFwvdG9rZW5cL2dlbmVyYXRlIiwiaWF0IjoxNjY4NTU4NjAxLCJleHAiOjE2NzA5Nzc4MDEsIm5iZiI6MTY2ODU1ODYwMSwianRpIjoiVXo5ZFJrOGpkSGlnTnRWTSIsInN1YiI6MywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.omzXkCre6BMtftsnuXFgRVscvLnsx8VP9U3uc2Lrbpg';

function setCountryGroupOptions() {
  let dropdown = $("#區域");
  
  dropdown.empty();
  
  dropdown.append('<option selected="true" disabled>Choose Country Group</option>');
  
  dropdown.attr('selectedIndex', 0);
  
  getAccessToken();
  
//   if(token) {
//     getAccessToken().then(function () {
//       // fetch country groups
//     }
//   }
                          
  // fetch country groups
  
//   dropdown.append($('<option></option>').attr('value', 1).text("Group 1"));
//   dropdown.append($('<option></option>').attr('value', 2).text("Group 2"));
//   dropdown.append($('<option></option>').attr('value', 3).text("Group 3"));
  
//   const url = "https://apps.dwe.hk/wfhk/api/leads/3/country_group"
  
//   $.getJSON(url, function (data) {
//     $.each(data, function (key, entry) {
//       dropdown.append($('<option></option>').attr('value', entry.country_group_id).text(entry.name));
//     })
//   });
}

function handleCountryGroupSelect() {
  let country_group_id = this.value;
  alert(country_group_id);
}

function getAccessToken() {
  var body = {
    "email": "chrisbrewer@worldfamilyenglish.com",
    "password": "worldfamilychris!#"
  };
	
  var email = "chrisbrewer@worldfamilyenglish.com";
  var password = "worldfamilychris!#";
  
  return fetch('https://apps.dwe.hk/wfhk/api/auth/token/generate', {
    method: 'POST',
    body: "email=" + email + "&password=" + password,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (res) {
      return res.json;
  }).then(function (data) {
      console.log('token', data);
      token = data.token;
  }).catch(function (err) {
      console.log('something went wrong', err);
  });
}
