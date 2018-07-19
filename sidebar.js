(() => {
    const page_generateAtomicClass = (selectedElementCssText) => {
        const inlineStyleText = selectedElementCssText;
        const inlineStyleArray = inlineStyleText && inlineStyleText.split('; ') || [];
        const styleMap = [];
        inlineStyleArray.forEach((styleString) => {
            if (!styleString) {
                return;
            }
            const styleArray = styleString.replace(';', '').split(': ');
            const style = {
                [styleArray[0]]: styleArray[1]
            };

            let acssClass = acssRuleMap[`${styleArray[0]}: ${styleArray[1]}`];
            if (acssClass) {
                styleMap.push(acssClass);
            } else {
                acssClass = acssRuleMap[`${styleArray[0]}: value`]
                styleMap.push(acssClass.replace('<value> or ', '').replace('<custom-param>', styleArray[1]));
            }
        });

        return {
            acss: styleMap.join(' ').toString()
        };
    }


    const backgroundPageConnection = chrome.runtime.connect({
        name: "panel"
    });

    backgroundPageConnection.postMessage({
        name: 'init',
        tabId: chrome.devtools.inspectedWindow.tabId
    });
    backgroundPageConnection.onMessage.addListener((message) => {
        // Handle responses from the background page, if any
        const acssClass = page_generateAtomicClass(message.cssText);
        document.querySelector('#app').innerHTML = acssClass.acss;
    });

    const copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    const copyButton = document.querySelector('#copy');
    copyButton.addEventListener('click', (e) => {
        const text = document.querySelector('#app').innerHTML;
        copyToClipboard(text)
    });

})();