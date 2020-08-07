const endpoint = "http://localhost:3000";

$(document).ready(function () {
  auth()
})

function auth() {
  if (localStorage.access_token) {
    $('.registerpage').hide()
    $('.loginpage').hide()
    homepage()
  } else {
    $('.loginpage').show()
    $('.registerpage').hide()
    $('#dashboard').hide()
  }
}

function loginPage() {
  $('.registerpage').hide()
  $('.loginpage').show()
  auth()
}

function registerPage() {
  $('.loginpage').hide()
  $('.registerpage').show()
}

function logout (event) {
  console.log('sini');
  event.preventDefault()
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
  });
  auth()
}

function homepage() {
  $('.loginpage').hide()
  $('.registerpage').hide()
  $("#user").text(`Welcome ${localStorage.username}`);
  $('#dashboard').show();
  fetchData()
}

function home(event) {
  event.preventDefault()
  fetchData()
}

function login(event) {
  event.preventDefault();
  $.ajax(`${endpoint}/login`, {
    method: "POST",
    data: {
      email: $("#email-login").val(),
      password: $("#password-login").val()
    }
  })
  .done(data => {
    localStorage.access_token = data.access_token;
    localStorage.email = data.email;
    localStorage.username = data.username;

    auth();
  })
  .fail(err => console.log(err))
  .always(() => console.log('login'));
}

function toRegister(event) {
  event.preventDefault();
  registerPage();
}

function cancelRegister(event) {
  event.preventDefault();
  loginPage();
}

function registerPost(event) {
  event.preventDefault();

  console.log('testing registerpost')
  console.log($("#username-register").val())
  $.ajax(`${endpoint}/register`, {
    method: "POST",
    data: {
      username: $("#username-register").val(),
      email: $("#email-register").val(),
      password: $("#password-register").val()
    }
  })
  .done(user => {
    console.log(user, 'done after ajax register');
    localStorage.access_token = user.access_token;
    localStorage.email = data.email;
    localStorage.username = data.username;

    auth();
  })
  .fail(err => console.log(err))
  .always(() => console.log('registering user'));
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  // console.log(id_token, 'iwndiwnd');

  $.ajax(`${endpoint}/googleLogin`, {
    method: 'POST',
    data: {
      access_token: id_token
    }
  })
  .done(data => {
    // console.log(data);
    localStorage.access_token = data.access_token;
    // console.log(localStorage.access_token);
  })
  .fail(err => {
    console.log(err);
  })
  .always(() => console.log('working'));
}

function fetchData() {
  $.ajax({
      method: `get`,
      url: `http://localhost:3000/get-eventS`,
      headers: {
        access_token: localStorage.access_token
      }
  })
      .done((data) => {
          console.log(data);
          // console.log(data.data[0].name);
          // console.log(data.data[0].dates.start.localDate);
          // console.log(data.data[0].promoter.name);
          $(`#content`).empty();
          // console.log(data);

          data.data.forEach((event) => {
            // console.log(event);
            // const id = event.id
            // console.log(id, 'id di tiap iteration<<');
              $(`#content`).append(
                  `
                  <div class="col mb-4 cardhover">
                    <div class="card">
                      <img src="${event.images[0].url}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">
                        <!-- This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. -->
                        Venue : ${event._embedded.venues[0].name} <br>
                        Start : ${event.dates.start.localDate} at ${event.dates.start.localTime} <br>
                        Timezone : ${event.dates.timezone}
                        </p>
                        <a  class="btn btn-primary" data-toggle="modal" data-target="#BookingTicket" id="booking-button" onclick="getQR('${event.url}')">
                        Book This
                        </a>
                      </div>
                    </div>
                  </div>
                  `
              );
          });
      })
      .catch((err) => {
          console.log(err);
      });
}

function search(event) {
  event.preventDefault()
  console.log('masuk');
  const keyword = $('#inlineFormInputName2').val()
  $.ajax({
    method: 'get',
    url: `${endpoint}/get-events/search/${keyword}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(data => {
      // console.log(data, '<< data');
      $(`#content`).empty();
            data.data.forEach((event) => {
                $(`#content`).append(
                  `
                  <div class="col mb-4 cardhover">
                    <div class="card">
                      <img src="${event.images[0].url}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">
                        <!-- This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. -->
                        Venue : ${event._embedded.venues[0].name} <br>
                        Start : ${event.dates.start.localDate} at ${event.dates.start.localTime} <br>
                        Timezone : ${event.dates.timezone}
                        </p>
                        <a  class="btn btn-primary" data-toggle="modal" data-target="#BookingTicket" id="booking-button" onclick="getQR('${{params: event.url, name: event.name, venue: event._embedded.venues[0].name, start: {date: event.dates.start.localDate, time: event.dates.start.localTime, timezone: event.dates.timezone}}}')">
                        Book This
                        </a>
                      </div>
                    </div>
                  </div>
                  `
              );
            });
    })
    .fail(err => {
      console.log(err);
    })
}

function getQR(params) {
  Swal.fire({
    title: 'Sweet!',
    text: 'Modal with a custom image.',
    imageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${params}/150/150`,
    imageWidth: 150,
    imageHeight: 150,
    imageAlt: 'Custom image',
    html: `<a  class="btn btn-primary" data-toggle="modal" data-target="#BookingTicket" id="booking-button" onclick="sendmail('${params}')">
    Book This
    </a>`,
    focusConfirm: false,
    showCancelButton: true,
  })
}

function sendmail(params) {
  // event.preventDefault()
  console.log(params, '<<');
  let url = params
  Swal.fire({
    title: 'Sweet!',
    text: 'Modal with a custom image.',
    imageAlt: 'Custom image',
    html: '<label>email</label>' +
          '<input id="swal-input1" class="swal2-input" placeholder="email">',
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      let data = $('#swal-input1').val()
      console.log(data);
          $.ajax({
                  method: 'get',
                  url: `${endpoint}/sent`,
                  headers: {
                      access_token: localStorage.access_token
                  },
                  data: {
                    data: data,
                    id: url
                  }
              })
              .done((result) => {
                console.log(result, '<>');
                  Swal.fire({
                      icon: 'success',
                      title: 'Success add new Todo',
                      text: 'and sent it to your email'
                  })
                  auth()
              })
              .fail(err => {
                  console.log(err, 'ini err broo <<');
                  Swal.fire({
                      icon: 'error',
                      title: 'Failed add new Todo'
                  })
              })
    }
  })
}

function Qrcode(params) {
  $.ajax({
    method: 'get',
    url: `${endpoint}/sent`,
    data: {
      url: params
    }
  })
    .done(data => {
      console.log(data, '<< data di qr');
    })
    .fail(err => {
      console.log(err, 'di qr');
    })
  console.log(params, '<<<<<<');
}