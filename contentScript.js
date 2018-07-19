let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    window.postMessage({
      greeting: 'hello there!',
      cssText: mutation.target.style.cssText,
      source: 'my-devtools-extension'
    }, '*');
  });
});

let config = { attributes: true, childList: true, characterData: true, attributeOldValue: true }


window.addEventListener('message', (event) => {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  let message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null ||
    !message.source === 'my-devtools-extension') {
    return;
  }

  chrome.runtime.sendMessage(message);
});

const setSelectedElement = (el) => {
  observer.observe(el, config);
}