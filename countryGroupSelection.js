function getAccessToken() {
  var body = {
    "email": "chrisbrewer@worldfamilyenglish.com",
    "password": "worldfamilychris!#"
  };
  
  var token = 'bearer ';
  
  $.ajax({
      url: 'https://apps.dwe.hk/wfhk/api/auth/token/generate',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: body,
      complete: function(result) {},
      success: function(result) {
        token = token + result.token;
      },
      error: function(result) {},
  });
  
  console.log(token);
}
