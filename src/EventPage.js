chrome.tabs.onUpdated.addListener(function(id, info, tab) {
  if (info.status !== "complete") {
    return;
  }

  // Parse the tab's URL.
  // The hostname is contained in parser.hostname
  // Credit goes to: https://gist.github.com/jlong/2428561
  var parser = document.createElement('a');
  parser.href = tab.url;

  if (parser.hostname !== "www.google.com") {
    return;
  }

  // Execute Context.js in the context of the current page
  // (which should be a Google search result).
  chrome.tabs.executeScript(null, {file: "Context.js"});
});
