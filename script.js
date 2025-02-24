console.log("Game script added");

let life = 10;
let level = 1;
let points = 0;
let rangemax = 10;
let number = -1;

function showPopup(message) {
    const popupMessage = document.getElementById("popup-message");
    const popup = document.getElementById("popup");
    popupMessage.textContent = message;
    popup.classList.add("show");
}

function closePopup() {
    const popup = document.getElementById("popup");
   
    popup.classList.remove("show");
}


function startGame() {
    console.log("Game started");
    life = 10;
    document.getElementById("life").innerText = life;
    level = 1;
    document.getElementById("level").innerText = level;
    points = 0;
    document.getElementById("points").innerText = points;
    rangemax = 10;
    document.getElementById("pc-command").innerText = "Computer is thinking of a number...";
    document.getElementById("guess").value = "";

    setTimeout(function() {
        number = Math.floor(Math.random() * rangemax) + 1;
        document.getElementById("pc-command").innerText = " Guess the number between 1 and " + rangemax;
        document.getElementById("game-screen").classList.remove("hidden");
    }, 3000);

    document.getElementById("start-btn").classList.add("hidden");
}


function checkGuess() {
    let userGuess = parseInt(document.getElementById("guess").value);
    let message = document.getElementById("message");
    let recentGuesses = document.getElementById("recent-guesses");

    if (isNaN(userGuess) || userGuess < 1 || userGuess > rangemax) {
        showPopup("Oops! Wrong number. Please enter a valid number between 1 and " + rangemax);
        return;
    }

    if (userGuess === number) {
        message.textContent = "🎉 Congratulations, you guessed it! you will get extra 5 life";
        message.style.color = "#3D8D7A"; 

        points += 10;
        document.getElementById("points").innerText = points;
        level++;
        document.getElementById("level").innerText = level;
        rangemax *= 10;
        document.getElementById("range").textContent = `1-${rangemax}`;
        number = Math.floor(Math.random() * rangemax) + 1;
        life += 5;
        document.getElementById("life").innerText = life;
        document.getElementById("guess").value = "";
    }
    else {
        life--;
        document.getElementById("life").innerText = life;
        if (userGuess < number) {
            message.textContent = " Too low! Try a higher number.";
            message.style.color = "blue";
        } else {
            message.textContent = " Too high! Try a lower number.";
            message.style.color = "red";
        }
        recentGuesses.textContent += userGuess + " ";
        if (life === 0) {
            message.textContent = " -----> 💀 Game Over! Restarting...<----";
            message.style.color = "green";
            setTimeout(() => window.location.reload(),1000);
        }
    }
}

function quitGame() {
    showPopup("You quit the game!\nYour final score: " + points + "\nLevel reached: " + level);
    setTimeout(() => window.location.reload(), 1000);
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("quit-btn").addEventListener("click", quitGame);


