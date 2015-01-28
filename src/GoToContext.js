// jQuery function to smoothly scroll to an element by id.
// Credit goes to http://stackoverflow.com/a/1586379
$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });
}

chrome.runtime.sendMessage({message: "get context"}, function(response) {
  if (response.context !== null && response.context.trim() !== "") {
    var elements = document.getElementsByTagName('*');
    for (var i = elements.length - 1; i >= 0; --i) {
      if (elements[i].innerText.replace(/\W+/g, "").indexOf(response.context.trim()) !== -1) {
        // Highlight the element.
        elements[i].innerHTML = "<mark>" + elements[i].innerHTML + "</mark>";
        // Scroll to the element.
        elements[i].id = "CONTEXT_FOUND";
        $('#CONTEXT_FOUND').scrollView();
        break;
      }
    }
  }
});
