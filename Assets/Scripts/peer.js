function peerWrite(){
    var answers = [];

    var one = document.getElementById("customRange1").value;
    var two = document.getElementById("customRange2").value;
    var three = document.getElementById("customRange3").value;
    var four = document.getElementById("customRange4").value;
    var five = document.getElementById("customRange5").value;
    var six = document.getElementById("customRange6").value;
    var seven = document.getElementById("customRange7").value;
    var eight = document.getElementById("customRange8").value;
    var nine = document.getElementById("customRange9").value;
    var ten = document.getElementById("customRange10").value;

    answers.push({"num": "1", "question": "Q1", "answer": one});
    answers.push({"num": "2", "question": "Q2", "answer": two});
    answers.push({"num": "3", "question": "Q3", "answer": three});
    answers.push({"num": "4", "question": "Q4", "answer": four});
    answers.push({"num": "5", "question": "Q5", "answer": five});
    answers.push({"num": "6", "question": "Q6", "answer": six});
    answers.push({"num": "7", "question": "Q7", "answer": seven});
    answers.push({"num": "8", "question": "Q8", "answer": eight});
    answers.push({"num": "9", "question": "Q9", "answer": nine});
    answers.push({"num": "10", "question": "Q10", "answer": ten});

    // // I learned that you can't write to a file using js, but you can locally store it...
    // // with that, I am basing the following code on the create element example found here
    // // https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(answers)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "peerPSS10.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}