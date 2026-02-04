/* ================= WORD DATA ================= */

const words = {
    actors:["Rajinikanth","Kamal Haasan","Vijay","Ajith","Suriya","Dhanush","Vikram","Karthi","STR","Arya","Vijay Sethupathi","Vishal","Jiiva","Jayam Ravi","Prabhu Deva","Lawrence","Sasikumar","Bobby Simha","Ashok Selvan","Sathyaraj"],
    animals:["Tiger","Elephant","Lion","Dog","Cat","Monkey","Zebra","Horse","Bear","Fox","Wolf","Rabbit","Deer","Snake","Peacock","Cow","Goat","Camel","Buffalo","Panda"],
    states:["Tamil Nadu","Kerala","Karnataka","Andhra Pradesh","Telangana","Maharashtra","Punjab","Gujarat","Rajasthan","Bihar","UP","West Bengal","Odisha","Assam","Goa","MP","Chhattisgarh","Haryana","Uttarakhand","HP"],
    movies:["Jailer","Leo","Master","Vikram","Kaithi","96","Asuran","Ghilli","Sivaji","Enthiran","Bigil","Mersal","Theri","Anniyan","Viswasam","Alaipayuthey","Soorarai Pottru","Doctor","Petta","Super Deluxe"],
    players:["Virat Kohli","MS Dhoni","Rohit Sharma","Sachin","Bumrah","Hardik","Jadeja","KL Rahul","Pant","Gill","PV Sindhu","Neeraj Chopra","Mary Kom","Saina","Sunil Chhetri","Kapil Dev","Dravid","Milkha Singh","Smriti Mandhana","Harmanpreet"],
    foods:["Biryani","Dosa","Idli","Pongal","Parotta","Samosa","Pani Puri","Chapati","Paneer","Butter Chicken","Upma","Poori","Curd Rice","Chole Bhature","Kesari","Vada","Pav Bhaji","Kachori","Fried Rice","Tandoori"]
};


/* ================= VARIABLES ================= */

let playerCount;
let chosenWord;
let currentPlayer;
let selectedCategory = "actors";
let imposters = new Set();


/* ================= ELEMENTS ================= */

const setupScreen = document.getElementById("setupScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const card = document.getElementById("card");
const inner = document.getElementById("cardInner");
const wordText = document.getElementById("wordText");
const playerLabel = document.getElementById("playerLabel");
const revealBox = document.getElementById("revealBox");


/* ================= CATEGORY ================= */

document.querySelectorAll(".cat-btn").forEach(btn=>{
    btn.onclick = ()=>{
        document.querySelectorAll(".cat-btn").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        selectedCategory = btn.dataset.value;
    };
});


/* ================= HOLD TO PEEK (MOBILE SAFE) ================= */

card.addEventListener("pointerdown", reveal);
card.addEventListener("pointerup", hide);
card.addEventListener("pointerleave", hide);

function reveal(){
    inner.classList.add("flipped");

    wordText.innerText =
        imposters.has(currentPlayer-1)
        ? "🕵️ IMPOSTER"
        : chosenWord;
}

function hide(){
    inner.classList.remove("flipped");
}


/* ================= GAME ================= */

function startGame(){

    playerCount = +document.getElementById("players").value;

    const impCount =
        +document.getElementById("imposterCount").value;   // ✅ FIXED

    if(impCount >= playerCount)
        return alert("Imposters must be less than players!");

    const list = words[selectedCategory];
    chosenWord = list[Math.floor(Math.random()*list.length)];

    imposters.clear();

    while(imposters.size < impCount){
        imposters.add(Math.floor(Math.random()*playerCount));
    }

    currentPlayer = 1;

    setupScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    showCard();
}


function showCard(){

    hide();

    playerLabel.innerText = "Player " + currentPlayer;

    playerLabel.classList.remove("player-pop");
    void playerLabel.offsetWidth;
    playerLabel.classList.add("player-pop");

    wordText.innerText = "Hold to reveal";
}


function nextPlayer(){

    currentPlayer++;

    if(currentPlayer > playerCount){
        finish();
        return;
    }

    showCard();
}


function finish(){

    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const starter = Math.floor(Math.random()*playerCount)+1;
    starterText.innerText = "Player " + starter + " starts!";

    revealBox.classList.add("hidden");
}


function revealImposters(){

    const list =
        [...imposters].map(i=>"Player "+(i+1)).join(", ");

    revealBox.innerText = "🕵️ Imposters were: " + list;
    revealBox.classList.remove("hidden");
}


function resetGame(){

    imposters.clear();

    resultScreen.classList.add("hidden");
    setupScreen.classList.remove("hidden");
}
