import { TweenMax, Expo } from "gsap";

const C = {
  R: "#FF0000",
  G: "#00FF00",
  B: "#0000FF",
  Y: "#FFFF00",
  BL: "#000000",
  WH: "#FFFFFF"
};

const COLOURS = Object.values(C);

const P = {
  R: Symbol('red'),
  G: Symbol('green'),
  B: Symbol('blue'),
  Y: Symbol('yellow'),
  BL: Symbol('black'),
  WH: Symbol('white')
};

const PEGS = Object.values(P);

const PEG_TO_COLOUR = {
  [P.R]: C.R,
  [P.G]: C.G,
  [P.B]: C.B,
  [P.Y]: C.Y,
  [P.BL]: C.BL,
  [P.WH]: C.WH,
};

const COLOUR_TO_PEG = {
  [C.R]: P.R,
  [C.G]: P.G,
  [C.B]: P.B,
  [C.Y]: P.Y,
  [C.BL]: P.BL,
  [C.WH]: P.WH,
};

const BOARD_WIDTH = 414;
const BOARD_HEIGHT = 736;
const LARGE_PEG_RADIUS = 15;
const SMALL_PEG_RADIUS = 7;
const SMALL_PEG_HOLE_RADIUS = 6;
const LARGE_PEG_HOLE_RADIUS = 12;
const SECRET_ROW_CENTRE_Y = 38;
const FIRST_ROW_CENTRE_Y = 140;
const ROW_GAP_Y = 60;
const FIRST_LARGE_PEG_X = 155;
const LARGE_PEG_GAP_X = 62;
const SMALL_PEG_GAP_Y = 10;
const SMALL_PEG_LEFT_X = 60;
const SMALL_PEG_RIGHT_X = 86;

const S = {
  INITIALISED: Symbol('initialised'),
  IN_PROGRESS: Symbol('in progress'),
  WON: Symbol('won'),
  LOST: Symbol('lost')
};

const state = {
  gameState: S.INITIALISED,
  secret: [],
  guess: [],
  activeGuessRowIndex: -1,
  showingColourMenuFor: -1
};

const board = document.getElementById("board");
const btnNewGame = document.getElementById("btnNewGame");
const btnEnter = document.getElementById("btnEnter");

const generateRandomSecret = () => {
  const chooseRandomPeg = () => {
    const randomIndex = Math.floor((Math.random() * PEGS.length));
    return PEGS[randomIndex];
  };
  return range(4).map(chooseRandomPeg);
};

const evaluateGuess = (secret, guess) => {
  const count = (xs, p) => xs.filter(x => x === p).length;
  const add = (a, b) => a + b;
  const sum = PEGS.map(p => Math.min(count(secret, p), count(guess, p))).reduce(add);
  const blacks = secret.filter((peg, index) => peg === guess[index]).length;
  const whites = sum - blacks;
  return { blacks, whites };
};

const range = n => Array.from(Array(n).keys());

const createSVGElement = elementName =>
  document.createElementNS('http://www.w3.org/2000/svg', elementName);

const addSecretPanel = () => {
  const path = createSVGElement("path");
  path.setAttribute("class", "secret-panel");
  path.setAttribute("d", "M134 10 L124 10 L124 80 L372 80 L372 10 L362 10");
  board.appendChild(path);
  range(4).forEach(addSecretPanelLargePegHole);
};

const addSecretPanelLargePegHole = n =>
  (-1, n, SECRET_ROW_CENTRE_Y);

const showSecretPanelCover = () => {

  const group = createSVGElement("g");
  group.setAttribute("data-piece", "secret-panel-cover");

  const path = createSVGElement("path");
  path.setAttribute("class", "secret-panel-cover");
  path.setAttribute("d", "M127 13 L127 77 L369 77 L369 13 Z");
  group.appendChild(path);

  const text1 = createSVGElement("text");
  text1.setAttribute("x", 127 + 20);
  text1.setAttribute("y", 46);
  text1.setAttribute("class", "secret-panel-cover-text-1");
  text1.appendChild(document.createTextNode("MASTER"));
  group.appendChild(text1);

  const text2 = createSVGElement("text");
  text2.setAttribute("x", 369 - 20);
  text2.setAttribute("y", 74);
  text2.setAttribute("class", "secret-panel-cover-text-2");
  text2.appendChild(document.createTextNode("MIND"));
  group.appendChild(text2);

  board.appendChild(group);
};

const hideSecretPanelCover = () => {
  document
    .querySelectorAll("[data-piece='secret-panel-cover']")
    .forEach(piece => piece.remove());
};

const addRows = () =>
  range(10).forEach(addRow);

const addRow = row => {
  addRowNumber(row);
  addRowSmallPegHoles(row);
  addRowLargePegHoles(row);
};

const addRowNumber = row => {
  const inverseRowNumber = 9 - row;
  const text = createSVGElement("text");
  text.setAttribute("x", (SMALL_PEG_RIGHT_X + SMALL_PEG_LEFT_X) / 2);
  text.setAttribute("y", FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y) + 4);
  text.setAttribute("class", "row-number-text");
  text.appendChild(document.createTextNode(`${inverseRowNumber + 1}`));
  board.appendChild(text);
};

const addRowSmallPegHoles = row => {
  range(4).forEach(n => addRowSmallPegHole(row, n));
};

const addRowSmallPegHole = (row, n) => {
  const cx = n % 2 === 0 ? SMALL_PEG_LEFT_X : SMALL_PEG_RIGHT_X;
  const cy = FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y) + SMALL_PEG_GAP_Y * (n >= 2 ? +1 : -1);
  const circle = createSVGElement("circle");
  circle.setAttribute("class", "small-peg-hole");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", SMALL_PEG_HOLE_RADIUS);
  board.appendChild(circle);
};

const addRowLargePegHoles = row => {
  range(4).forEach(n => addRowLargePegHole(row, n));
};

const addRowLargePegHole = (row, n) => {
  const cy = FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y);
  addLargePegHole(row, n, cy);
};

const makeLargePegClickHandler = (row, n) => () => {
  if (state.gameState !== S.IN_PROGRESS) return;
  if (row !== state.activeGuessRowIndex) return;
  if (state.showingColourMenuFor >= 0 && state.showingColourMenuFor !== n) {
    showColourMenuFor(n, 0);
  }
  else {
    toggleColourMenuFor(n);
  }
};

const addLargePegHole = (row, n, cy) => {
  const inverseRowNumber = 9 - row;
  const cx = FIRST_LARGE_PEG_X + (n * LARGE_PEG_GAP_X);
  const circle = createSVGElement("circle");
  circle.setAttribute("class", "large-peg-hole");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", LARGE_PEG_HOLE_RADIUS);
  circle.addEventListener("click", makeLargePegClickHandler(inverseRowNumber, n));
  board.appendChild(circle);
};

const buildPathDataForSmallHolesCutOut = row => {
  const cy = FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y);
  const y1 = cy - 26;
  const y2 = cy + 26;
  const d = `M40 ${y1} L107 ${y1} L107 ${y2} L40 ${y2} Z`;
  return d;
};

const buildPathDataForLargeHolesCutOut = row => {
  const dx = 21;
  const dy = 17;
  const cy = FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y);
  const y1 = cy - dy;
  const y2 = cy + dy;
  const r = 27;
  const cx1 = FIRST_LARGE_PEG_X;
  const cx2 = FIRST_LARGE_PEG_X + LARGE_PEG_GAP_X;
  const cx3 = FIRST_LARGE_PEG_X + (2 * LARGE_PEG_GAP_X);
  const cx4 = FIRST_LARGE_PEG_X + (3 * LARGE_PEG_GAP_X);
  const d1 = `M${cx1 + dx} ${y2} A ${r} ${r} 0 1 1 ${cx1 + dx} ${y1}`;
  const d2 = `L${cx2 - dx} ${y1} A ${r} ${r} 1 0 1 ${cx2 + dx} ${y1}`;
  const d3 = `L${cx3 - dx} ${y1} A ${r} ${r} 1 0 1 ${cx3 + dx} ${y1}`;
  const d4 = `L${cx4 - dx} ${y1} A ${r} ${r} 1 1 1 ${cx4 - dx} ${y2}`;
  const d5 = `L${cx3 + dx} ${y2} A ${r} ${r} 1 0 1 ${cx3 - dx} ${y2}`;
  const d6 = `L${cx2 + dx} ${y2} A ${r} ${r} 1 0 1 ${cx2 - dx} ${y2} Z`;
  return [d1, d2, d3, d4, d5, d6].join(" ");
};

const addMainPanel = () => {
  const pathDataForMainPanelOutline = "M30 100 L374 100 L374 720 L30 720 Z";
  const pathDataForSmallHoleCutOuts = range(10).map(buildPathDataForSmallHolesCutOut);
  const pathDataForLargeHoleCutOuts = range(10).map(buildPathDataForLargeHolesCutOut);
  const pathData = [
    pathDataForMainPanelOutline,
    ...pathDataForSmallHoleCutOuts,
    ...pathDataForLargeHoleCutOuts
  ].join(" ");
  const path = createSVGElement("path");
  path.setAttribute("class", "main-panel");
  path.setAttribute("d", pathData);
  board.appendChild(path);
};

const addSmallPeg = (row, n, colour) => {
  const inverseRowNumber = 9 - row;
  const cx = n % 2 === 0 ? SMALL_PEG_LEFT_X : SMALL_PEG_RIGHT_X;
  const cy =
    FIRST_ROW_CENTRE_Y +
    (inverseRowNumber * ROW_GAP_Y) +
    SMALL_PEG_GAP_Y * (n >= 2 ? +1 : -1);
  const circle = createSVGElement("circle");
  circle.setAttribute("class", "small-peg");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", SMALL_PEG_RADIUS);
  circle.setAttribute("fill", colour);
  circle.setAttribute("data-piece", "small-peg");
  board.appendChild(circle);
};

const addLargePeg = (row, n, colour) => {
  const inverseRowNumber = 9 - row;
  const position = `${row}:${n}`;
  const cy = (row < 0)
    ? SECRET_ROW_CENTRE_Y
    : FIRST_ROW_CENTRE_Y + (inverseRowNumber * ROW_GAP_Y);
  const cx = FIRST_LARGE_PEG_X + (n * LARGE_PEG_GAP_X);
  const circle = createSVGElement("circle");
  circle.setAttribute("class", "large-peg");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", LARGE_PEG_RADIUS);
  circle.setAttribute("fill", colour);
  circle.setAttribute("data-piece", "large-peg");
  circle.setAttribute("data-position", position);
  circle.addEventListener("click", makeLargePegClickHandler(row, n));
  board.appendChild(circle);
};

const removeLargePeg = (row, n) => {
  const position = `${row}:${n}`;
  document
    .querySelectorAll(`[data-position='${position}']`)
    .forEach(piece => piece.remove());
};

const removePegs = () => {
  document
    .querySelectorAll("[data-piece='small-peg']")
    .forEach(piece => piece.remove());
  document
    .querySelectorAll("[data-piece='large-peg']")
    .forEach(piece => piece.remove());
};

const showSecret = secret => {
  const colours = secret.map(peg => PEG_TO_COLOUR[peg]);
  colours.forEach((colour, index) => addLargePeg(-1, index, colour));
};

const setFeedback = (row, feedback) => {
  const blacks = Array(feedback.blacks).fill(C.BL);
  const whites = Array(feedback.whites).fill(C.WH);
  const colours = [...blacks, ...whites];
  colours.forEach((colour, index) => addSmallPeg(row, index, colour));
};

const showNewGameButton = () => btnNewGame.style.display = "block";
const hideNewGameButton = () => btnNewGame.style.display = "none";
const showEnterButton = () => btnEnter.style.display = "block";
const hideEnterButton = () => btnEnter.style.display = "none";
const enableEnterButton = () => btnEnter.disabled = false;
const disableEnterButton = () => btnEnter.disabled = true;

hideEnterButton();
addSecretPanel();
addRows();
addMainPanel();

const onNewGame = () => {
  removePegs();
  showSecretPanelCover();
  hideNewGameButton();
  showEnterButton();
  disableEnterButton();
  state.gameState = S.IN_PROGRESS;
  state.secret = generateRandomSecret();
  state.guess = Array(4).fill({});
  state.activeGuessRowIndex = 0;
};

const onEnter = () => {
  if (state.gameState !== S.IN_PROGRESS) return;
  const guess = state.guess.map(g => g.peg);
  const feedback = evaluateGuess(state.secret, guess);
  setFeedback(state.activeGuessRowIndex, feedback);
  if (feedback.blacks === 4) {
    state.gameState = S.WON;
  }
  else {
    state.guess = Array(4).fill({});
    state.activeGuessRowIndex++;
    if (state.activeGuessRowIndex === 10) {
      state.gameState = S.LOST;
    }
  }
  if (state.gameState === S.WON || state.gameState === S.LOST) {
    hideSecretPanelCover();
    showSecret(state.secret);
    hideEnterButton();
    showNewGameButton();
  }
  else {
    disableEnterButton();
  }
};

const makeColourSwatchClickHandler = colour => () => {
  const row = state.activeGuessRowIndex;
  const n = state.showingColourMenuFor;
  removeLargePeg(row, n);
  addLargePeg(row, n, colour);
  state.guess[n] = { peg: COLOUR_TO_PEG[colour] };
  if (state.guess.length === 4 && state.guess.every(g => !!g.peg)) {
    enableEnterButton();
  }
  hideColourMenu();
};

const createColourMenu = () => {

  const outerRect = createSVGElement("rect");
  outerRect.setAttribute("x", 30);
  outerRect.setAttribute("y", 10);
  outerRect.setAttribute("width", 344);
  outerRect.setAttribute("height", 70);
  outerRect.setAttribute("class", "colour-menu");

  const innerRect = createSVGElement("rect");
  innerRect.setAttribute("x", 36);
  innerRect.setAttribute("y", 16);
  innerRect.setAttribute("width", 368 - 36);
  innerRect.setAttribute("height", 74 - 16);
  innerRect.setAttribute("class", "colour-menu-inner");

  const colourMenu = createSVGElement("g");
  colourMenu.appendChild(outerRect);
  colourMenu.appendChild(innerRect);

  const gap = (368 - 36) / 6;
  const hgap = gap / 2;
  COLOURS.forEach((colour, index) => {
    const cx = 36 + hgap + gap * index;
    const cy = (16 + 74) / 2;
    const colourSwatch = createSVGElement("circle");
    colourSwatch.setAttribute("class", "large-peg");
    colourSwatch.setAttribute("cx", cx);
    colourSwatch.setAttribute("cy", cy);
    colourSwatch.setAttribute("r", LARGE_PEG_RADIUS);
    colourSwatch.setAttribute("fill", colour);
    colourSwatch.addEventListener("click", makeColourSwatchClickHandler(colour));
    colourMenu.appendChild(colourSwatch);
  });

  const centreX = FIRST_LARGE_PEG_X;
  const pointer = createSVGElement("path");
  const pathData = `M${centreX} 97 L${centreX - 10} 83 L${centreX + 10} 83 Z`;
  pointer.setAttribute("d", pathData);
  pointer.setAttribute("class", "colou-menu-pointer");

  return { colourMenu, pointer };
};

const showColourMenuFor = (n, duration = 1) => {
  state.showingColourMenuFor = n;
  const row = state.activeGuessRowIndex;
  const inverseRowNumber = 9 - row;

  const txColourMenu = 0;
  const tyColourMenu = FIRST_ROW_CENTRE_Y + ((inverseRowNumber - 2) * ROW_GAP_Y);
  colourMenu.setAttribute("transform", `translate(${txColourMenu}, ${tyColourMenu})`);
  colourMenu.style.opacity = 1;

  const txPointer = n * LARGE_PEG_GAP_X;
  const tyPointer = FIRST_ROW_CENTRE_Y + ((inverseRowNumber - 2) * ROW_GAP_Y);
  pointer.setAttribute("transform", `translate(${txPointer}, ${tyPointer})`);
  pointer.style.opacity = 1;

  board.appendChild(colourMenu);
  board.appendChild(pointer);

  TweenMax.from([colourMenu, pointer], duration, {
    opacity: 0, ease: Expo.easeOut
  });
};

const hideColourMenu = () => {
  state.showingColourMenuFor = -1;
  TweenMax.to([colourMenu, pointer], 1, {
    opacity: 0, ease: Expo.easeOut, onComplete() {
      board.removeChild(colourMenu);
      board.removeChild(pointer);
    }
  });
};

const { colourMenu, pointer } = createColourMenu();

const toggleColourMenuFor = n =>
  state.showingColourMenuFor >= 0 ? hideColourMenu() : showColourMenuFor(n);

btnNewGame.addEventListener("click", onNewGame);
btnEnter.addEventListener("click", onEnter);
