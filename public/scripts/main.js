document.addEventListener('DOMContentLoaded', (event) => {
  const menuItemIds = [
    'microphone',
    'camera',
    'cog',
    'pencil',
    'clock',
  ];

  const getRestSelector = function (menuItemIdToFilter) {
    return menuItemIds
      .filter(menuItemId => menuItemId !== menuItemIdToFilter)
      .map(menuItemId => `#${menuItemId}`)
      .join(', ');
  };

  function setMenuItemClick(menuItemId) {
    const restSelector = getRestSelector(menuItemId);

    setTimeout(() => {
      $(`#${menuItemId}`)
        .addClass('finished');
      $('.menu-open-button')
        .fadeIn()
        .addClass('active');
      $('.menu_icon')
        .addClass('hide');
      $('.close_icon')
        .removeClass('hide');
    }, 1000);

    setTimeout(() => {
      $(`.memory-input.${menuItemId}`)
        .removeClass('hide');
    }, 1100);

    $(`#${menuItemId}`)
      .removeClass('normal')
      .addClass('wipe');
    $(`${restSelector}`)
      .fadeOut();
    if (!$(`#${menuItemId}`).hasClass('finished')) {
      $('.menu-open-button')
      .fadeOut();
    }

    $('.menu-open-button').on('click', () => {
      uploadPending = false;
      $(`#${menuItemId}`)
        .removeClass('wipe')
        .removeClass('finished')
        .addClass('normal');
      $('.menu-open-button')
        .removeClass('active');
      $(`${restSelector}`)
        .fadeIn();
      $('.menu_icon')
        .removeClass('hide');
      $('.close_icon')
        .addClass('hide');
      $(`.memory-input.${menuItemId}`)
        .addClass('hide');
    });
  }

  menuItemIds.forEach((menuItemId) => {
    $(`#${menuItemId}`).on('click', () => {
      setMenuItemClick(menuItemId);
    });
  });
});
