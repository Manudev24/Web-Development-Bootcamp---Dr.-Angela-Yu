var randomNumber1 = (Math.floor(Math.random() * 6) + 1);
var randomNumber2 = (Math.floor(Math.random() * 6) + 1);
var label;

if (randomNumber1 > randomNumber2) {
    label = "🚩Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
    label = "Player 2 Wins!🚩";
} else {
    label = "Draw!"
}
document.querySelector("h1").innerHTML = label;
document.querySelector(".dice .img1").setAttribute("src", `/images/dice${randomNumber1}.png`);
document.querySelector(".dice .img2").setAttribute("src", `/images/dice${randomNumber2}.png`);


