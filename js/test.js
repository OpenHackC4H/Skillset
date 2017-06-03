var data;
var index = 0;
var success = 0;
init();

function init() {

 loadJSON(function(response) {
    data = JSON.parse(response);
    populate();
 });
}

function populate(){
  var question = document.getElementsByClassName("question")[0];
  var q = data.qs[index].q;
  question.innerHTML = q;
}

function next(){
  if (index == data.qs.length -1) {
    window.location.href = "index.html";
  }
  else {
    var radio = document.getElementsByClassName("radiobutton");

    for (i = 0; i < 5; i++) {
      if (radio[i].checked) {
        var x = radio[i].value;
        var y = data.qs[index].a;
        var z = Math.abs(x-y);
        success += (z * 20);
        console.log(success);
      }
    }

    index++;
    populate();
  }
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/survey.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);

          }
    };
    xobj.send(null);
 }
