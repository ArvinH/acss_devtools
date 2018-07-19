(() => {
  chrome.devtools.panels.elements.createSidebarPane(
    "acss class",
    (sidebar) => {
      sidebar.setPage("Sidebar.html");
      let panelWindow;

      const page_generateAtomicClass = (selectedElementCssText = '') => {
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

      const getAcssClass = (extPanelWindow) => {
        panelWindow = extPanelWindow;
        updateAcssClass();
      };

      const updateAcssClass = () => {
        chrome.devtools.inspectedWindow.eval(
          "window.$0.style.cssText",
          (result, isException) => {
            if (!panelWindow) {
              return;
            }
            const status = panelWindow.document.querySelector("#app");
            const acssClass = page_generateAtomicClass(result);
            if (status) {
              status.innerHTML = acssClass.acss;
            }
          }
        );
      };

      sidebar.onShown.addListener(getAcssClass);

      chrome.devtools.panels.elements.onSelectionChanged.addListener(updateAcssClass);
    });
})();
