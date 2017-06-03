// GLOBAL --------------------------------------------------------------------------------------------------------------

var action, url, survey, users;
var index = 0,
    success = 0;

// RUN -----------------------------------------------------------------------------------------------------------------

fetchSurvey();

function run() {

    switch (action) {
        case 0:
            // SURVEY
            populateQuestion();
            break;
        case 1:
            // ANALYZE
            break;
        default:
            break;
    }
}

// MISC ----------------------------------------------------------------------------------------------------------------

function setAction(action) {
    this.action = action;
}

// SURVEY --------------------------------------------------------------------------------------------------------------

function nextQuestion() {
    if (index === survey.qs.length - 1) {
        success = 100 - (success / survey.qs.length);
        displaySuccess(success);
    }
    else {
        var radio = document.getElementsByClassName("radiobutton");
        for (i = 0; i < 5; i++) {
            if (radio[i].checked) {
                var x = radio[i].value;
                var y = survey.qs[index].a;
                var z = Math.abs(x - y);
                success += (z * 20);
            }
        }
        index++;
        populateQuestion();
    }
}

function populateQuestion() {
    var question = document.getElementsByClassName("question")[0];
    question.innerHTML = survey.qs[index].q;
}

function displaySuccess(success) {
    var form = document.getElementsByTagName("form")[0];
    var btn = document.getElementsByClassName("btn")[0];
    var background = document.getElementsByClassName("background")[0];
    var display = document.getElementsByClassName("display")[0];
    form.style.display = "none";
    btn.style.display = "none";
    background.style.display = "block";
    display.innerHTML = Math.round(success) + " %";
}

// ANALYZE -------------------------------------------------------------------------------------------------------------

// JSON ----------------------------------------------------------------------------------------------------------------

function fetchSurvey() {
    url = "js/survey.json";
    loadJSON(function (response) {
        survey = JSON.parse(response);
        fetchUsers();
    });
}

function fetchUsers() {
    url = "js/users.json";
    loadJSON(function (response) {
        users = JSON.parse(response);
        run();
    });
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}