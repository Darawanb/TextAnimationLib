const textElement = document.getElementById('text');

const colors = {
    animation: animations.colors,
    time_ms: 1500,
    reversed: false,
    delayPerChar: 50,
    iterations: 2,
    property: ["green", "red", "purple", "black"]
};

const wave = {
    animation: animations.wave,
    time_ms: 800,
    reversed: false,
    delayPerChar: 50,
    iterations: 1,
    property: 20,
};

const fade = {
    animation: animations.fade,
    time_ms: 800,
    reversed: false,
    delayPerChar: 50,
    iterations: 1,
    property: 20,
};

playTextAnimation("text", colors);
playTextAnimation("text", fade);
playTextAnimation("text2", colors);
playTextAnimation("text2", fade);
