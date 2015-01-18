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
  var context_url = getContextURL(context);
  var new_innerHTML = "";
  var sub_contexts = context.innerHTML.split("...");
  for (var i = 0; i < sub_contexts.length; ++i) {
    if (sub_contexts[i].length === 0) {
      continue;
    }
    new_innerHTML += "<a href=\"" + context_url + "\">";
    new_innerHTML += sub_contexts[i];
    new_innerHTML += "</a>";
    if (i !== sub_contexts.length - 1 || context.innerHTML.substr(context.innerHTML.length - 3) === "...") {
      new_innerHTML += "...";
    }
  }
  context.innerHTML = new_innerHTML;
}

var contexts = getSearchContexts();
for (var i = 0; i < contexts.length; ++i) {
  forEverySubContext(contexts[i]);
}
