var aq = 3
var amountQuest = 2
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
  for (var i = 0; i < amountQuest ; i++) {
    questLog.push(JSON.parse(localStorage.getItem("q" + i.toString())))

    alert("You answered: " + questLog[i].nr + ", with a " + q1[i].value)
  }
}
