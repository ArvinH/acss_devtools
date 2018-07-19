var MutationObserver = window.MutationObserver ||  window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

    window.postMessage({
        greeting: 'hello there!',
        cssText: mutation.target.style.cssText,
        source: 'my-devtools-extension'
      }, '*');
    });    
  });
    
  var config = { attributes: true, childList: true, characterData: true, attributeOldValue: true }
  
 
  window.addEventListener('message', function(event) {
    // Only accept messages from the same frame
    if (event.source !== window) {
      return;
    }
  
    var message = event.data;
  
    // Only accept messages that we know are ours
    if (typeof message !== 'object' || message === null ||
        !message.source === 'my-devtools-extension') {
      return;
    }
  
    chrome.runtime.sendMessage(message);
  });

function setSelectedElement(el) {
    observer.observe(el, config);

}