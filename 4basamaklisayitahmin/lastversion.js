const hint           = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton  = document.getElementById("restart");
const game           = document.getElementById("game");
const guessInput     = document.getElementById("guess");
const checkButton    = document.getElementById("check-btn");


const listContainer = document.getElementById("list-container");

let answer, noOfGuesses, guessedNumsArr;


const Tahmin = (answer, userGuess) => {
    let x = 0;
    let y = 0;

    for (let i = 0; i < answer.length; i++) {
        for (let j = 0; j < userGuess.length; j++) {
            if (answer[i] === userGuess[j]) {
                if (i === j) {
                    x++;
                } else {
                    y--;
                }
            }
        }
    }

    console.log(x);
    console.log(y);
    return {x, y};
};




function addTask(userGuess) {                                                    

    const { x, y } = Tahmin(answer, userGuess); 

    Tahmin(answer, userGuess);

    if (guessInput.value != '') {
        
                let liEkle       = document.createElement("li");   
                liEkle.textContent = guessInput.value + " " + x + " " + y;
                listContainer.appendChild(liEkle);  

    }


    guessInput.value = ''; 
    veriyiKaydet();

}



function veriyiKaydet() {
    localStorage.setItem("veri", listContainer.innerHTML); 
}




const play = () => {

    const userGuess = String(guessInput.value);
    if (isNaN(userGuess) || userGuess < 1000 || userGuess > 9999) {
        alert("Please enter a valid number between 1000 and 9999");
        return;
    }

    const { x, y } = Tahmin(answer, userGuess); 

    guessedNumsArr.push(userGuess); 
    noOfGuesses += 1;               

    if (userGuess != answer) {
        
        Tahmin(answer, userGuess);
    
        noOfGuessesRef.innerHTML = `<span>Tahmin Sayısı</span> ${noOfGuesses}`;
        
        hint.classList.remove("error");
        setTimeout(() => {
            hint.classList.add("error");
        }, 10);
        
    } else {
        hint.innerHTML = `Tebrikler.<br> Sayı <span>${answer}'di.</span><br> <span>${noOfGuesses}</span> deneme sonunda buldunuz.`;
        hint.classList.add("success");
        game.style.display          = "none";            
        restartButton.style.display = "block";

    }

    addTask(userGuess);


}; 


const dortBasamakliSayiUret = () => {
    let numbers = [];

    while (numbers.length < 4) {
        let randomDigit = Math.floor(Math.random() * 10);
        if (!( (numbers.includes(randomDigit)) || numbers[0] === 0) ) {
            numbers.push(randomDigit);
        }
    }

    return numbers.join('');
};



const init = () => { 

   answer = dortBasamakliSayiUret(); 
   noOfGuesses = 0;
   guessedNumsArr = [];
   noOfGuessesRef.innerHTML = "Tahmin Sayısı: 0";
   guessedNumsRef.innerHTML = "Tahminleriniz: None";
   guessInput.value = "";
   hint.classList.remove("success", "error")
   console.log(answer);
};


guessInput.addEventListener("keydown", (event) => { 
    if (event.keyCode === 13) {                    
        event.preventDefault();                       
        play();
    }

});


restartButton.addEventListener("click", () => {
    game.style.display          = "grid";
    restartButton.style.display = "none";
    hint.innerHTML = "";
    hint.classList.remove("success");
    init();
});

checkButton.addEventListener("click", play);
window.addEventListener("load", init);