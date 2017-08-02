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

  var pushButton = document.querySelector('.js-push-btn');

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('./../service-worker.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
      initialiseUI();
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }

  const applicationServerPublicKey = 'BPJmORLwdaOx2QAnX1fYEUjDVs9qyVCCjZhTKkSWqFbi5uQ0-8Ovxf998AGacEhnG6VIk46E-jfQ-l5ycoVvPQk';

  function initialiseUI() {
    pushButton.addEventListener('click', function() {
      pushButton.disabled = true;
      if (isSubscribed) {
        // TODO: Unsubscribe user
      } else {
        subscribeUser();
      }
    });

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);

      // updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }

      updateBtn();
    });
  }

  function updateBtn() {
    if (isSubscribed) {
      pushButton.textContent = 'Disable Push Messaging';
    } else {
      pushButton.textContent = 'Enable Push Messaging';
    }

    pushButton.disabled = false;
  }

  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      console.log('User is subscribed.');

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      updateBtn();
    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      updateBtn();
    });
  }

  function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails =
      document.querySelector('.js-subscription-details');

    if (subscription) {
      subscriptionJson.textContent = JSON.stringify(subscription);
      subscriptionDetails.classList.remove('is-invisible');
    } else {
      subscriptionDetails.classList.add('is-invisible');
    }
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

});
