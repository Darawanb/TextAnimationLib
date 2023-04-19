# TextAnimationLib
Javascript library to animate text based components


## How to use

Start by making a config object.

```
config = {
    animation: animations.colors,
    time_ms: 1000,
    delayPerChar_ms: 50,
    iterations: Infinity,
    property: ["green", "red", "pink", "magenta", "purple"],
}
```

Then all you have to do is call the function

```
playTextAnimation(element_ID, config);
```

## Different kinds of animations

```
animations.colors // Shifts colors with a delar between each character
animations.wave // Causes a wave like effect on each character
animations.fade // As the name suggest, the text fades in
animations.fadeFromn // The text fades in as well as comes into view
```

## Configuration

When setting the config object you have multiple options you could tinker with. Most of them explain themselves. Iterations could be Infinity or an integer value.
Property could be an array of strings representing CSS colors or an integer value representing the strength. This depends on which animation you have selected.
The reversed option could be set to true or false, this reverses the animation. Here's another example of a config object that is unlike the one we saw earlier.

```
config = {
    animation: animations.wave,
    time_ms: 1000,
    delayPerChar_ms: 50,
    iterations: 1,
    property: 8,
    reversed: true,
}
```
