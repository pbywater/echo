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
      $(`.menu-open:checked ~ #${menuItemId}`)
        .addClass('finished');
      $('.menu-open-button')
        .fadeIn()
        .addClass('active');
    }, 1000);

    $(`.menu-open:checked ~ #${menuItemId}`)
      .removeClass('normal')
      .addClass('wipe');
    $(`.menu-open:checked ~ ${restSelector}`)
      .fadeOut();
    $('.menu-open-button')
      .fadeOut();

    $('.menu-open-button').on('click', () => {
      $(`.menu-open:checked ~ #${menuItemId}`)
        .removeClass('wipe')
        .removeClass('finished')
        .addClass('normal');
      $('.menu-open-button')
        .removeClass('active');
      $(`.menu-open:checked ~ ${restSelector}`)
        .fadeIn();
    });
  }

  menuItemIds.forEach((menuItemId) => {
    $(`#${menuItemId}`).on('click', () => {
      setMenuItemClick(menuItemId);
    });
  });
});
