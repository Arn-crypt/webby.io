const tabs = Array.from(document.querySelectorAll('.tab-chip'));
const notePanel = document.getElementById('notePanel');
const photoPanel = document.getElementById('photoPanel');
const tabLabels = {
  love: 'I Love You',
  moments: 'Sweet Moments',
  forever: 'Forever'
};

function activateTab(selectedTab) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === selectedTab;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  const isMomentsTab = selectedTab === 'moments';

  if (notePanel) {
    notePanel.classList.toggle('hidden', isMomentsTab);
  }

  if (photoPanel) {
    photoPanel.classList.toggle('full-width', isMomentsTab);
  }

}

function isTabName(tabName) {
  return Object.prototype.hasOwnProperty.call(tabLabels, tabName);
}

function focusTab(event) {
  const currentTab = event.currentTarget;
  const nextTab = event.key === 'ArrowRight'
    ? tabs[(tabs.indexOf(currentTab) + 1) % tabs.length]
    : event.key === 'ArrowLeft'
      ? tabs[(tabs.indexOf(currentTab) - 1 + tabs.length) % tabs.length]
      : null;

  if (nextTab) {
    event.preventDefault();
    nextTab.focus();
    activateTab(nextTab.dataset.tab);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  tab.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateTab(tab.dataset.tab);
    }
    focusTab(event);
  });
});

activateTab('love');
