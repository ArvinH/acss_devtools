(function() {
  // Copyright (c) 2012 The Chromium Authors. All rights reserved.
  // Use of this source code is governed by a BSD-style license that can be
  // found in the LICENSE file.

  chrome.devtools.panels.elements.createSidebarPane(
    "acss class",
    function (sidebar) {
      // The function below is executed in the context of the inspected page.
      var page_generateAtomicClass = function (selectedElementCssText) {
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


      function updateElementProperties(acssClass) {
        // sidebar.setExpression("(" + page_generateAtomicClass.toString() + ")()");
        sidebar.setObject(acssClass);
      };

      function getAcssClass() {
        chrome.devtools.inspectedWindow.eval(
          "window.$0.style.cssText",
            function (result, isException) {
              const selectedElementCssText = result;
              const acssClass = page_generateAtomicClass(selectedElementCssText);
              updateElementProperties(acssClass);
            }
        );
      };

      getAcssClass()
      chrome.devtools.panels.elements.onSelectionChanged.addListener(
        getAcssClass);
  });
})();