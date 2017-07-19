(function () {
  document.getElementById('camera-input').onchange = function () {
    const files = document.getElementById('camera-input').files;
    const file = files[0];
    if (file == null) {
      return alert('No file selected.');
    }
    getSignedRequest(file);
  };
}());

function getSignedRequest(file) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
        saveInLocalStorage(response.key);
      } else {
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}

function uploadFile(file, signedRequest, url) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.getElementById('photo-save').src = url;
      } else {
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}

function saveInLocalStorage(imageId) {
  localStorage.setItem('addedImage', imageId);
}

document.getElementById('photo-save').onclick = function (e) {
  e.preventDefault();
  if (localStorage.getItem('addedImage')) {
    const tag = $('.tag-input--photo')[0].value;
    const heading = $('.heading-input--photo')[0].value;
    const imageId = localStorage.getItem('addedImage');
    $.ajax({
      method: 'PUT',
      url: 'memory-input-photo',
      data: { tag, heading, imageId },
      success: localStorage.removeItem('addedImage'),
    });
  }
};
