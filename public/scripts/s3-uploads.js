
function s3handling(fileSource) {
  document.getElementById(`${fileSource}-input`).onchange = function () {
    const files = document.getElementById(`${fileSource}-input`).files;
    const file = files[0];
    if (file == null) {
      return new Error('No file selected.');
    }
    if (navigator.onLine) {
      getSignedRequest(file);
    } else if (localStorage.getItem(`toSaveFrom${fileSource}`) && localStorage.getItem(`${fileSource}TagAndHeading`)) {
      alert("Sorry - you can only add one photo/audio memory while you're offline");
    } else {
      saveFileToLocalStorage(file, fileSource);
      updateTagAndHeading();
    }
  };

  let uploadPending = false;

  function getSignedRequest(file) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          uploadFile(file, response.signedRequest, response.url);
          uploadPending = true;
          updateTagAndHeading(response.imageId);
        } else {
          removeItemsFromStorage(fileSource);
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
          document.getElementById(`${fileSource}-save`).src = url;
        } else {
          return new Error('Could not upload file.');
        }
      }
    };
    xhr.open('PUT', signedRequest);
    xhr.send(file);
  }

  function updateTagAndHeading(imageId) {
    document.getElementById('camera-save').onclick = function (e) {
      e.preventDefault();
      const tag = $(`.tag-input--${fileSource}`)[0].value;
      const heading = $(`.heading-input--${fileSource}`)[0].value;
      if (uploadPending) {
        addTagAndHeadingToDB(tag, heading, imageId);
      } else if (!navigator.onLine) {
        const tagAndHeading = JSON.stringify({ tag, heading });
        localStorage.setItem(`${fileSource}TagAndHeading`, tagAndHeading);
      }
    };
    if (navigator.onLine && localStorage.getItem(`${fileSource}TagAndHeading`)) {
      const tagAndHeading = JSON.parse(localStorage.getItem(`${fileSource}TagAndHeading`));
      addTagAndHeadingToDB(tagAndHeading.tag, tagAndHeading.heading, imageId);
      localStorage.removeItem(`toSaveFrom${fileSource}`);
    }
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem(`${fileSource}TagAndHeading`) && navigator.onLine) {
      const file = retrieveImage();
      if (file) {
        getSignedRequest(file);
      } else {
        localStorage.removeItem(`${fileSource}TagAndHeading`);
      }
    } else if (localStorage.getItem(`toSaveFrom${fileSource}`)) {
      localStorage.removeItem(`toSaveFrom${fileSource}`);
    }
  });
}

s3handling('camera');
s3handling('microphone');
