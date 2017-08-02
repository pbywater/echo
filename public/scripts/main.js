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
      imageUploadPending = false;
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


//notifications stuff below:

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('./../service-worker.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }

  const applicationServerPublicKey = 'BPJmORLwdaOx2QAnX1fYEUjDVs9qyVCCjZhTKkSWqFbi5uQ0-8Ovxf998AGacEhnG6VIk46E-jfQ-l5ycoVvPQk';

});
