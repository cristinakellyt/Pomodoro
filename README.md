# Pomodoro Timer - Project

The ideia to create this project came with the necessity to practice some skills that I was learning in Javascript.
First, I wanted to practice the Object Oriented Programming and the use of classes. Then, I started to use this project along
with my learning. Therefore I made a lot of changes during time implementing my gain knowledge, like Webpack, Web Components and
Typescript. Soon, I will refactor the code to use React.

## Table of contents

- [Overview](#overview)
  - [The project](#the-project)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
- [Future implementations](#future-implementations)
  - [Links](#links)
  - [How to run in your machine](#how-to-run-in-your-machine)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The project

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Change between the time to focus on the activity and the breaks
- Set their own time to each type of timer
- Start, pause, resume and restart the timer at any time
- See a progress bar filling according to the passed time

### Screenshot

![](./src/screenshots/Screenshot%20from%202023-06-18%2019-43-50.png)
![](./src/screenshots/Screenshot%20from%202023-06-18%2019-44-17.png)
![](./src/screenshots/Screenshot%20from%202023-06-18%2019-44-50.png)
![](./src/screenshots/Screenshot%20from%202023-06-18%2019-45-20.png)
![](./src/screenshots/Screenshot%20from%202023-06-18%2019-45-45.png)
![](./src/screenshots/Screenshot%20from%202023-06-18%2019-46-04.png)

## My process

### Built with

- Semantic HTML5 markup
- SASS
- Flexbox
- Typescript
- Webpack
- Web Component

## Future implementations

Soon, I will refactor the code to be all in React, as this is my current learning and timer is my practice project.

There are also some features that I want to implement:

- Allow the user to set the color of each timer type
- Implement a sound to play when the timer finish
- Implement a 'Task To Do' section where the user can estimate and track how many pomodoros it was needed to finish the task

### Links

- Live Site URL: [https://zk-pomodoro.netlify.app/](https://zk-pomodoro.netlify.app/)

### How to run in your machine

Open the command line in the project folder, and put the follow commands:

- npm install
- npm run dev (to the development mode)
- npm run build-app (to production mode)
- npm run lint (to run lint)

If you don't have node in you PC, you'll have to install it. The first command will make the dowload of all packages that are needed for this project. in the other ones webpack will be used to compile and bundle the code to Javascript and CSS. Lint is use to check if the source code has programmatic and stylistic errors.
