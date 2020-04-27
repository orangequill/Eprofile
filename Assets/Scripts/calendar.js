    /*Note - var is function scoped and let is block scoped*/
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var daysInMonth = new Date(year, month + 1, 0).getDate();


    function showCalendar(month, year){
        let firstDay = new Date(year, month).getDay();
        let nextMonth = false;
        var date = 1;
        var calBody = document.getElementById("Calendar").getElementsByTagName('tbody')[0];
        
        // creates elt for each day of each row
        for (let i = 0; i < 6; i++){
            var row = calBody.insertRow();
            for(let cols = 0; cols < 7; cols++)
            {
                // Insert a cell in the row at index 0
                var newCell  = row.insertCell(cols);                
                let cellContent = null;
                if(i == 0 && cols < firstDay && !nextMonth){
                    date = 0;
                    cellContent = document.createTextNode("");             
                }else if(date > daysInMonth && !nextMonth){
                    date = 1;
                    nextMonth = true;
                    month = month + 1;
                    cellContent = document.createTextNode(date); 
                    newCell.setAttribute('id', (month + 1) + '-' + date + '-' + year);            
                }else{
                    cellContent = document.createTextNode(date);
                    newCell.setAttribute('id', (month + 1) + '-' + date + '-' + year);
                }                
                newCell.appendChild(cellContent);
                date++;
            }
        }
    }  

$(document).ready(function(){

    showCalendar(month, year);
    
    $('tbody tr td').mouseover(function(){
        $(this).css("background", "#eaf1f8");
    });

    $('tbody tr td').mouseout(function(){
       $(this).css("background", "white");
    });

});

function previousMonth(){

    if(month == 0){
        month = 12;
    }
    else{
        month = month - 1;
    }

    $("#calBody").empty();
    showCalendar(month, year);
    $('tbody tr td').mouseover(function(){
        $(this).css("background", "#eaf1f8");
    });

    $('tbody tr td').mouseout(function(){
       $(this).css("background", "white");
    });
}


function nextMonth(){

    if(month == 12){
        month = 1;
    }
    else{
        month = month + 1;
    }

    $("#calBody").empty();
    showCalendar(month, year);
    $('tbody tr td').mouseover(function(){
        $(this).css("background", "#eaf1f8");
    });

    $('tbody tr td').mouseout(function(){
       $(this).css("background", "white");
    });
}