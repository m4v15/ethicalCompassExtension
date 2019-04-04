// chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
//     //onMessage receives data from the extension and addListener says what to do on detection of this event
//     //sendResponse just says if successful or not
//     console.log("something happening from the extension");
//     var data = request.data || {};
//     console.log("this is the " + data)
//     var linksList = document.querySelectorAll('a');
//     [].forEach.call(linksList, function(header) {

//         header.innerHTML = request.data;
//     });
//     sendResponse({data: data, success: true});
// });

function getProductList() {
  const list = document.querySelectorAll("[id^='product-']");
  return list;
}

function addClass(productList) {
  productList.forEach(product => {
    const brandName = getBrandName(product);
    requestScore(brandName, product);
  });
}

function getBrandName(productNode) {
  const linkNode = productNode.childNodes[0];
  const label = linkNode.getAttribute("aria-label");
  const brandName = label.split(" ")[0];
  return brandName;
}

function requestScore(brandName, productNode) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://brandnewserver.herokuapp.com/brand?brand=${brandName}`,
    true
  );
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.responseText) {
      // innerText does not let the attacker inject HTML elements.
      const resp = JSON.parse(xhr.responseText);
      addClassByScore(resp.colourHex, productNode);
      addInfo(resp.score, brandName, productNode);
    }
  };
  xhr.send();
}

function addClassByScore(colourHex, productNode) {
  console.log("adding style");
  console.log(colourHex);
  productNode.classList.toggle("wellspent");
  productNode.style["border-color"] = `#${colourHex}`;
}

function addInfo(score, brandName, product) {
  const scoreElement = document.createElement("p");
  scoreElement.innerText = `WellSpent Ethical Score: ${score}`;
  product.appendChild(scoreElement);
  const buttonElement = document.createElement("button");
  buttonElement.innerText = `Click here for more info`;
  buttonElement.addEventListener("click", () => createMoreInfo(brandName));
  product.appendChild(buttonElement);
}

function createMoreInfo(brandName) {
  const overlay = document.createElement("div");
  overlay.className = "ws_overlay";
  overlay.id = "ws_modal";
  const popup = document.createElement("div");
  popup.className = "ws_popup";
  const header = document.createElement("h2");
  header.className = "ws_header";
  const exit = document.createElement("a");
  exit.className = "ws_close";
  const text = document.createElement("p");
  text.className = "ws_content";
  const link = document.createElement("a");
  link.className = "ws_content";

  header.innerText = "WELLSPENT";
  exit.innerHTML = `&times;`;
  exit.addEventListener("click", closeModal);
  text.innerText = `Read how we got the score here:`;
  link.innerText = `WellSpent Directory`;
  link.target = `_blank`;
  link.href = `https://brandnewserver.herokuapp.com/brand?brand=${brandName}`;

  popup.appendChild(header);
  popup.appendChild(exit);
  popup.appendChild(text);
  popup.appendChild(link);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

function closeModal() {
  const modal = document.querySelector("#ws_modal");
  modal.remove();
}

window.onload = function() {
  const productList = getProductList();
  addClass(productList);
};
