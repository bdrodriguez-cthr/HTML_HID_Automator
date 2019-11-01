// alert("I'm connected");

//onload
window.onload = function() {

    var hidsArr = document.getElementsByClassName("page");

    for(var i = 0; i < hidsArr.length; i++) {
        html2canvas(hidsArr[i].then(function(canvas) {
            document.body.appendChild(canvas);
        }));
    }
}



