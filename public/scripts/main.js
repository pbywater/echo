document.addEventListener('DOMContentLoaded', (event) => {
  $('#pencil').on('click', () => {
    console.log('clicked');
    $('.menu-open:checked ~ #pencil').removeClass('normal').addClass('wipe');
    setTimeout(() => {
      $('.menu-open:checked ~ #pencil').addClass('finished');
      $('.menu-open-button').fadeIn().addClass('active');
    }, 1000);
    $('.menu-open:checked ~ #camera, #microphone, #cog, #clock').fadeOut();
    $('.menu-open-button').fadeOut();
    $('.menu-open-button').on('click', () => {
      $('.menu-open:checked ~ #pencil').removeClass('wipe').addClass('normal');
      $('.menu-open:checked ~ #pencil').removeClass('finished');
      $('.menu-open-button').removeClass('active');
      $('.menu-open:checked ~ #camera, #microphone, #cog, #clock').fadeIn();
    });
  });
  $('#camera').on('click', () => {
    console.log('clicked');
    $('.menu-open:checked ~ #camera').removeClass('normal').addClass('wipe');
    setTimeout(() => {
      $('.menu-open:checked ~ #camera').addClass('finished');
      $('.menu-open-button').fadeIn().addClass('active');
    }, 1000);
    $('.menu-open:checked ~ #pencil, #microphone, #cog, #clock').fadeOut();
    $('.menu-open-button').fadeOut();
    $('.menu-open-button').on('click', () => {
      $('.menu-open:checked ~ #camera').removeClass('wipe').addClass('normal');
      $('.menu-open:checked ~ #camera').removeClass('finished');
      $('.menu-open-button').removeClass('active');
      $('.menu-open:checked ~ #pencil, #microphone, #cog, #clock').fadeIn();
    });
  });
  $('#microphone').on('click', () => {
    console.log('clicked');
    $('.menu-open:checked ~ #microphone').addClass('wipe');
    setTimeout(() => {
      $('.menu-open:checked ~ #microphone').removeClass('normal').addClass('finished');
      $('.menu-open-button').fadeIn().addClass('active');
    }, 1000);
    $('.menu-open:checked ~ #pencil, #camera, #cog, #clock').fadeOut();
    $('.menu-open-button').fadeOut();
    $('.menu-open-button').on('click', () => {
      $('.menu-open:checked ~ #microphone').removeClass('wipe').addClass('normal');
      $('.menu-open:checked ~ #microphone').removeClass('finished');
      $('.menu-open-button').removeClass('active');
      $('.menu-open:checked ~ #pencil, #camera, #cog, #clock').fadeIn();
    });
  });
  $('#clock').on('click', () => {
    console.log('clicked');
    $('.menu-open:checked ~ #clock').removeClass('normal').addClass('wipe');
    setTimeout(() => {
      $('.menu-open:checked ~ #clock').addClass('finished');
      $('.menu-open-button').fadeIn().addClass('active');
      $('.notifications').addClass('active');
    }, 1000);
    $('.menu-open:checked ~ #pencil, #camera, #cog, #microphone').fadeOut();
    $('.menu-open-button').fadeOut();
    $('.menu-open-button').on('click', () => {
      $('.menu-open:checked ~ #clock').removeClass('wipe').addClass('normal');
      $('.menu-open:checked ~ #clock').removeClass('finished');
      $('.menu-open-button, .notifications').removeClass('active');
      $('.menu-open:checked ~ #pencil, #camera, #cog, #microphone').fadeIn();
    });
  });
  $('#cog').on('click', () => {
    console.log('clicked');
    $('.menu-open:checked ~ #cog').removeClass('normal').addClass('wipe');
    setTimeout(() => {
      $('.menu-open:checked ~ #cog').addClass('finished');
      $('.menu-open-button').fadeIn().addClass('active');
      $('.settings').addClass('active');
    }, 1000);
    $('.menu-open:checked ~ #pencil, #camera, #clock, #microphone').fadeOut();
    $('.menu-open-button').fadeOut();
    $('.menu-open-button').on('click', () => {
      $('.menu-open:checked ~ #cog').removeClass('wipe').addClass('normal');
      $('.menu-open:checked ~ #cog').removeClass('finished');
      $('.menu-open-button, .settings').removeClass('active');
      $('.menu-open:checked ~ #pencil, #camera, #clock, #microphone').fadeIn();
    });
  });
});
