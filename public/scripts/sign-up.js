document.addEventListener('DOMContentLoaded', (event) => {
  const tabs = [
    'signup',
    'login',
  ];

  const getOtherTab = tabToFilter => tabs
      .filter(tab => tab !== tabToFilter);

  const toggleTabs = (tab) => {
    const otherTab = getOtherTab(tab);
    console.log(otherTab[0]);

    $(`.${tab}-tab`)
      .addClass('active');
    $(`#${tab}-tab-content`)
      .addClass('active');
    $(`.${otherTab[0]}-tab`)
      .removeClass('active');
    $(`#${otherTab[0]}-tab-content`)
      .removeClass('active');
  };

  tabs.forEach((tab) => {
    $(`.${tab}-tab`).on('click', () => {
      toggleTabs(tab);
    });
  });
});
