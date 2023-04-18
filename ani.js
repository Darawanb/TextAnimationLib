const defaultSettings = {
    waveDisplacement_px: 8,
    fadeDisplacement_px: 16,
    animationTime_ms: 1000,
    delayPerChar_ms: 100,
    fill: "forwards",
    iterations: 1,
}

const animations = {
    fade: getFadeAnimation = (property, reversed) => [
        { opacity: 0 },
        { opacity: 1 }
    ],

    fadeFrom: getFadeFromAnimation = (property, reversed) => {
        property = property ?? defaultSettings.fadeDisplacement_px;
        return [
            {
                opacity: 0,
                transform: `translateX(${(reversed ? -1 : 1) * property}px)`,
            },
            {
                opacity: 1,
                transform: "translateX(0px)",
            },
            ];
        },

    wave: getWaveAnimation = (property, reversed) => {
        property = property ?? defaultSettings.waveDisplacement_px;
        return  [
            { transform: "translateY(0px)" },
            { transform: `translateY(-${property}px)` },
            { transform: `translateY(${property}px)` },
            { transform: "translateY(0px)" },
        ];
        },

    colors: getColorAnimation = (property, reversed) => {
        property = property ?? ["red", "green", "blue"];
        return property.map(property => {
            return { color: `${property}` };
        })
    }
};

let elements = {};

function playTextAnimation(
    elementID, {
    animation, time_ms = defaultSettings.animationTime_ms, 
    reversed = false, 
    delayPerChar_ms = defaultSettings.delayPerChar_ms, 
    fill = defaultSettings.fill, 
    iterations = defaultSettings.iterations, 
    property = null 
    } ) {
    let error = false;

    if(animation == null) {
        showError("Animation must be selected. Please refer to the documentation on https://github.com/repo");
        error = true;
    }

    // We don't return earlier because this way we can catch both errors.
    if(error) return;

    setAnimation(elementID, animation, time_ms, reversed, delayPerChar_ms, fill, iterations, property);
}

function setAnimation(elementID, animation, time_ms, reversed, delayPerChar_ms, fill, iterations, property) {
    const element = document.getElementById(elementID);

    const text = element.innerText;

    if(!Object.getOwnPropertyNames(elements).includes(elementID)) {
        elements[elementID] = true;
        
        element.innerText = "";

        turnTextToSpans(text).forEach((html) => {    
            element.innerHTML += html;
        });
    }

    let spans = [...element.getElementsByClassName("char-text-animation-library")];

    // This is needed if the animation is supposed to be reversed.
    if(reversed) spans = spans.reverse();

    spans.forEach((span, index) => {
        // Starting opacity set to 0 otherwise characters show for a brief moment.
        if(animation === animations.fadeFrom) {
            span.style.opacity = 0;
            span.style.transform = `translateX(${(reversed ? -1 : 1) * property}px)`;
        }

        if(animation === animations.fade) {
            span.style.opacity = 0;
        }

        span.animate(
            animation(property, reversed),
            {
              duration: time_ms,
              fill: fill,
              iterations: iterations,
              delay: index * delayPerChar_ms
            }
          );
    })
}

function turnTextToSpans(string) {
    return Array.from(string).map(char => {
        if(char !== " ") return `<span style="position: relative; display: inline-block;" class="char-text-animation-library">${char}</span>`;
        return `<span style="position: relative; display: inline-block; min-width: 7px;" class="char-text-animation-library">${char}</span>`;
    });
}

function showError(message) {
    console.log(message);
}