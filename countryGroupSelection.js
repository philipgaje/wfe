function test() {
  alert("Testing external js file");
}

function getAccessToken() {
  var token = '';
  
  var body = {
    "email": "chrisbrewer@worldfamilyenglish.com",
    "password": "worldfamilychris!#"
  };

  $.ajax({
      url: 'https://apps.dwe.hk/wfhk/api/auth/token/generate',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: body,
      complete: function(result) {
          //called when complete
          alert(result);
      },

      success: function(result) {
          //called when successful
          token = result.token;
      },

      error: function(result) {
          //called when there is an error
          alert(result);
      },
  });
  
  return token;
}
