console.log("I'm connected!");

document.addEventListener("DOMContentLoaded", function() {
    var inputElement = document.getElementById("address-data");

    inputElement.onchange = function(event) {
        var csv = inputElement.files[0];
        //Use FileReader class to extract csv data
        var reader = new FileReader();
        reader.readAsText(csv);
        reader.onload = function(data) {
            console.log(data.target.result);
       }        
    }
});

