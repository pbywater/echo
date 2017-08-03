(function () {
  document.getElementById('camera-input').onchange = function () {
    const files = document.getElementById('camera-input').files;
    const file = files[0];
    if (file == null) {
      return new Error('No file selected.');
    }
    if (navigator.onLine) {
      getSignedRequest(file);
    } else if (localStorage.getItem('imageToSave') && localStorage.getItem('imageTagAndHeading')) {
      console.log('already exists');
      alert("Sorry - you can only add one photo memory while you're offline");
    } else {
      console.log('getting into else');
      saveFileToLocalStorage(file);
      updateTagAndHeading();
    }
  };
}());

let imageUploadPending = false;

function getSignedRequest(file) {
  console.log('file in getSignedRequest is', file);
  const xhr = new XMLHttpRequest();
  console.log('xhr is ', xhr);
  xhr.onreadystatechange = () => {
    console.log('in xhr request');
    if (xhr.readyState === 4) {
      console.log('in xhr readyState');
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log('response in xhr is ', response);
        uploadFile(file, response.signedRequest, response.url);
        imageUploadPending = true;
        updateTagAndHeading(response.imageId);
      } else {
        console.log('error place', xhr.status);
        removeImagesFromStorage();
        return new Error('Could not get signed URL.');
      }
    }
  };
  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.send();
}

function uploadFile(file, signedRequest, url) {
  console.log('file is uploadFile is ', file);
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
  console.log('imageId in updateTagAndHeading is ', imageId);
  document.getElementById('photo-save').onclick = function (e) {
    e.preventDefault();
    const tag = $('.tag-input--photo')[0].value;
    const heading = $('.heading-input--photo')[0].value;
    if (imageUploadPending) {
      addTagAndHeadingToDB(tag, heading, imageId);
    } else if (!navigator.onLine) {
      const tagAndHeading = JSON.stringify({ tag, heading });
      localStorage.setItem('imageTagAndHeading', tagAndHeading);
    }
  };
  if (navigator.onLine && localStorage.getItem('imageTagAndHeading')) {
    const tagAndHeading = JSON.parse(localStorage.getItem('imageTagAndHeading'));
    addTagAndHeadingToDB(tagAndHeading.tag, tagAndHeading.heading, imageId);
    localStorage.removeItem('imageToSave');
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem('imageTagAndHeading') && navigator.onLine) {
    const file = retrieveImage();
    if (file) {
      console.log('file is ', file);
      getSignedRequest(file);
    } else {
      localStorage.removeItem('imageTagAndHeading');
    }
  } else if (localStorage.getItem('imageToSave')) {
    localStorage.removeItem('imageToSave');
  }
});
