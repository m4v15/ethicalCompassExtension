chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    //onMessage receives data from the extension and addListener says what to do on detection of this event
    //sendResponse just says if successful or not
    console.log("something happening from the extension");
    var data = request.data || {};
    console.log("this is the " + data)
    var linksList = document.querySelectorAll('a');
    [].forEach.call(linksList, function(header) {

        header.innerHTML = request.data;
    });
    sendResponse({data: data, success: true});
});
