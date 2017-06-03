var aq = 3
var amountQuest = 2
var questions =  []



function saveRadio() {

  for (j = 0, k = amountQuest; j < amountQuest ; j++ ){
    var quest = ("q" + j.toString())

    var q1 = document.getElementsByName(quest);

      for (i = 0, len = aq ; i < len; i++ ){
        if (q1[i].checked) {

          var quest = { nr: j, checked: i};

          questions.push(quest)
          alert("You answered: " + questions[j].nr + ", with a " + i)
          localStorage.setItem("q" + j.toString(), JSON.stringify(questions[j].checked));

        }
    }
  }
}

function loadRadio() {
  var questLog = []
  for (var i = 0; i < amountQuest ; i++) {
    questLog.push(localStorage.getItem("q" + i.toString()))

    alert(questLog[i])
  }
}
