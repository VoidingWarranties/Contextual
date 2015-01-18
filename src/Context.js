// Returns the contexts (short description with bolded matched words) of the
// search results. This is only a function to allow the implementation to be
// changed if Google ever changes the format of their HTML.
function getSearchContexts() {
  return document.querySelectorAll(".st");
}

function insertLinksIntoContext(context) {
  context.innerHTML = "who dat who dat?"; // Courtney you know what to do: http://xkcd.com/1288/
}

var contexts = getSearchContexts();
for (var i = 0; i < contexts.length; ++i) {
  contexts[i] = insertLinksIntoContext(contexts[i]);
}
