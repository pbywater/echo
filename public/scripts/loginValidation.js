$('#submit-signup').on('click', ((e) => {
  e.preventDefault();
  const data = $('.signup-form').serialize();
  fetch('POST', 'add-new-user', data, handleSignUpOutput);
}),
);

$('#submit-login').on('click', ((e) => {
  e.preventDefault();
  const data = $('.login-form').serialize();
  fetch('POST', 'login', data, handleLoginOutput);
}),
);

function fetch(method, url, data, handleResponseCallback) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        handleResponseCallback(null, 'login correct');
      } else if (xhr.status === 400) {
        const jsonObj = JSON.parse(xhr.responseText);
        handleResponseCallback(jsonObj);
      }
    }
  };
  xhr.open(method, url, true);
  xhr.send(data);
}

function handleLoginOutput(err, data) {
  if (err) {
    loginError(err);
  } else {
    window.location.replace('/');
  }
}

function handleSignUpOutput(err, data) {
  if (err) {
    signUpError(err);
  } else {
    window.location.replace('/');
  }
}

function loginError(errorMessage) {
  $('.error-login')
    .text(`**${errorMessage}`)
    .css('color', '#ff3f56')
    .css('padding', '1em')
    .css('padding-top', '0')
    .show();
}
function signUpError(errorMessage) {
  $('.error-signup')
    .text(`**${errorMessage}`)
    .css('color', '#ff3f56')
    .css('padding', '1em')
    .css('padding-top', '0')
    .show();
}
