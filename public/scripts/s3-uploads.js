(function () {
  document.getElementById('photo-save').onchange = function () {
    const files = document.getElementById('photo-save').files;
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
