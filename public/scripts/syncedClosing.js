document.addEventListener('click', () => {
  if ($('.popupBoxHolder').length === 1) {
    $('.menu-open')
      .prop('checked', false);
  } else {
    $('.menu-open')
      .prop('disabled', false);
  }
});
