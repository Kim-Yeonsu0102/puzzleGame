const startBtn = document.querySelector(".start-btn");
const gameTxt = document.querySelector(".game-txt");
const playTimeArea = document.querySelector(".play-time-area");
let playTime = document.querySelector(".play-time");
let imgArea = document.querySelector(".img-container-area");
let Complete = document.querySelector(".Complete");
const cheatKey = document.querySelector(".cheatKey");
const container = document.querySelector(".img-container");
let tiles = document.querySelectorAll(".img-container > li");

let isPlaying = false;
let timeInterval = null;
let time = 0;

const dragged = {
    el: null,
    class: null,
    index: null,
};

//개발자용 힌트버튼

// cheatKey.addEventListener("click", function() {
//     [...container.children].forEach((child) => {
//         child.innerText = child.getAttribute("data-type");
//     });
// });






//핸들링 
startBtn.addEventListener("click", () => {
    setGame();

});



//함수


function nowPlaying() {
    startBtn.style.backgroundColor = "#5ab6d2";
    startBtn.style.cursor = "not-allowed";
    startBtn.innerText = "Playing";
    startBtn.disabled = true



}

function setGame() {
    nowPlaying()
    time = 0;
    Complete.style.display = "none";
    container.style.opacity = "1";
    timeInterval = setInterval(() => {
        time++;
        playTime.innerText = time;
    }, 1000);

    const gameTiles = shuffle([...tiles]);

    container.innerHTML = "";
    gameTiles.forEach((tile) => {
        container.appendChild(tile);
    });





}

function shuffle(array) {
    let index = array.length - 1;
    while (index > 0) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
        index--;
    }

    return array;
}

function checkStatus() {

    const currentList = [...container.children];

    const unMatched = currentList.filter((list, index) => {
        return Number(list.getAttribute("data-type")) !== index;
    });

    if (unMatched.length === 0) {
        isPlaying = false;


        clearInterval(timeInterval);
        startBtn.disabled = false;
        startBtn.style.cursor = "pointer";
        Complete.style.display = "block";

        startBtn.style.backgroundColor = "#999";
        startBtn.innerText = "Reset";


    }
}

container.addEventListener("dragstart", (e) => {
    const obj = e.target;
    console.log({ obj });
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf(obj);
});

container.addEventListener("dragover", (e) => {
    e.preventDefault();
    // console.log(e)
});

container.addEventListener("drop", (e) => {
    const obj = e.target;
    let originPlace;
    let isLast = false;
    if (dragged.el.nextSibling) {
        originPlace = dragged.el.nextSibling;
    } else {
        originPlace = dragged.el.previousSibling;
        isLast = true;
    }
    const droppedIndex = [...obj.parentNode.children].indexOf(obj);
    dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el);
    isLast ? originPlace.after(obj) : originPlace.before(obj);
    checkStatus();
});