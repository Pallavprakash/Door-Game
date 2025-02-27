let ep = 100;
let currentDoor = 1;
let hintCount = 0;

function isPalindrome(num) {
    let str = num.toString();
    return str === str.split('').reverse().join('');
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function showHint(hintMessage) {
    document.getElementById("hint").innerText = hintMessage;
    ep -= 10;
}

function updateMessage(message) {
    document.getElementById("message").innerText = message;
}

function playGame() {
    let passwordInput = document.getElementById("password");
    let password = parseInt(passwordInput.value);

    if (isNaN(password)) {
        updateMessage("Please enter a valid number.");
        return;
    }

    switch (currentDoor) {
        case 1:
            if (password % 3 === 2 && password % 5 === 3 && password % 7 === 4) {
                updateMessage("Door 1 Opened. Time for Door 2.");
                currentDoor++;
                hintCount = 0;
                document.getElementById("hint").innerText = "Hint will appear here.";
                passwordInput.value = "";
            } else {
                handleWrongAttempt("Hint: Think about the Chinese Remainder Theorem.");
            }
            break;
        case 2:
            if (password % 17 === 7 && password % 12 === 0 && password % 15 === 0 && password < 10000) {
                updateMessage("Door 2 Opened. Time for Door 3.");
                currentDoor++;
                hintCount = 0;
                document.getElementById("hint").innerText = "Hint will appear here.";
                passwordInput.value = "";
            } else {
                handleWrongAttempt("Hint: Number is divisible by 12 and 15 and gives 7 as a remainder when divided by 17.");
            }
            break;
        case 3:
            let sumDigits = password.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
            if (isPalindrome(password) && sumDigits > 15 && password % 11 === 0) {
                updateMessage("Door 3 Opened. Time for Door 4.");
                currentDoor++;
                hintCount = 0;
                document.getElementById("hint").innerText = "Hint will appear here.";
                passwordInput.value = "";
            } else {
                handleWrongAttempt("Hint: The number is a palindrome whose sum of digits is 15 and it is divisible by 11.");
            }
            break;
        case 4:
            if (isPrime(password) && (password % 10 === 7) && ((Math.floor(password / 10) % 2) === 1)) {
                updateMessage("Door 4 Opened. Congrats! You have won the game.\nRefresh the Game to Play Again.");
                passwordInput.value = "";
            } else {
                handleWrongAttempt("Hint: The number is prime and ends in 7.");
            }
            break;
    }
}

function handleWrongAttempt(hintMessage) {
    ep -= 5;
    hintCount++;
    updateMessage(`Wrong Password. Remaining EP: ${ep}. Try Again.`);

    if (ep <= 0) {
        updateMessage("Game Over. You ran out of EP!");
    } else if (hintCount === 3) {
        let userWantsHint = confirm("Do you want to take a hint? It will cost 10 EP.");
        if (userWantsHint) {
            showHint(hintMessage);
        }
        hintCount = 0;
    }
}

document.getElementById("password").addEventListener("input", function () {
    document.getElementById("hint").innerText = "Hint will appear here.";
});