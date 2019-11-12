// import html2canvas from "html2canvas";

// alert("I'm connected");
// var html2canvas = require('html2canvas');
//onload
window.onload = function() {
    var hidsArr = document.getElementsByClassName("page");
    var hidAddresses = [];
    
    var body = document.getElementsByTagName("body")[0];
    for(var i = 0; i < hidsArr.length; i++) {
        hidAddresses.push(hidsArr[i].firstChild.textContent);
        html2canvas(hidsArr.item(i)
        // , {
        //     width: 781.25,
        //     height: 1011.03
        // }
        )
        .then(function(canvas) {
            body.appendChild(canvas);
        });
    }
    
    for(var i = 0; i < 49; i++) {
        document.getElementsByClassName("page")[0].remove()
    }

    var download = document.getElementById("download-as-pdf");

    download.addEventListener("click", function() {
        var canvasArr = document.getElementsByTagName("canvas");
        var pdf = new jsPDF({
            orientation: 'p',
            unit: 'in',
            format: 'letter'
        });
        for(var i = 0; i < canvasArr.length; i++) {
            var imgData = canvasArr[i].toDataURL("image/jpeg", 1.0);
            
            if(i === 0) {
                pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11);
            } else {
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11);
            }
        }
        pdf.save("hids.pdf");
    }, false);
}
