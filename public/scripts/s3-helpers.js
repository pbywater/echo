function saveFileToLocalStorage(file) {
  const reader = new FileReader();
  localStorage.setItem('imageName', file.name);
  reader.addEventListener('load', () => {
    localStorage.setItem('imageToSave', reader.result);
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function retrieveImage() {
  const image = localStorage.getItem('imageToSave');
  const fileName = localStorage.getItem('imageName');
  if (image && fileName) {
    const retrievedImage = dataURLtoFile(image, fileName);
    return retrievedImage;
  }

  return null;
}

function addTagAndHeadingToDB(tag, heading, imageId) {
  console.log('addTagAndHeadingToDB');
  console.log('adding tag of ', tag, 'heading of ', heading, 'imageID of ', imageId);
  $.ajax({
    method: 'PUT',
    url: 'memory-input-photo',
    data: { tag, heading, imageId },
    success: () => { imageUploadPending = false; },
  });
}

function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

function removeImagesFromStorage() {
  localStorage.removeItem('imageToSave');
  localStorage.removeItem('tagAndHeading');
}
