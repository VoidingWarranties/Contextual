chrome.runtime.sendMessage({message: "get context"}, function(response) {
  if (response.context !== null && response.context.trim() !== "") {
    var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; ++i) {
      if (elements[elements.length - i - 1].innerText.indexOf(response.context.trim()) !== -1) {
        elements[elements.length - i - 1].style.color = "red";
        break;
      }
    }
  }
});
