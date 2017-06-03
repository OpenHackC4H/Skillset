var aq = 5
var amountQuest = 1
var questions =  []



function saveRadio() {

  for (j = 0, k = amountQuest; j < amountQuest ; j++ ){
    var quest = ("q" + j.toString())

    var q1 = document.getElementsByName(quest);

      for (i = 0, len = aq ; i < len; i++ ){
        if (q1[i].checked) {

          var quest = { nr: j, checked: q1[i].value};

          questions.push(quest)
          alert("You answered: " + questions[j].nr + ", with a " + q1[i].value)
          localStorage.setItem("q" + j.toString(), JSON.stringify(quest));

        }
    }
  }
}

function loadRadio() {
  var questLog = []
  for (i = 0; i < amountQuest ; i++) {
    questLog.push(JSON.parse(localStorage.getItem("q" + i.toString())))
    alert("You answered: " + questLog[i].nr + ", with a " + questLog[i].checked)
  }
}

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'survey.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

function generateQuestions() {

}
<h4>Question:</h4>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non accumsan ex. Proin eu leo nec massa gravida vestibulum. Morbi posuere porta lacus, ut congue lectus mollis a. Suspendisse nisl mauris, fringilla at eros a, mattis viverra purus. Mauris maximus enim at sapien dignissim cursus. </p>
<form action="">
  <div class="offset-by-two two columns center">
    <p> AGREE </p>
    <input type="radio" name="q0" value="1">
  </div>

  <div class="two columns center">
    <p> - </p>
    <input type="radio" name="q0" value="2">
  </div>

  <div class="two columns center">
    <p> - </p>
    <input type="radio" name="q0" value="3">
  </div>

  <div class="two columns center">
    <p> - </p>
    <input type="radio" name="q0" value="4">
  </div>

  <div class="two columns center">
    <p> DISAGREE </p>
    <input type="radio" name="q0" value="5">
  </div>
</form>
