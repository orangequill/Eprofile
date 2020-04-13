$(document).ready(function(){
    var colClassButton = document.getElementsByClassName("collapsible");
    var i = 0;
    while(i < colClassButton.length){
        colClassButton[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
            content.style.display = "none";
            } else {
            content.style.display = "block";
            }
        });
        i++
    };    
});
