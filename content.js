chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === 'report_designMode') {
    sendResponse(document.designMode);
  }

  if (msg.text === 'toggle_designMode') {
    document.designMode = document.designMode === 'off' ? 'on' : 'off';
    sendResponse(document.designMode)

    toggleNotifier(document.designMode);
  }
});

let notifier;

function getNotifierElement() {
  const notifier = document.createElement( 'div' );
  notifier.id = 'designMode-chromeExtension';
  notifier.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 366 366" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>DocumentEdit is enabled</title>
      <defs>
        <path id="a" d="M233.93 72l42.986 42.986-147.93 147.93L86 219.93 233.93 72"/>
        <mask id="b" x="0" y="0" width="190.916" height="190.916" fill="#fff">
          <use xlink:href="#a"/>
        </mask>
      </defs>
      <g transform="translate(8 9)" stroke="#7DD270" fill="none" fill-rule="evenodd">
        <path d="M174.839 348c96.033 0 173.883-77.902 173.883-174S270.872 0 174.84 0C78.805 0 .955 77.902.955 174s77.85 174 173.884 174z" stroke-width="12"/>
        <use mask="url(#b)" stroke-width="24" xlink:href="#a"/>
        <path stroke-width="10" d="M85.755 235l27.473 27.473L72 276.228z"/>
      </g>
    </svg>
  `;


  Object.assign( notifier.style, {
    padding                : '6px',
    position               : 'fixed',
    width                  : 'auto',
    background             : 'rgba( 255, 255, 255, .925 )',
    top                    : '0',
    right                  : '0',
    zIndex                 : '999999',
    borderBottomLeftRadius : '24px',
    boxShadow              : '0 1px 2px #999'
  });

  return notifier;
}

function toggleNotifier( designMode ) {
  if ( ! notifier ) {
    notifier = getNotifierElement();
    document.body.appendChild(notifier);
  }

  if ( designMode === 'on' ) {
    notifier.style.display = 'block';
  } else {
    notifier.style.display = 'none';
  }
}