function setCountryGroupOptions() {
  let dropdown = $("#區域");
  
  dropdown.empty();
  
  dropdown.append('<option selected="true" disabled>Choose Country Group</option>');
  
  dropdown.attr('selectedIndex', 0);
}

async function getAccessToken() {
  var body = {
    "email": "chrisbrewer@worldfamilyenglish.com",
    "password": "worldfamilychris!#"
  };
  
  const response = await $.ajax({
      url: 'https://apps.dwe.hk/wfhk/api/auth/token/generate',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: body,
      complete: function(result) {},
      success: function(result) {
        console.log(result);
      },
      error: function(result) {},
  });
  
  return response;
}
