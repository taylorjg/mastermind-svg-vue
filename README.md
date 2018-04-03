[![CircleCI](https://circleci.com/gh/taylorjg/mastermind-svg-prototype/tree/master.svg?style=svg)](https://circleci.com/gh/taylorjg/mastermind-svg-prototype/tree/master)

# Description

I previously implemented [Mastermind in React](https://github.com/taylorjg/Mastermind).
However, the UI is very poor. I decided to try to improve it by using SVG.
I created this separate repo to play around with it.

# TODO

## UI things

* [x] Add HTML "New Game" button
* [x] Add HTML "Enter" button to enter a guess
* [x] Show/hide secret panel cover
* [x] Allow selection of a peg colour from a colour menu
* [ ] Add flashing focus circles to the large peg holes for the active row
* [ ] Use SVG buttons instead of HTML buttons
* [ ] Add some fanfare around game win/loss
* [ ] Add shine/gloss to large/small pegs
* [ ] Add animations (e.g. when revealing the secret code)
* [ ] Responsive UI: size of device
* [ ] Responsive UI: orientation of device

## Non-UI things

* [x] Add basic game logic
* [ ] Use [Vue.js](https://vuejs.org/) (my first Vue.js app!)

## Boring things

* [x] Add CI/CD via CircleCI 2.0
* [x] Deploy to Heroku