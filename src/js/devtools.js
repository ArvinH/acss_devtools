import { generateAtomicClass } from './lib';

chrome.devtools.panels.elements.createSidebarPane('acss class', sidebar => {
    sidebar.setPage('Sidebar.html');
    let panelWindow;

    const getAcssClass = extPanelWindow => {
        panelWindow = extPanelWindow;
        updateAcssClass();
    };

    const updateAcssClass = () => {
        chrome.devtools.inspectedWindow.eval(
            'window.$0.style.cssText',
            (result, isException) => {
                if (!panelWindow) {
                    return;
                }
                const status = panelWindow.document.querySelector('#app');
                const acssClass = generateAtomicClass(result);
                if (status) {
                    status.innerHTML = acssClass.acss;
                }
            }
        );
    };

    sidebar.onShown.addListener(getAcssClass);

    chrome.devtools.panels.elements.onSelectionChanged.addListener(
        updateAcssClass
    );
});
