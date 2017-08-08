function saveFileToLocalStorage(file, fileSource) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    localStorage.setItem(`toSaveFrom${fileSource}`, reader.result);
    localStorage.setItem(`${fileSource}fileName`, reader.name);
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function retrieveFile(fileSource) {
  const file = localStorage.getItem(`toSaveFrom${fileSource}`);
  const fileName = localStorage.getItem(`${fileSource}fileName`);
  if (file && fileName) {
    const retrievedFile = dataURLtoFile(file, fileName);
    return retrievedFile;
  }

  return null;
}

function addTagAndHeadingToDB(tag, heading, imageId) {
  $.ajax({
    method: 'PUT',
    url: 'memory-input-photo',
    data: { tag, heading, imageId },
    success: () => { uploadPending = false; },
  });
}

// https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
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

function removeItemsFromStorage(fileSource) {
  localStorage.removeItem(`toSaveFrom${fileSource}`);
  localStorage.removeItem(`${fileSource}fileName`);
  localStorage.removeItem(`${fileSource}TagAndHeading`);
}

module.exports = {
  removeItemsFromStorage,
  dataURLtoFile,
  addTagAndHeadingToDB,
  retrieveFile,
  saveFileToLocalStorage,
};
