/*
Prosty skrypt losowania z tablicy indeksu reprezentującego ucznia
*/
var myObj;
var x;

var level_status;

var uczniowie = [];
var oceny = [];
var level = [];
var punkty = [];

getJSONFile("players.json");

var randNumber;
function getJSONFile(dataFile) {

    var xmlhttp = new XMLHttpRequest();  // nawiązanie połączenia asynchronicznego
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { // stan połączenia 
            myObj = JSON.parse(this.responseText);

            if (dataFile == 'data.json') {
                //console.log("Json parsed data is: " + JSON.stringify(myObj.pytania[x].pytanie));
                document.querySelector('#pytanie').innerHTML = "<h2>" + (myObj.pytania[x].pytanie) + "</h2>";
                document.querySelector('#odp1').innerHTML = "<b>A:</b> " + (myObj.pytania[x].odp1);
                document.querySelector('#odp2').innerHTML = "<b>B:</b> " + (myObj.pytania[x].odp2);
                document.querySelector('#odp3').innerHTML = "<b>C:</b> " + (myObj.pytania[x].odp3);
                document.querySelector('#odp4').innerHTML = "<b>D:</b> " + (myObj.pytania[x].odp4);
            }
            if (dataFile == 'players.json') {
                // console.log("blaa");
                //console.log(myObj.length);
                uczniowie = [];

                for (var u = 0; u < myObj.uczniowie.length; u++) {
                    //  console.log("blaa" + myObj.uczniowie[u].punkty);
                    punkty.push(parseInt(myObj.uczniowie[u].punkty));
                    level.push(parseInt(myObj.uczniowie[u].level));
                    oceny.push(myObj.uczniowie[u].oceny);
                    uczniowie.push(myObj.uczniowie[u].imie);
                }
            }

        }
    };

    xmlhttp.open("GET", dataFile, true);

    // wysyłamy połączenie
    xmlhttp.send();

}

window.onload = initObjects;

function nextLevel(level) {

    var nextLevel = parseInt(level * 10 * level);

    return nextLevel;
}

function ocena(uczen) {
    alert("Masz 5tkę");
    oceny[uczen] = oceny[uczen] + "5, ";
}
function levelUp(uczen, level, punkty) {

    if (punkty >= parseInt(level * 10 * level)) {
        alert(uczniowie[uczen] + " Level UP!");
        level_status = true;
    }
    else {
        level_status = false;
    }
    return level_status;
}
function initObjects() {
    showStatystyki();

    //getJSONFile("players.json");
    losowanie();

    var odpowiedz = document.querySelectorAll('input[type=radio]');



    for (var j = 0; j < odpowiedz.length; j++) {
        odpowiedz[j].addEventListener("click", function () {
            odpowiadanie(this);
        });
    }
}
// Sprawdzamy odpowiedź
function odpowiadanie(object) {

    //alert("wybrales odpowiedz" + object.value);

    getJSONFile("data.json");

    if (object.value == myObj.pytania[x].odp) {
        alert("Wybrales " + object.value + " jest to odpowiedz poprawna " + myObj.pytania[x].odp);
        object.classList.add("success");

        punkty[randNumber] = punkty[randNumber] + 10;
        levelUp(randNumber, level[randNumber], punkty[randNumber]);
        if (level_status == true) {
            level[randNumber] = level[randNumber] + 1;
            if (level[randNumber] % 10 == 0) {
                ocena(randNumber);
            }
        }

        console.log(punkty[randNumber]);
        document.querySelector("#uczen").innerHTML = uczniowie[randNumber] + " <mark><i class='material-icons'>star_border</i > LEVEL: " + level[randNumber] + "</mark> EXP: " + punkty[randNumber] + " / " + nextLevel(level[randNumber]) + " <progress value='" + punkty[randNumber] + "' max='" + nextLevel(level[randNumber]) + "'></progress></progress>";
    } else {
        alert("Wybrales " + object.value + " jest to odpowiedz niepoprawna, popranwna odp " + myObj.pytania[x].odp);
        object.classList.add("bad");
        punkty[randNumber] = punkty[randNumber] - 5;
        document.querySelector("#uczen").innerHTML = uczniowie[randNumber] + " <mark><i class='material-icons'>star_border</i > LEVEL: " + level[randNumber] + "</mark> EXP: " + punkty[randNumber] + ' / ' + nextLevel(level[randNumber]) + " <progress value='" + punkty[randNumber] + "' max='" + nextLevel(level[randNumber]) + "'></progress></progress>";
    }
    //  showStatystyki();
    saveStatystyki();
    //showStatystyki();
    getJSONFile('players.json');
    showStatystyki();
}

// $(".trescE").each(function () { console.log('{ "pytanie" : "' + $(this).html() + '"' + "\n" + '"odp1" : "' + $(this).next().html() + '"' + "\n" + '"odp2": "' + $(this).next().next().html() + '"' + "\n" + '"odp3" : "' + $(this).next().next().next().html() + '"' + "\n" + '"odp4" : "' + $(this).next().next().next().next().html() + '" }'); });

// Losujemy które pytanie ma zadac

function losujPytanie() {

    x = Math.floor((Math.random()) * 80);
    console.log(x);
    return x;

}

function resetChoice() {
    var odpowiedz = document.querySelectorAll('input[type=radio]');
    var labele_odpowiedzi = document.querySelectorAll('label');


    for (var j = 0; j < odpowiedz.length; j++) {
        odpowiedz[j].classList.remove("bad");
        odpowiedz[j].classList.remove("success");
        odpowiedz[j].checked = false;
        labele_odpowiedzi[j].classList.remove('is-checked');
    }
}

// Wybieramy ucznia i pytanie dla niego
function losowanie() {

    resetChoice();

    losujPytanie();
    getJSONFile("data.json");



    randNumber = Math.floor(Math.random() * uczniowie.length);


    document.querySelector("#uczen").innerHTML = uczniowie[randNumber] + " <mark><i class='material-icons'>star_border</i> LEVEL: " + level[randNumber] + " </mark> EXP: " + punkty[randNumber] + " / " + nextLevel(level[randNumber]) + " <progress value='" + punkty[randNumber] + "' max='" + nextLevel(level[randNumber]) + "'></progress></progress>";
}
function saveStatystyki() {

    var xhr = new XMLHttpRequest();

    //typ połączenia, url, czy asynchroniczen
    xhr.open("POST", "./save_json.php", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.addEventListener('load', function () {
        if (this.status === 200) {
            console.log("test" + this.responseText);
        }
    })
    document.querySelector("#statystyki").innerHTML = "";
    xhr.send("uczen=" + randNumber + "&punkty=" + punkty[randNumber] + "&level=" + level[randNumber]);

    //    alert("Aktualne punkty:" + punkty[randNumber]);
    //alert("Aktualne levele:" + level[randNumber]);

    //alert("Aktualne punkty:"+punkty);

}
function showStatystyki() {
    document.querySelector("#statystyki").innerHTML = "";
    var statystyka = '';
    for (var z = 0; z < 14; z++) {
        statystyka += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i>' + uczniowie[z] + "<br/> Level: " + level[z] + "<br/>EXP " + punkty[z] + "<br/>Nagrody: " + oceny[z] + "</span></li>";
    }
    document.querySelector("#statystyki").innerHTML = statystyka;

}
