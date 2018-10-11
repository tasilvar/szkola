/*
Prosty skrypt losowania z tablicy indeksu reprezentującego ucznia
*/
var myObj;
var x;
var uczniowie = [];
var level_status;
var oceny = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
]

var level = [
    1,  // Ł. Augustyniak
    1,  // E. Cierniak
    4,  // W. Grabowski
    2, // Kłonowski 
    4, // J. Knapiński
    1, // P. Korylak
    1, // F. Kowalczyk
    1, //  J.  Kowalczyk
    3, // Latoszewski
    3, // Muskała 
    2, // B. Niewiadomski
    1,// N. Panasiuk
    3,  // A. Połczyński 
    7,//T. Socha


]
var punkty = [
    0, // Ł. Augustyniak
   5, // E. Cierniak
   35, // W. Grabowski
    5, // Kłonowski 
    40, // J. Knapiński
    0, // P. Korylak
    30, // F. Kowalczyk
    25,//  J.  Kowalczyk
    35, // Latoszewski
    30, // Muskała 
    15, // B. Niewiadomski
    0,  // N. Panasiuk
    35, // A. Połczyński 
    95, //T. Socha
];

var randNumber;
function getJSONFile() {

    var xmlhttp = new XMLHttpRequest();  // nawiązanie połączenia asynchronicznego
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { // stan połączenia 
            myObj = JSON.parse(this.responseText);

            //console.log("Json parsed data is: " + JSON.stringify(myObj.pytania[x].pytanie));
            document.querySelector('#pytanie').innerHTML = "<h2>" + (myObj.pytania[x].pytanie) + "</h2>";
            document.querySelector('#odp1').innerHTML = "<b>A:</b> " + (myObj.pytania[x].odp1);
            document.querySelector('#odp2').innerHTML = "<b>B:</b> " + (myObj.pytania[x].odp2);
            document.querySelector('#odp3').innerHTML = "<b>C:</b> " + (myObj.pytania[x].odp3);
            document.querySelector('#odp4').innerHTML = "<b>D:</b> " + (myObj.pytania[x].odp4);
        }
    };

    xmlhttp.open("GET", "data.json", true);

    // wysyłamy połączenie
    xmlhttp.send();

}

window.onload = initObjects;

function nextLevel(level) {

    var nextLevel = parseInt((level) * 10 * Math.PI / 2);

    return nextLevel;
}

function ocena(uczen) {
    alert("Masz 5tkę");
    oceny[uczen] = oceny[uczen] + "5, ";
}
function levelUp(uczen, level, punkty) {

    if (punkty >= ((level) * 10 * Math.PI / 2)) {
        alert(uczniowie[uczen] + " Level UP!");
        level_status = true;
    }
    else {
        level_status = false;
    }
    return level_status;
}
function initObjects() {

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

    getJSONFile();

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
    showStatystyki();

}

// $(".trescE").each(function () { console.log('{ "pytanie" : "' + $(this).html() + '"' + "\n" + '"odp1" : "' + $(this).next().html() + '"' + "\n" + '"odp2": "' + $(this).next().next().html() + '"' + "\n" + '"odp3" : "' + $(this).next().next().next().html() + '"' + "\n" + '"odp4" : "' + $(this).next().next().next().next().html() + '" }'); });

// Losujemy które pytanie ma zadac

function losujPytanie() {

    x = Math.floor((Math.random()) * 80);
    return x;
    console.log(x);
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

    uczniowie = [
        'Ł. Augustyniak',
        'E. Cierniak',
        'W. Grabowski',
        'K. Kłonowski',
        'J. Knapiński',
        'P. Korylak',
        'J. Kowalczyk',
        'F. Kowalczyk',
        'P. Latoszewski',
        'J. Muskała',
        'B. Niewiadomski',
        'N. Panasiuk',
        'A. Połczyński',
        'T. Socha',
    ];

    losujPytanie();
    getJSONFile();

    randNumber = Math.floor(Math.random() * uczniowie.length);


    document.querySelector("#uczen").innerHTML = uczniowie[randNumber] + " <mark><i class='material-icons'>star_border</i> LEVEL: " + level[randNumber] + " </mark> EXP: " + punkty[randNumber] + " / " + nextLevel(level[randNumber]) + " <progress value='" + punkty[randNumber] + "' max='" + nextLevel(level[randNumber]) + "'></progress></progress>";
}
function saveStatystyki()  {

    var xmlhttp = new XMLHttpRequest();  // nawiązanie połączenia asynchronicznego
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { // stan połączenia 
          alert(xmlhttp);
        }

        
    xmlhttp.open("GET", "save_json.php", true);

    // wysyłamy połączenie
    xmlhttp.send();
    }

alert("Aktualne punkty:"+punkty);
alert("Aktualne levele:"+level);

//alert("Aktualne punkty:"+punkty);

}
function showStatystyki() {
    var statystyka = '';
    for (var z = 0; z < uczniowie.length; z++) {
        statystyka += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i>' + uczniowie[z] + "<br/> Level: " + level[z] + "<br/>EXP " + punkty[z] + "<br/>Nagrody: " + oceny[z] + "</span></li>";
    }
    document.querySelector("#statystyki").innerHTML = statystyka;
 
// Ł. Augustyniak
// Level: 1
// EXP 0
// Nagrody:
// person
// E. Cierniak
// Level: 1
// EXP 10
// Nagrody:
// person
// W. Grabowski
// Level: 4
// EXP 50
// Nagrody:
// person
// K. Kłonowski
// Level: 2
// EXP 25
// Nagrody:
// person
// J. Knapiński
// Level: 4
// EXP 50
// Nagrody:
// person
// J. Kowalczyk
// Level: 2
// EXP 35
// Nagrody:
// person
// F. Kowalczyk
// Level: 2
// EXP -5
// Nagrody:
// person
// P. Latoszewski
// Level: 2
// EXP 20
// Nagrody:
// person
// J. Muskała
// Level: 3
// EXP 35
// Nagrody:
// person
// B. Niewiadomski
// Level: 2
// EXP 20
// Nagrody:
// person
// N. Panasiuk
// Level: 1
// EXP 0
// Nagrody:
// person
// A. Połczyński
// Level: 3
// EXP 35
// Nagrody:
// person
// T. Socha
// Level: 6
// EXP 85
// Nagrody:

}
