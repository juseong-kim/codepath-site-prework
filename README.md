# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Juseong (Joe) Kim**

Time spent: **11** hours spent in total

Link to project:  
[Code](https://glitch.com/edit/#!/jazzy-memories)  
[Live site](https://jazzy-memories.glitch.me)

## Required Functionality

The following **required** functionality is complete:

* [:heavy_check_mark:] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [:heavy_check_mark:] "Start" button toggles between "Start" and "Stop" when clicked. 
* [:heavy_check_mark:] Game buttons each light up and play a sound when clicked. 
* [:heavy_check_mark:] Computer plays back sequence of clues including sound and visual cue for each button
* [:heavy_check_mark:] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [:heavy_check_mark:] User wins the game after guessing a complete pattern
* [:heavy_check_mark:] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [:heavy_check_mark:] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [:heavy_check_mark:] Buttons use a pitch (frequency) other than the ones in the tutorial
* [:heavy_check_mark:] More than 4 functional game buttons
* [:heavy_check_mark:] Playback speeds up on each turn
* [:heavy_check_mark:] Computer picks a different pattern each time the game is played
* [:heavy_check_mark:] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [:heavy_check_mark:] Body text updates based on whether or not the game is playing (e.g. 'click to play' -> 'click to quit').
- [:heavy_check_mark:] "Try Again" message appears if player has more tries left.
- [:heavy_check_mark:] Start and stop buttons have contrasting appearances.
- [:heavy_check_mark:] Unmute button as a workaround for the Autoplay Policy implemented by browsers.


## Video Walkthrough

Here's a walkthrough of implemented user stories:  
  
![](https://i.imgur.com/bFwJMyj.gif)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.  
    + To resolve "AudioContext was not allowed to start" [StackOverflow page](https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not).
    + Various W3Schools pages were used to customize the CSS, including those for [CSS Gradients](https://www.w3schools.com/css/css3_gradients.asp) and [Font Size](https://www.w3schools.com/cssref/pr_font_font-size.asp).
    + To remove the border outline when a button is pressed: [StackOverflow](https://stackoverflow.com/questions/3397113/how-to-remove-focus-border-outline-around-text-input-boxes-chrome).
    + To remove the border of button: [StackOverflow](https://stackoverflow.com/questions/26860884/how-to-remove-the-border-line-in-a-div-css).
    + To find the frequencies of different notes: [Wikipedia](https://en.wikipedia.org/wiki/Piano_key_frequencies).
    + For Markdown syntax: [Guide](https://www.markdownguide.org/basic-syntax/).
    + To generate a random pattern: [StackOverflow](https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript).
    + For color palette inspiration and hexcodes: [Coolors](https://coolors.co/).
  

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
  
    Resolving the **"AudioContext was not allowed to start"** issue was the largest hurdle in the debugging process.
Even after carefully following the prework tutorial for adding sound to the game buttons, none of the frequencies
were audible. As suggested by the guide document, I checked that my speakers were on and my volume was not turned down.
I also increased the value of the volume variable from 0.5 to 1.0 to ensure the oscillator was outputting a nonzero audio signal.
Without any luck, I resorted to the console and noticed on page load, the following error statement was printed:
![](https://i.imgur.com/AiaC5p2.png)
Though, at first glance, the technical details of the
[official Google developers documentation](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio),
were difficult to understand,
I was able to comprehend that the issue was due to an Autoplay Policy that launched with Chrome M71 in December 2018.
Essentially, the issue with the code in the tutorial was that the oscillator was being initialized and started via the start() function
on page load, before the user has interacted with the website.
A quick Google search of the error statement referred me to this [GitHub issue](https://github.com/Tonejs/Tone.js/issues/341) and
[StackOverflow page](https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not),
which provided example solutions, most of which involved calling resume() on the audio context after a user has interacted
with the webpage (e.g. clicking a button).  
  
    Referencing all three aforementioned sources, I decided that an unmute button would
fulfill the requirements for fixing this issue, namely the need for the resume() function and a user gesture. Applying the
same methods used to generate the start and stop buttons, I created an unmute button in HTML, adjusted its CSS to match the
style of the other buttons, implemented an unmute() function in script.js that calls resume on the AudioContext, and connected
this function to the button via the onclick parameter.
  
    Though debugging this unexpected issue was long and frustrating, as with any other code that needs to be debugged,
    the satisfaction of a fully functional, audible game made it all worth the struggle.


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)  

    I imagine that creating this light and sound memory game was much easier than it would have been without the
    tutorial document (prework.md). In addition to instructions on setting up code-editing tools (Glitch) and tailored references
    for features that were specific to the implementation of this game, all the code required to build the basic version was
    provided. This smooth, streamlined coding experience raised several questions:
    
    1. In the real world, to what extent are software projects guided, or unguided?
    1. Is there an equivalent to the tutorial document that serves as a guide while developing for the web?
    1. Is there a general workflow template or guide that web developers follow in successfully and efficiently
    completing their task from assignment to deployment?
    1. How do web developers test their work? (e.g. extraneous cases that were overlooked, browser compatibility)
    1. When debugging, I would change various snippets of the code and watch the web app constantly change and
    occasionally bring up new errors. How do web developers keep track of the edits they make? If they were to leave their desk
    in the middle of implementing a feature, how do they know where to pick up from afterwards?


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)    
    1. Configuring the **layout** of the text and the game buttons so that it is more responsive and consistent. Currently, when
    the screen size is altered, the six game buttons simply remain a fixed size and relocate to stay on the screen. This leads
    to unpleasant game layouts like five buttons on one row and only one on the second row:
    ![](https://i.imgur.com/j4Mgm0R.png)
    In addition to game buttons that adjust in size (e.g. defining them as percentages of the viewport), centering the text
    and buttons can also help with the aesthetic of the web app.

    1. Incorporating **icons**: Specfically, the "unmute" text could be substituted with an icon, such as a speakerphone
    with a slash through it (e.g :mute:)
    
    1. Displaying the **number of tries left** on incorrect guesses. The current version of the app only displays the
    "try again" message. The position of this message would also be altered such that the game buttons don't shift
    down/up as the message appears/disappears.
    
    1. Randomization or **customization of the frequencies** of each game button, making sure that any two pitches are distinguishable.
        1. Allowing the user to select **specific musical scales** before each game
        (e.g. major/minor scales, diatonic scales, etc.)
    
    1. Implementing the optional features from above that were left unchecked!



## License

    Copyright Juseong (Joe) Kim

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
