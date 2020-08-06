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
  fetchData()
}

function home(event) {
  event.preventDefault()
  fetchData()
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
          // console.log(data);
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
                  <div class="col mb-4">
                    <div class="card">
                      <img src="${event.images[0].url}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
                  <div class="col mb-4">
                    <div class="card">
                      <img src="${event.images[0].url}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a  class="btn btn-primary" data-toggle="modal" data-target="#BookingTicket" id="booking-button" onclick="processBooking(event)">
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
    html: `<a href="" onclick="sendmail(event)">Send To Your Email</a>`,
    focusConfirm: false,
    showCancelButton: true,
  })
}

function sendmail(event) {
  event.preventDefault()
  console.log(event);
  Swal.fire({
    title: 'Sweet!',
    text: 'Modal with a custom image.',
    imageAlt: 'Custom image',
    html: `<a href="" onclick="sendmail(event)">Send To Your Email</a>`,
    focusConfirm: false,
    showCancelButton: true,
  })
}