function updateBrowserAction( designMode ) {
  chrome.browserAction.setIcon({
    path: `./icon-${ designMode }.png`
  });

  const title = designMode === 'off' ?
                'Enable DesignMode' :
                'Disable DesignMode';

  chrome.browserAction.setTitle({ title });
}

function toggleDesignMode() {
  chrome.tabs.query({ active : true, currentWindow : true }, tabs => {
    chrome.tabs.sendMessage(
      tabs[ 0 ].id,
      { text: 'toggle_designMode' },
      updateBrowserAction
    );
  });
}

function handleTabUpdate( tabId ) {
  chrome.tabs.sendMessage(
    tabId,
    { text: 'report_designMode' },
    designMode => {
      if ( designMode ) {
        chrome.browserAction.enable( tabId );
        updateBrowserAction( designMode );
      } else {
        chrome.browserAction.disable( tabId );
        chrome.browserAction.setTitle({ title: 'Not available. Reloading might help?' });
      }
    }
  );
}

chrome.browserAction.onClicked.addListener(toggleDesignMode);
chrome.tabs.onUpdated.addListener( handleTabUpdate );
chrome.tabs.onActivated.addListener( tab => handleTabUpdate( tab.tabId ));