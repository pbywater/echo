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
    }, 1000);

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
      $(`#${menuItemId}`)
        .removeClass('wipe')
        .removeClass('finished')
        .addClass('normal');
      $('.menu-open-button')
        .removeClass('active');
      $(`${restSelector}`)
        .fadeIn();
    });
  }

  menuItemIds.forEach((menuItemId) => {
    $(`#${menuItemId}`).on('click', () => {
      setMenuItemClick(menuItemId);
    });
  });
});
