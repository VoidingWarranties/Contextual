var context_clicked = false;
var context = "";

// Listens for a message from the injected Context.js to signal that a context
// link has been clicked. This is asynchronous and causes a data race with the
// tabs.onUpdated listener. This should be fixed in the future...
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "click subcontext") {
    context_clicked = true;
    context = request.context;
  } else if (request.message === "get context") {
    sendResponse({context: context});
  }
  return true;
});

chrome.tabs.onUpdated.addListener(function(id, info, tab) {
  if (info.status !== "complete") {
    return;
  }

  // Parse the tab's URL.
  // The hostname is contained in parser.hostname
  // Credit goes to: https://gist.github.com/jlong/2428561
  var parser = document.createElement('a');
  parser.href = tab.url;

  // Context link clicked in search result...
  // Execute result-side javascript.
  if (context_clicked) {
    context_clicked = false;
    chrome.tabs.executeScript(null, {file: "GoToContext.js"});
    return;
  }

  if (parser.hostname !== "www.google.com") {
    return;
  }

  // Google search result loaded...
  // Execute Context.js in the context of the current page
  // (which should be a Google search result).
  chrome.tabs.executeScript(null, {file: "Context.js"});
});
