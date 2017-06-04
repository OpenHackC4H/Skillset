// GLOBAL --------------------------------------------------------------------------------------------------------------

var action, url, survey, users;
var index = 0,
    success = 0,
    u = [],
    a = [];

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
            generateUsers();
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
                radio[i].checked = false;
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

function splitAnswers(answers) {
    return ("" + answers).split("").map(Number);
}

function displayUsers(users) {
    for (i = 0; i < users.length; i++) {
        var userholder = document.getElementsByClassName("userholder")[0];

        var tr = document.createElement("tr");

        var td0 = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");

        var h50 = document.createElement("h5");
        var h51 = document.createElement("h5");

        var ipt = document.createElement("input");
        ipt.type = "checkbox";

        var btn = document.createElement("button");
        btn.className = "button-primary";
        btn.innerHTML = "Show stats";
        btn.onclick = function () {
            query(this);
        };
        btn.value = i;
        if (i === 0) query(btn);

        h50.innerHTML = i;
        h51.innerHTML = users[i][1] + " %";

        td0.appendChild(h50);
        td1.appendChild(h51);
        td2.appendChild(btn);
        td3.appendChild(ipt);

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        userholder.appendChild(tr);
    }

}

function generateUsers() {
    for (i = 0; i < survey.qs.length; i++) {
        a.push(survey.qs[i].a);
    }
    for (j = 0; j < users.users.length; j++) {
        var user = [];
        user[0] = splitAnswers(users.users[j].answer);
        user[1] = matchRate(user[0]);
        u.push(user);
    }
    u.sort(function (a, b) {
        return parseFloat(b[1]) - parseFloat(a[1]);
    });
    displayUsers(u);
}

function matchRate(answers) {
    for (i = 0; i < answers.length; i++) {
        if (i === answers.length - 1) {
            success = 100 - (success / answers.length);
        }
        else {
            var x = answers[i];
            var y = survey.qs[i].a;
            var z = Math.abs(x - y);
            success += (z * 20);
        }
    }
    return Math.round(success);
}

function query(index) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
            datasets: [{
                label: "Employee",
                data: u[index.value][0],
                backgroundColor: 'rgba(231, 76, 60, 0.5)'
            }, {
                label: "Employer/Peer-review",
                data: a,
                backgroundColor: 'rgba(52, 152, 219, 0.5)'
            }]

        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 5,
                        suggestedMin: 0,
                        suggestedMax: 5,
                        stepSize: 1
                    }
                }]
            }
        }
    });

}

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
