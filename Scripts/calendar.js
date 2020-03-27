$(document).ready(function(){
    var date = 1;
    var newDate = new Date();
    var year = newDate.getYear();
    var month = newDate.getMonth();

    var i = 0;
    var calBody = document.getElementById("Calendar").getElementsByTagName('tbody')[0];

    for (i; i<6; i++){
        var row = calBody.insertRow();
        var cols = 0;
        for(cols; cols < 7; cols++)
        {
            // Insert a cell in the row at index 0
            var newCell  = row.insertCell(cols);

            var tmpDate = new Date(year, month, 0);
            // var num = daysInMonth(month, year);
            // var dayofweek = tmpDate.getDay();

            // alert('tmpDate');
            var cellContent = document.createTextNode("1");
            newCell.appendChild(cellContent);
        }
    }
    
});
