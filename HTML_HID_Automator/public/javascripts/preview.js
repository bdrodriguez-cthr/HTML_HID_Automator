// import html2canvas from "html2canvas";

alert("I'm connected");
// var html2canvas = require('html2canvas');
//onload
window.onload = function() {
    var hidsArr = document.getElementsByClassName("page");
    
    var body = document.getElementsByTagName("body")[0];
    for(var i = 0; i < hidsArr.length; i++) {
        html2canvas(hidsArr.item(i))
            .then(function(canvas) {
                body.appendChild(canvas);
            });
    }
    
    for(var i = 0; i < 49; i++) {
        document.getElementsByClassName("page")[0].remove()
    }
}



