// Returns the contexts (short description with bolded matched words) of the
// search results. This is only a function to allow the implementation to be
// changed if Google ever changes the format of their HTML.
function getSearchContexts() {
  return document.querySelectorAll(".st");
}

// Returns the relevant URL for the given context.
function getContextURL(context) {
  var header_link = context.parentNode.parentNode.parentNode.querySelector(".r");
  return header_link.getElementsByTagName("a")[0].href;
}

function forEverySubContext(context) {
  var date_element = context.querySelector(".f");
  if (date_element !== null) {
    context.removeChild(date_element);
  }

  var context_url = getContextURL(context);
  var new_innerHTML = "";
  var sub_contexts = context.innerHTML.split("...");
  for (var i = 0; i < sub_contexts.length; ++i) {
    if (sub_contexts[i].length === 0) {
      continue;
    }
    new_innerHTML += "<a href=\"" + context_url + "\" id=\"CONTEXTUAL_" + i + context_url + "\">";
    new_innerHTML += sub_contexts[i];
    new_innerHTML += "</a>";
    if (i !== sub_contexts.length - 1 || context.innerHTML.substr(context.innerHTML.length - 3) === "...") {
      new_innerHTML += "...";
    }
  }
  context.innerHTML = new_innerHTML;
  // Add click handlers for the context links. This must be done this way
  // because Chrome doesn't allow extensions to inline javascript in the
  // "onclick" property of an element.
  for (var i = 0; i < sub_contexts.length; ++i) {
    if (sub_contexts[i].length === 0) {
      continue;
    }
    var link = document.getElementById("CONTEXTUAL_" + i + context_url);
    // Self-invoking anonymous function required to capture the current state in
    // the for loop.
    (function(i) {
      link.addEventListener('click', function() {
        chrome.runtime.sendMessage({message: "click subcontext", context: context.getElementsByTagName("a")[0].innerText.split("...")[i]});
      });
    })(i);
  }

  if (date_element !== null) {
    context.insertBefore(date_element, context.firstChild);
  }
}

var contexts = getSearchContexts();
for (var i = 0; i < contexts.length; ++i) {
  forEverySubContext(contexts[i]);
}
