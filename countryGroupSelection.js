var token = null;

function setCountryGroupOptions() {
  let dropdown = $("#區域");
  
  dropdown.empty();
  dropdown.append('<option selected="true" disabled>請選擇區域</option>');
  dropdown.attr('selectedIndex', 0);
  
  if(token == null) {
    getAccessToken().then(function () {
      getCountryGroups(dropdown);
    });
  }
  else getCountryGroups(dropdown);
}

function getCountryGroups(dropdown) {
  return fetch('https://apps.dwe.hk/wfhk/api/leads/3/country_group', {
    headers: {
      'Authorization': 'bearer ' + token,
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    data.forEach(function (entry) {
      dropdown.append($('<option></option>').attr('value', entry.country_group_id).text(entry.name));
    })
  }).catch(function (err) {
    console.log('something went wrong', err);
  });
}

function handleCountryGroupSelect() {
  let country_group_id = this.value;
  let dropdown = $(country_group_id);
  
  dropdown.empty();
//   dropdown.append('<option selected="true" disabled>請選擇區域</option>');
//   dropdown.attr('selectedIndex', 0);
  
  if(token == null) {
    getAccessToken().then(function () {
      getCountries(country_group_id, dropdown);
    });
  }
  else getCountries(country_group_id, dropdown);
}

function getCountries(country_group_id, dropdown) {
  return fetch('https://apps.dwe.hk/wfhk/api/leads/3/country?country_group_id=' + country_group_id, {
    headers: {
      'Authorization': 'bearer ' + token
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
//     data.forEach(function (entry) {
//       dropdown.append($('<option></option>').attr('value', entry.country_id).text(entry.name));
//     })
  }).catch(function (err) {
    console.log('something went wrong', err);
  });
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
      token = data.token;
  }).catch(function (err) {
      console.log('something went wrong', err);
  });
}
