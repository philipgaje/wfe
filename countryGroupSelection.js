var token = null;

function getCountryGroups(dropdown) {
  return fetch('https://apps.dwe.hk/wfhk/api/leads/3/country_group', {
    headers: {
      'Authorization': 'bearer ' + token,
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log('groups', data);
  }).catch(function (err) {
    console.log('something went wrong', err);
  });
}

function setCountryGroupOptions() {
  let dropdown = $("#區域");
  
  dropdown.empty();
  
  dropdown.append('<option selected="true" disabled>Choose Country Group</option>');
  
  dropdown.attr('selectedIndex', 0);
  
  if(token == null) {
    getAccessToken().then(function () {
      getCountryGroups(dropdown);
    });
  }
  
//   getCountryGroups(dropdown);
}

function handleCountryGroupSelect() {
  let country_group_id = this.value;
  alert(country_group_id);
}

function getAccessToken() {
  var email = "chrisbrewer@worldfamilyenglish.com";
  var password = "worldfamilychris!#";
  
  return fetch('https://apps.dwe.hk/wfhk/api/auth/token/generate', {
    method: 'POST',
    body: "email=" + email + "&password=" + password,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (res) {
      return res.json();
  }).then(function (data) {
      console.log('token', data);
      token = data.token;
  }).catch(function (err) {
      console.log('something went wrong', err);
  });
}
  
//   dropdown.append($('<option></option>').attr('value', 1).text("Group 1"));
//   dropdown.append($('<option></option>').attr('value', 2).text("Group 2"));
//   dropdown.append($('<option></option>').attr('value', 3).text("Group 3"));
  
//   const url = "https://apps.dwe.hk/wfhk/api/leads/3/country_group"
  
//   $.getJSON(url, function (data) {
//     $.each(data, function (key, entry) {
//       dropdown.append($('<option></option>').attr('value', entry.country_group_id).text(entry.name));
//     })
//   });
