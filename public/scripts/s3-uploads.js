(function () {
  document.getElementById('camera-input').onchange = function () {
    const files = document.getElementById('camera-input').files;
    const file = files[0];
    if (file == null) {
      return new Error('No file selected.');
    }
    getSignedRequest(file);
  };
}());

let imageUploadPending = false;

function getSignedRequest(file) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
        imageUploadPending = true;
        updateTagAndHeading(response.imageId);
      } else {
        console.log('xhr.status', xhr);
        return new Error('Could not get signed URL.');
      }
    }
  };
  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.send();
}

function uploadFile(file, signedRequest, url) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.getElementById('photo-save').src = url;
      } else {
        return new Error('Could not upload file.');
      }
    }
  };
  xhr.open('PUT', signedRequest);
  xhr.send(file);
}

function updateTagAndHeading(imageId) {
  document.getElementById('photo-save').onclick = function (e) {
    e.preventDefault();
    if (imageUploadPending) {
      const tag = $('.tag-input--photo')[0].value;
      const heading = $('.heading-input--photo')[0].value;
      $.ajax({
        method: 'PUT',
        url: 'memory-input-photo',
        data: { tag, heading, imageId },
        success: () => { imageUploadPending = false; },
      });
    }
  };
}
