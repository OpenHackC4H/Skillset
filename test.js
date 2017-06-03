var aq = 3
var amountQuest = 2
var questions = []


function saveRadio() {

  for (j = 0, k = amountQuest; j < amountQuest ; j++ ){
    var quest = ("q" + j.toString())

    var q1 = document.getElementsByName(quest);

      for (i = 0, len = aq ; i < len; i++ ){
        if (q1[i].checked) {

          alert("Question nr: " + i)

        }
    }
  }


}

function loadRadio() {}
