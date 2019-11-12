window.onload = function() {
    var download = document.getElementById("download-as-pdf");

    download.addEventListener("click", function() {
        // only jpeg is supported by jsPDF
        var canvas = document.getElementsByTagName("canvas")[0];
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF();
      
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
      }, false);
}