//message Sender to DOM
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("status").textContent = "Extension loaded";
  var styleButton = document.getElementById("addStyling");

  function getAllProducts() {
    $("article[id^='product-']").toggleClass("active");
  }
  function makeHighlightActive() {
    $(".product").toggleClass("active");
  }

  styleButton.addEventListener("click", function() {
    $("#status").html("Highlight products");
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.insertCSS(tabs[0].id, {
        file: "css/index.css"
      });
    });
  });
});

//insertCSS on button click?
//-> test
//or executeScript that applies the CSS
//-> test
