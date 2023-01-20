let newGame = document.getElementById("newGame");
console.log(newGame);

let hitMe = document.getElementById("hitMe");
console.log(hitMe);

let stay = document.getElementById("stay");
console.log(stay);





let starGame = document.querySelector(".starGame");
console.log(starGame);

let again = document.querySelector(".again");
console.log(again);

let hitMo = document.querySelector(".hitMo");
console.log(hitMo);

let statusMsg = document.getElementById("message-el");
console.log(statusMsg);

let cards = document.getElementById("cards");
console.log(cards);

let house = document.querySelector(".house");
console.log(house);

let verdict = document.querySelector(".verdict");
console.log(verdict);

let audio = document.getElementById("audio"); 
console.log(audio);

let audioSad = document.getElementById("audioSad");
console.log(audioSad);

let audioMeh = document.getElementById("audioMeh");
console.log(audioMeh);

let renderWin = document.querySelector(".renderWin");
console.log(renderWin);

let renderLose = document.querySelector(".renderLose");
console.log(renderLose);

let renderTie = document.querySelector(".renderTie");
console.log(renderTie);

let displaySum = document.getElementById("displaySum");
console.log(displaySum);

const scorey = document.getElementById("scorey");

let grandTotal = 0;

let messageElla = document.querySelector(".messageElla");
console.log(messageElla);




let firstCard = getRandomCard();
let secondCard = getRandomCard();
let sum = firstCard + secondCard;
let houseNum;





let message = "";
let verdictMsg = "";




let cardsDrawn = [firstCard, secondCard];
console.log(cardsDrawn);


let hasBlackJack = false;
let isAlive = true;



// 1. Store the message-el paragraph in a variable called messageEl

function startGame() {
    //hide the start game btn
    
    starGame.classList.add("hideBtn");
    let counter = 0;
    if (sum != 21) {
        hitMo.classList.remove("hideBtn");
        stay.classList.remove("hideBtn");
    }
   

    if (sum <= 20) {
        message = "Under 21. Draw another card?"
        statusMsg.innerHTML = message;
        

        for (var i = 0; i < cardsDrawn.length; i++) {
            cards.textContent += cardsDrawn[i] + " ";

        }
        displaySum.innerHTML = sum;
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack!"
        hasBlackJack = true;
        statusMsg.innerHTML = message;
        for (var i = 0; i < cardsDrawn.length; i++) {
            cards.textContent += cardsDrawn[i] + " ";

        }
        hitMo.classList.add("hideBtn");
        displaySum.innerHTML = sum;
        again.classList.remove("hideBtn");
        stay.classList.add("hideBtn");
        renderWin.classList.remove("hideBtn");
        audio.play();
    } else {
        message = "You're out of the game!"
        isAlive = false;
        statusMsg.innerHTML = message;
        for (var i = 0; i < cardsDrawn.length; i++) {
            cards.textContent += cardsDrawn[i] + " ";
            
        }
        
        displaySum.innerHTML = sum;
        hitMo.classList.add("hideBtn");
        again.classList.remove("hideBtn");
        stay.classList.add("hideBtn");
        audioSad.play();

      
        grandTotal = grandTotal - 100;
        console.log(grandTotal);
        localStorage.setItem('total', grandTotal);
        counter = localStorage.getItem('total');
        console.log(counter);
        grandTotal = counter;
        scorey.innerHTML = grandTotal;
    }
    /*console.log(message)*/
    
}

// 2. Create a function newCard() that logs out "Drawing a new card from the deck!"

function newCard() {
    console.log("draw new card");

    // 1. Create a card variable, and hard code its value to a number (2-11)
    let addlCard = getRandomCard();
    // 2. Add the new card to the sum variable
    sum = sum + addlCard;
    // Push the card to the cards array
    cardsDrawn.push(addlCard);
    console.log(cardsDrawn);
    // 3. Call startGame()
    cards.textContent = "Cards Dealt: ";
    startGame();
}

function refresh() {
    location.reload();
}

function getRandomCard() {


    var num1 = Math.random();
    var num2 = (num1 * 13) + 1;
    var num3 = Math.floor(num2);
    // if 1     -> return 11
    if (num3 === 1) {
        return 11;
    }
    // if 11-13 -> return 10
    else if (num3 === 11 || num3 === 12 || num3 === 13) {
        return 10;
    } else {

        return num3;
    }
}

function getRandomHouse(min, max) {


    return Math.floor(Math.random() * (max - min + 1) + min)
    
}

function renderHouse() {
    houseNum = getRandomHouse(14, 21);
    house.classList.remove("hideBtn");
    hitMo.classList.add("hideBtn");
    messageElla.classList.add("hideBtn");
    house.innerHTML = "House: " + houseNum;
    verdict.classList.remove("hideBtn");
    let counter = 0;
    let runningGrand;
    if (houseNum > sum) {
        verdictMsg = "You lost $100!";
        verdict.innerHTML = "Result: " + verdictMsg;
        renderLose.classList.remove("hideBtn");
        again.classList.remove("hideBtn");
        
        audioSad.play();
      
        if (localStorage.getItem('grandTotal')) {//if local storage filled with grandTotal
            runningGrand = JSON.parse(localStorage.getItem('grandTotal'));
            runningGrand = runningGrand - 100;
            localStorage.setItem('grandTotal', JSON.stringify(runningGrand));
            scorey.innerHTML = JSON.parse(localStorage.getItem('grandTotal'));
        }
        else { //local storage is empty
            counter = -100;
            localStorage.setItem('total', JSON.stringify(counter));
            grandTotal = JSON.parse(localStorage.getItem('total'));
            console.log(grandTotal);
            localStorage.setItem('grandTotal', JSON.stringify(grandTotal)); // set LS grandTotal for the first time
            scorey.innerHTML = JSON.parse(localStorage.getItem('grandTotal'));
        }
        
        
    }
    else if (houseNum < sum) {
        verdictMsg = "You won $100!";
        verdict.innerHTML = "Result: " + verdictMsg;
    
        renderWin.classList.remove("hideBtn");
        again.classList.remove("hideBtn");
        
        audio.play();

        grandTotal = grandTotal + 100;
        localStorage.setItem('total', JSON.stringify(grandTotal));
        counter = JSON.parse(localStorage.getItem('total'));
        console.log(counter);
        grandTotal = grandTotal + counter;

        localStorage.setItem('total', JSON.stringify(grandTotal));
        scorey.innerHTML = JSON.parse(localStorage.getItem('total'));
    }
    else if (houseNum === sum) {
        verdictMsg = "Its a tie!";
        verdict.innerHTML = "Result: " + verdictMsg;
        renderTie.classList.remove("hideBtn");
        again.classList.remove("hideBtn");
        
        audioMeh.play();
    }
    stay.classList.add("hideBtn");
    audioRender.classList.remove("hideBtn");
    again.classList.remove("hideBtn");

}



if (localStorage.getItem('total')) {
    scorey.innerHTML = localStorage.getItem('total');
}
else {
    scorey.innerHTML = grandTotal;
}

//localStorage.clear();

newGame.onclick = startGame;
hitMe.onclick = newCard;
again.onclick = refresh;
stay.onclick = renderHouse;




