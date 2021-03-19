let myLibrary = [];

window.onload = () => {
    if(!localStorage.getItem("hentaiList")) {
        localStorage.setItem("hentaiList", JSON.stringify([]));
    } else {
        myLibrary = JSON.parse(localStorage.getItem("hentaiList"));
        displayLibrary();
    }
}




const tableBody = document.querySelector(".book-list").getElementsByTagName('tbody')[0];
const addPopup = document.querySelector(".popup-shadow");
const addHentaiButton = document.querySelector(".add-hentai");


addHentaiButton.addEventListener("click", () => showPopup(true));


function Hentai(title, score, episodes, completedStatus, index){
    this.index = index;
    this.title = title;
    this.score = score;
    this.episodes = episodes;
    this.completed = completedStatus === true ? 'Completo' : 'Incompleto';
}

//form
const form = document.querySelector(".list-input");
form.addEventListener("submit", addHentai);

function addHentai(e) {
    e.preventDefault();
    getHentaiFromInput();
}

function getHentaiFromInput() {
    let title = document.getElementById("title").value;
    let score = document.getElementById("score").value;
    let eps = document.getElementById("eps").value;
    let finished = eps > 3 ? true : false;
    addHentaiToLibrary(title, score, eps, finished);
}

function addHentaiToLibrary(title, score, eps, finished){
    var index = myLibrary.length + 1;
    myLibrary.push(new Hentai(title, score, eps, finished, index));
    showPopup(false);
    displayLibrary();
    updateSelectors();
}

//------------------------
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//|||||||||||||||||||||||||||||
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVV
function updateSelectors() {
    let titleList = document.querySelectorAll(".item-title");
    let statusList = document.querySelectorAll(".h-status");
    titleList.forEach(item => item.addEventListener("click", removeHentai))
    statusList.forEach(item => item.addEventListener("click", switchStatus))
    localStorage.setItem('hentaiList', JSON.stringify(myLibrary));
}

function removeHentai(e){
    e = e || window.event;
    let titleName = e.target.textContent;
    myLibrary = myLibrary.filter((item) => item.title !== titleName);
    displayLibrary();
}

function switchStatus(e){
    e = e || window.event;
    e.target.textContent = e.target.textContent === "Completo" ? "Incompleto" : "Completo";  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//||||||||||||||||||||||||||||
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//PRECISA SER MUDADO!!!!
//-------------------------


function showPopup(_switch){ 
    addPopup.style.visibility = _switch ? 'visible' : 'hidden';
}


function displayLibrary() {
    let tableHead = tableBody.firstChild;
    tableBody.innerHTML = "";
    tableBody.appendChild(tableHead);

    myLibrary.forEach((item) => {
        let newRow = tableBody.insertRow();

        for (var prop in item){
            let newCell = newRow.insertCell();
            if(prop == 'title') newCell.classList.add("item-title");
            if(prop == 'score' || prop == 'completed') newCell.classList.add("item-highlight");
            if(prop == 'completed') newCell.classList.add("h-status");

            let newText = document.createTextNode(item[prop]);
            newCell.appendChild(newText);
            
        }

    })

    updateSelectors();
};
