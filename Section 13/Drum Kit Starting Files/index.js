var audioList = [
    "sounds/crash.mp3",
    "sounds/kick-bass.mp3",
    "sounds/snare.mp3",
    "sounds/tom-1.mp3",
    "sounds/tom-2.mp3",
    "sounds/tom-3.mp3",
    "sounds/tom-4.mp3"
]

for (let i = 0; i <= 6; i++) {
    document.querySelectorAll('.drum')[i].addEventListener('click', function () {
        this.style.color = this.style.color == 'white' ? '#DA0463' : 'white';
        var audio = new Audio(audioList[i]);
        document.querySelectorAll('.drum')[i].classList.add("pressed");
        audio.play();
        setTimeout(function () { document.querySelectorAll('.drum')[i].classList.remove("pressed"); }, 100);
    });
}

for (let i = 0; i <= 6; i++) {
    document.addEventListener('keydown', function (even) {
        switch (even.key) {
            case "w":
                i = 0;
                break;
            case "a":
                i = 1;
                break;
            case "s":
                i = 2;
                break;
            case "d":
                i = 3;
                break;
            case "j":
                i = 4;
                break;
            case "k":
                i = 5;
                break;
            case "l":
                i = 6;
                break;
            default:
                i = null;
                console.log(even);
                break;
        }
        document.querySelectorAll('.drum')[i].style.color = document.querySelectorAll('.drum')[i].style.color == 'white' ? '#DA0463' : 'white';
        var audio = new Audio(audioList[i]);
        document.querySelectorAll('.drum')[i].classList.add("pressed");
        audio.play();
        setTimeout(function () { document.querySelectorAll('.drum')[i].classList.remove("pressed"); }, 100);
    });
    break;
}




