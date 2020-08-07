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
  $("#dashboard-card").hide();
  $("#dashboard-loading").show();
  fetchData()
}

function home(event) {
  event.preventDefault();
  $("#dashboard").show();
  $("#wishlist-page").hide();
  $("#dashboard-card").hide();
  $("#dashboard-loading").show();
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
    localStorage.id = data.id;
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
    localStorage.id = data.id;
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
    localStorage.email = data.email;
    localStorage.username = data.username;
    localStorage.access_token = data.access_token;
    auth();
    // console.log(localStorage.access_token);
  })
  .fail(err => {
    console.log(err);
  })
  .always(() => console.log('working'));
}

function fetchData() {
  $("#searching-name").html(`Welcome, this is where you can see the concert list!`);
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
          $("#dashboard-card").show();
          $("#dashboard-loading").hide();
          $(`#content`).empty();
          // console.log(data);

          data.data.forEach((event) => {
            // console.log(event);
            // const id = event.id
            // console.log(id, 'id di tiap iteration<<');
            let images;
            for (let i of event.images)
            {
              if (i.ratio == "16_9")
              {
                images = i.url;
                break;
              }
            }

            let priceRange;
            if (event.priceRanges)
              priceRange = `${event.priceRanges[1].max} - ${event.priceRanges[1].min} ${event.priceRanges[1].currency} (Standard including fees)`;
            else
              priceRange = `Data cannot be retrieved.`

              $(`#content`).append(
                  `
                  <div class="col mb-4 cardhover" id=${event.id}>
                    <div class="card h-100">
                      <img id="${event.id}-image" src="${images}" class="card-img-top" style="max-width: 100%; max-height: 100%;" alt="...">
                      <div class="card-body">
                        <h5 id="${event.id}-name" class="card-title font-weight-bold">${event.name}</h5>
                        <p class="card-text">
                        <strong>Venue</strong> : <span id="${event.id}-venue">${event._embedded.venues[0].name}</span> <br>
                        <strong>Start</strong> : <span id="${event.id}-date">${event.dates.start.localDate} at ${event.dates.start.localTime}</span> <br>
                        <strong>Country/Region</strong> : <span id="${event.id}-country">${event.dates.timezone}</span> <br>
                        <strong>Price</strong> : <span id="${event.id}-price">${priceRange}</span>
                        </p>
                        <a onclick="addToWishList(event, ${event.id})" href="" class="font-2" data-toggle="modal" data-target="#staticBackdrop">Add to your wishlist</a>
                    </div>
                    <a  class="btn btn-primary" data-toggle="modal" data-target="#BookingTicket" id="booking-button" onclick="getQR('${event.url}')">Book This</a>
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
  $("#dashboard-card").hide();
  $("#dashboard-loading").show();
  console.log('masuk');
  const keyword = $('#inlineFormInputName2').val()
  $("#searching-name").html(`Here is the list of <strong>${keyword}</strong> concert!`);
  $.ajax({
    method: 'get',
    url: `${endpoint}/get-events/search/${keyword}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(data => {
      // console.log(data, '<< data');
      $("#dashboard-card").show();
      $("#dashboard-loading").hide();
      $(`#content`).empty();
            data.data.forEach((event) => {
              let images;
              for (let i of event.images)
              {
                if (i.ratio == "16_9")
                {
                  images = i.url;
                  break;
                }
              }

              let priceRange;
              if (event.priceRanges)
                priceRange = `${event.priceRanges[1].max} - ${event.priceRanges[1].min} ${event.priceRanges[1].currency} (Standard including fees)`;
              else
                priceRange = `Data cannot be retrieved.`
              $(`#content`).append(
                `
                <div class="col mb-4 cardhover" id=${event.id}>
                  <div class="card h-100">
                    <img id="${event.id}-image" src="${images}" class="card-img-top" style="max-width: 100%; max-height: 100%;" alt="...">
                    <div class="card-body">
                      <h5 id="${event.id}-name" class="card-title font-weight-bold">${event.name}</h5>
                      <p class="card-text">
                      <strong>Venue</strong> : <span id="${event.id}-venue">${event._embedded.venues[0].name}</span> <br>
                      <strong>Start</strong> : <span id="${event.id}-date">${event.dates.start.localDate} at ${event.dates.start.localTime}</span> <br>
                      <strong>Country/Region</strong> : <span id="${event.id}-country">${event.dates.timezone}</span> <br>
                      <strong>Price</strong> : <span id="${event.id}-price">${priceRange}</span>
                      </p>
                      <a onclick="addToWishList(event, ${event.id})" href="" class="font-2" data-toggle="modal" data-target="#staticBackdrop">Add to your wishlist</a>
                  </div>
                  <a  class="btn btn-primary" data-toggle="modal" data-target="#BookingTicket" id="booking-button" onclick="getQR('${event.url}')">Book This</a>
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
    html: `<a  class="btn btn-primary font-2" data-toggle="modal" data-target="#BookingTicket" id="booking-button" onclick="sendmail('${params}')">
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
    html: '<label class="font-2">Email</label>' +
          '<input id="swal-input1" class="swal2-input font-2" placeholder="Enter your email...">',
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
                      title: 'Success!',
                      text: 'and sent it to your email'
                  })
                  auth()
              })
              .fail(err => {
                  console.log(err, 'ini err broo <<');
                  Swal.fire({
                      icon: 'error',
                      title: 'Failed'
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

function addToWishList(event) {
  event.preventDefault();
  const concertId = arguments[1].id;
  console.log('masuk', arguments);
  console.log(concertId);

  const concertName = $(`#${concertId}-name`).text();
  const concertVenue = $(`#${concertId}-venue`).text();
  const concertDate = $(`#${concertId}-date`).text();
  const concertCountry = $(`#${concertId}-country`).text();
  const concertPrice = $(`#${concertId}-price`).text();

  $(`#modal-title`).html(`<strong>${concertName}</strong> was added to your wishlist!`);
  $('#modal-description').html(`<strong>Venue</strong> : ${concertVenue} <br>
  <strong>Start</strong> : ${concertDate} <br>
  <strong>Country/Region</strong> : ${concertCountry} <br>
  <strong>Price</strong> : ${concertPrice}`);

  $.ajax(`${endpoint}/wishlist`, {
    method: 'POST',
    data: {
      name: concertName,
      venue: concertVenue,
      start: concertDate,
      country: concertCountry,
      price: concertPrice
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(data => {
    console.log(data);


  })
  .fail(err => console.log(err))
  .always(console.log('post wishlist'));
}

function wishlistPage() {
  $("#dashboard").hide();
  $("#wishlist-page").show();
}

function seeWishlist(event) {
  event.preventDefault();
  wishlistPage();

  $.ajax(`${endpoint}/wishlist`, {
    method: "GET",
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(data => {
    console.log(data);

    data.forEach((x) => {
      $(`#wishlist`).append(
        `
        <div class="col mb-4 cardhover" id=${x.id}>
          <div class="card h-100">
            <img id="${x.id}-image" src="" class="card-img-top" style="max-width: 100%; max-height: 100%;" alt="...">
            <div class="card-body">
              <h5 id="${x.id}-name" class="card-title font-weight-bold">${x.name}</h5>
              <p class="card-text">
              <strong>Venue</strong> : <span id="${x.id}-venue">${x.venue}</span> <br>
              <strong>Start</strong> : <span id="${x.id}-date">${x.date}</span> <br>
              <strong>Country/Region</strong> : <span id="${x.id}-country">${x.country}</span> <br>
              <strong>Price</strong> : <span id="${x.id}-price">${x.price}</span>
              </p>
          </div>
          <a  class="btn btn-danger" data-toggle="modal" data-target="#BookingTicket" id="booking-button" onclick="deleteWishlist('${x.name}')">Delete</a>
        </div>
        `
      );
    });
  })
  .fail(err => console.log(err))
  .always(console.log('get wishlist'));
}


function deleteWishlist(event) {
  // event.preventDefault();

  console.log('test in delete', arguments);
  $.ajax(`${endpoint}/wishlist/${event}`, {
    method: "DELETE",
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(data => {
    auth();
    console.log(data);

  })
  .fail(err => console.log(err))
  .always(() => console.log('delete wishlist'));
}
