(function () {
  // Copyright (c) 2012 The Chromium Authors. All rights reserved.
  // Use of this source code is governed by a BSD-style license that can be
  // found in the LICENSE file.

  chrome.devtools.panels.elements.createSidebarPane(
    "acss class",
    function (sidebar) {
      sidebar.setPage("Sidebar.html");

      function getAcssClass() {
        chrome.devtools.inspectedWindow.eval(
          "setSelectedElement($0)",
          { useContentScriptContext: true }
        );
      };

      getAcssClass()
      chrome.devtools.panels.elements.onSelectionChanged.addListener(
        getAcssClass);
    });
})();