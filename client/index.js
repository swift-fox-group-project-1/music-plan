const endpoint = "http://localhost:3000";

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token, 'iwndiwnd');

  $.ajax(`http://localhost:3001/googleLogin`, {
    method: 'POST',
    data: {
      access_token: id_token
    }
  })
  .done(data => {
    console.log(data);
    localStorage.access_token = data.access_token;
    console.log(localStorage.access_token);
  })
  .fail(err => {
    console.log(err);
  })
  .always(() => console.log('working'));
}
