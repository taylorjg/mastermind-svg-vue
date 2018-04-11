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

// document.body.clientWidth
// document.body.clientHeight
// Moto G (4): 360 x 512
const BOARD_WIDTH = 360;
const BOARD_HEIGHT = 512;
// const BOARD_WIDTH = 414;
// const BOARD_HEIGHT = 736;

const GUTTER_TOP = 10;
const GUTTER_BOTTOM = 10;
const GUTTER_LEFT = 55;
const GUTTER_RIGHT = 35;

const SECRET_PANEL_WIDTH = 200;
const SECRET_PANEL_HEIGHT = 45;
const SECRET_PANEL_X = BOARD_WIDTH - SECRET_PANEL_WIDTH - GUTTER_RIGHT;
const SECRET_PANEL_Y = GUTTER_TOP;
const SECRET_PANEL_LIP = 10;
const SECRET_PANEL_BORDER = 6;
const SECRET_PANEL_HALF_BORDER = SECRET_PANEL_BORDER / 2;

// We are only using stroke to get a rounding effect
const MAIN_PANEL_STROKE = 6;
const MAIN_PANEL_X = GUTTER_LEFT;
const MAIN_PANEL_Y = SECRET_PANEL_Y + SECRET_PANEL_HEIGHT + 10; // TODO: hard-coded value
const MAIN_PANEL_WIDTH = BOARD_WIDTH - GUTTER_LEFT - GUTTER_RIGHT;
const MAIN_PANEL_HEIGHT = BOARD_HEIGHT - MAIN_PANEL_Y - GUTTER_BOTTOM;

const SMALL_CUTOUT_X = MAIN_PANEL_X;
const SMALL_CUTOUT_WIDTH = 50;
const SMALL_CUTOUT_HALF_HEIGHT = 20;

const LARGE_HOLE_CUTOUT_RADIUS = 21;

const LARGE_PEG_RADIUS = 12;
const SMALL_PEG_RADIUS = 5;

const SMALL_PEG_HOLE_RADIUS = 4;
const SMALL_PEG_HOLE_STROKE = 1;

const LARGE_PEG_HOLE_RADIUS = 10;
const LARGE_PEG_HOLE_STROKE = 4;
const SECRET_ROW_CENTRE_Y = SECRET_PANEL_Y + SECRET_PANEL_HEIGHT / 2;
const FIRST_ROW_CENTRE_Y = 87;
const ROW_GAP_Y = 43;
const FIRST_LARGE_PEG_X = SECRET_PANEL_X + 2 * LARGE_PEG_RADIUS;
const LARGE_PEG_GAP_X = 50;
const SMALL_PEG_GAP_Y = 7;
const SMALL_PEG_LEFT_X = MAIN_PANEL_X + 12; // TODO: hard-coded value
const SMALL_PEG_RIGHT_X = SMALL_PEG_LEFT_X + 26; // TODO: hard-coded value

const COLOUR_MENU_BORDER = 3;
const COLOUR_MENU_HALF_BORDER = COLOUR_MENU_BORDER / 2;

const COLOUR_MENU_OUTER_X = GUTTER_LEFT;
const COLOUR_MENU_OUTER_Y = SECRET_PANEL_Y;
const COLOUR_MENU_OUTER_WIDTH = MAIN_PANEL_WIDTH;
const COLOUR_MENU_OUTER_HEIGHT = SECRET_PANEL_HEIGHT;

const COLOUR_MENU_INNER_X = COLOUR_MENU_OUTER_X + COLOUR_MENU_BORDER;
const COLOUR_MENU_INNER_Y = COLOUR_MENU_OUTER_Y + COLOUR_MENU_BORDER;
const COLOUR_MENU_INNER_WIDTH = COLOUR_MENU_OUTER_WIDTH - 2 * COLOUR_MENU_BORDER;
const COLOUR_MENU_INNER_HEIGHT = COLOUR_MENU_OUTER_HEIGHT - 2 * COLOUR_MENU_BORDER;

const POINTER_WIDTH = 20;
const POINTER_HALF_WIDTH = POINTER_WIDTH / 2;
const POINTER_HEIGHT = 14;
const POINTER_TIP_X = FIRST_LARGE_PEG_X;
const POINTER_TIP_Y = COLOUR_MENU_OUTER_Y + COLOUR_MENU_OUTER_HEIGHT + COLOUR_MENU_HALF_BORDER + POINTER_HEIGHT;

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
board.setAttribute("width", BOARD_WIDTH);
board.setAttribute("height", BOARD_HEIGHT);
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

  const pathData = `
    M${SECRET_PANEL_X + SECRET_PANEL_LIP},${SECRET_PANEL_Y}
    h${-SECRET_PANEL_LIP}
    v${SECRET_PANEL_HEIGHT}
    h${SECRET_PANEL_WIDTH}
    v${-SECRET_PANEL_HEIGHT}
    h${-SECRET_PANEL_LIP}
  `;

  const path = createSVGElement("path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke-width", SECRET_PANEL_BORDER);
  path.setAttribute("class", "secret-panel");
  board.appendChild(path);
  range(4).forEach(addSecretPanelLargePegHole);
};

const addSecretPanelLargePegHole = n =>
  addLargePegHole(-1, n, SECRET_ROW_CENTRE_Y);

const showSecretPanelCover = () => {

  const x = SECRET_PANEL_X + SECRET_PANEL_HALF_BORDER;
  const y = SECRET_PANEL_Y + SECRET_PANEL_HALF_BORDER;
  const w = SECRET_PANEL_WIDTH - SECRET_PANEL_BORDER;
  const h = SECRET_PANEL_HEIGHT - SECRET_PANEL_BORDER;
  const MARGIN = SECRET_PANEL_BORDER * 3;

  const pathData = `M${x},${y} v${h} h${w} v${-h} z`;

  const group = createSVGElement("g");
  group.setAttribute("data-piece", "secret-panel-cover");

  const path = createSVGElement("path");
  path.setAttribute("d", pathData);
  path.setAttribute("class", "secret-panel-cover");
  group.appendChild(path);

  const text1 = createSVGElement("text");
  text1.setAttribute("x", x + MARGIN);
  text1.setAttribute("y", y + h / 2);
  text1.setAttribute("class", "secret-panel-cover-text-1");
  text1.appendChild(document.createTextNode("MASTER"));
  group.appendChild(text1);

  const text2 = createSVGElement("text");
  text2.setAttribute("x", x + w - MARGIN);
  text2.setAttribute("y", y + h - SECRET_PANEL_HALF_BORDER);
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
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", SMALL_PEG_HOLE_RADIUS);
  circle.setAttribute("stroke-width", SMALL_PEG_HOLE_STROKE);
  circle.setAttribute("class", "small-peg-hole");
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
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", LARGE_PEG_HOLE_RADIUS);
  circle.setAttribute("stroke-width", LARGE_PEG_HOLE_STROKE);
  circle.setAttribute("class", "large-peg-hole");
  circle.addEventListener("click", makeLargePegClickHandler(inverseRowNumber, n));
  board.appendChild(circle);
};

const buildPathDataForSmallHolesCutOut = row => {
  const cy = FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y);
  const y = cy - SMALL_CUTOUT_HALF_HEIGHT;
  const d = `
    M${SMALL_CUTOUT_X},${y}
    h${SMALL_CUTOUT_WIDTH}
    v${(2 * SMALL_CUTOUT_HALF_HEIGHT)}
    h${-SMALL_CUTOUT_WIDTH}
    z
  `;
  return d;
};

const buildPathDataForLargeHolesCutOut = row => {

  const r = LARGE_HOLE_CUTOUT_RADIUS;
  const theta = 0.6805212246672144; // about 39 degrees
  const dx = r * Math.cos(theta);
  const dy = r * Math.sin(theta);

  const cy = FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y);
  const arcWidth = 2 * dx;
  const arcHeight = 2 * dy;
  const interArcGap = LARGE_PEG_GAP_X - 2 * dx;

  return `
    M${FIRST_LARGE_PEG_X + dx},${cy + dy}
    a ${r} ${r} 0 1 1 0,${-arcHeight}
    h${interArcGap}
    a ${r} ${r} 1 0 1 ${arcWidth},0
    h${interArcGap}
    a ${r} ${r} 1 0 1 ${arcWidth},0
    h${interArcGap}
    a ${r} ${r} 1 1 1 0,${arcHeight}
    h${-interArcGap}
    a ${r} ${r} 1 0 1 ${-arcWidth},0
    h${-interArcGap}
    a ${r} ${r} 1 0 1 ${-arcWidth},0
    z
  `;
};

const addMainPanel = () => {
  const pathDataForMainPanelOutline = `
    M${MAIN_PANEL_X},${MAIN_PANEL_Y}
    h${MAIN_PANEL_WIDTH}
    v${MAIN_PANEL_HEIGHT}
    h${-MAIN_PANEL_WIDTH}
    z
  `;
  const pathDataForSmallHoleCutOuts = range(10).map(buildPathDataForSmallHolesCutOut);
  const pathDataForLargeHoleCutOuts = range(10).map(buildPathDataForLargeHolesCutOut);
  const pathData = [
    pathDataForMainPanelOutline,
    ...pathDataForSmallHoleCutOuts,
    ...pathDataForLargeHoleCutOuts
  ].join(" ");
  const path = createSVGElement("path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke-width", MAIN_PANEL_STROKE);
  path.setAttribute("class", "main-panel");
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
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", SMALL_PEG_RADIUS);
  circle.setAttribute("fill", colour);
  circle.setAttribute("class", "small-peg");
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
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", LARGE_PEG_RADIUS);
  circle.setAttribute("fill", colour);
  circle.setAttribute("class", "large-peg");
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
  console.log(`secret: ${state.secret.map(p => p.toString())}`);
};

const onEnter = () => {
  if (state.showingColourMenuFor >= 0) {
    hideColourMenu();
  }
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
    if (state.gameState === S.WON) {
      showGameWonModal();
    }
    if (state.gameState === S.LOST) {
      showGameLostModal();
    }
    hideSecretPanelCover();
    showSecret(state.secret);
    hideEnterButton();
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
  outerRect.setAttribute("x", COLOUR_MENU_OUTER_X);
  outerRect.setAttribute("y", COLOUR_MENU_OUTER_Y);
  outerRect.setAttribute("rx", 5);
  outerRect.setAttribute("ry", 5);
  outerRect.setAttribute("width", COLOUR_MENU_OUTER_WIDTH);
  outerRect.setAttribute("height", COLOUR_MENU_OUTER_HEIGHT);
  outerRect.setAttribute("stroke-width", COLOUR_MENU_BORDER);
  outerRect.setAttribute("class", "colour-menu");

  const innerRect = createSVGElement("rect");
  innerRect.setAttribute("x", COLOUR_MENU_INNER_X);
  innerRect.setAttribute("y", COLOUR_MENU_INNER_Y);
  innerRect.setAttribute("rx", 5);
  innerRect.setAttribute("ry", 5);
  innerRect.setAttribute("width", COLOUR_MENU_INNER_WIDTH);
  innerRect.setAttribute("height", COLOUR_MENU_INNER_HEIGHT);
  innerRect.setAttribute("class", "colour-menu-inner");

  const colourMenu = createSVGElement("g");
  colourMenu.appendChild(outerRect);
  colourMenu.appendChild(innerRect);

  const gap = COLOUR_MENU_INNER_WIDTH / COLOURS.length;
  const halfGap = gap / 2;
  COLOURS.forEach((colour, index) => {
    const cx = COLOUR_MENU_INNER_X + halfGap + gap * index;
    const cy = COLOUR_MENU_INNER_Y + COLOUR_MENU_INNER_HEIGHT / 2;
    const colourSwatch = createSVGElement("circle");
    colourSwatch.setAttribute("cx", cx);
    colourSwatch.setAttribute("cy", cy);
    colourSwatch.setAttribute("r", LARGE_PEG_RADIUS);
    colourSwatch.setAttribute("fill", colour);
    colourSwatch.setAttribute("class", "large-peg");
    colourSwatch.addEventListener("click", makeColourSwatchClickHandler(colour));
    colourMenu.appendChild(colourSwatch);
  });

  const pathData = `
    M${POINTER_TIP_X},${POINTER_TIP_Y}
    l${-POINTER_HALF_WIDTH},${-POINTER_HEIGHT}
    h${POINTER_WIDTH}
    z
  `;
  const pointer = createSVGElement("path");
  pointer.setAttribute("d", pathData);
  pointer.setAttribute("class", "colour-menu-pointer");

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

const showGameWonModal = () =>
  showModal("You Won!", "Congratulations!", "#trophy", 448.35);

// scale = 0.14486150377967807
// width="579.8642" => 84
// height="189.18237" => 27.405242606803455
const showGameLostModal = () =>
  showModal("You Lost!", "Commiserations", "#spoon", 579.8642);

const MODAL_OUTER_BORDER = 6;
const MODAL_OUTER_X = BOARD_WIDTH / 4;
const MODAL_OUTER_Y = BOARD_HEIGHT / 4;
const MODAL_OUTER_WIDTH = BOARD_WIDTH / 2;
const MODAL_OUTER_HEIGHT = BOARD_HEIGHT / 2;

const MODAL_INNER_X = MODAL_OUTER_X + MODAL_OUTER_BORDER;
const MODAL_INNER_Y = MODAL_OUTER_Y + MODAL_OUTER_BORDER;
const MODAL_INNER_WIDTH = MODAL_OUTER_WIDTH - 2 * MODAL_OUTER_BORDER;
const MODAL_INNER_HEIGHT = MODAL_OUTER_HEIGHT - 2 * MODAL_OUTER_BORDER;

const showModal = (message1, message2, graphicId, size) => {

  const outerRect = createSVGElement("rect");
  outerRect.setAttribute("x", MODAL_OUTER_X);
  outerRect.setAttribute("y", MODAL_OUTER_Y);
  outerRect.setAttribute("rx", 5);
  outerRect.setAttribute("ry", 5);
  outerRect.setAttribute("width", MODAL_OUTER_WIDTH);
  outerRect.setAttribute("height", MODAL_OUTER_HEIGHT);
  outerRect.setAttribute("stroke-width", MODAL_OUTER_BORDER);
  outerRect.setAttribute("class", "modal-outer");

  const innerRect = createSVGElement("rect");
  innerRect.setAttribute("x", MODAL_INNER_X);
  innerRect.setAttribute("y", MODAL_INNER_Y);
  innerRect.setAttribute("rx", 5);
  innerRect.setAttribute("ry", 5);
  innerRect.setAttribute("width", MODAL_INNER_WIDTH);
  innerRect.setAttribute("height", MODAL_INNER_HEIGHT);
  innerRect.setAttribute("class", "modal-inner");

  const text1 = createSVGElement("text");
  text1.setAttribute("x", BOARD_WIDTH / 2);
  text1.setAttribute("y", MODAL_INNER_Y + 30);
  text1.setAttribute("class", "modal-text-1");
  text1.appendChild(document.createTextNode(message1));

  const text2 = createSVGElement("text");
  text2.setAttribute("x", BOARD_WIDTH / 2);
  text2.setAttribute("y", MODAL_INNER_Y + MODAL_INNER_HEIGHT - 30);
  text2.setAttribute("class", "modal-text-2");
  text2.appendChild(document.createTextNode(message2));

  const scale = MODAL_INNER_WIDTH / 2 / size;
  const graphicX = MODAL_INNER_X + MODAL_INNER_WIDTH / 4;
  const graphicY = MODAL_INNER_Y + MODAL_INNER_HEIGHT / 3;
  const graphic = createSVGElement("use");
  graphic.setAttributeNS("http://www.w3.org/1999/xlink", "href", graphicId);
  graphic.setAttribute("transform", `translate(${graphicX}, ${graphicY}) scale(${scale}, ${scale})`);

  const cx = MODAL_OUTER_X + MODAL_OUTER_WIDTH - COLOUR_MENU_BORDER / 2;
  const cy = MODAL_OUTER_Y + COLOUR_MENU_BORDER / 2;
  const closeButton = createSVGElement("g");
  const circle = createSVGElement("circle");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", 12);
  circle.setAttribute("class", "modal-close-button-circle");
  const cross = createSVGElement("path");
  cross.setAttribute("d", `M${cx - 5},${cy - 5} l10,10 M${cx + 5},${cy - 5} l-10,10`);
  cross.setAttribute("class", "modal-close-button-cross");
  closeButton.appendChild(circle);
  closeButton.appendChild(cross);
  closeButton.addEventListener("click", () => {
    board.removeChild(modal);
    showNewGameButton();
  });

  const modal = createSVGElement("g");
  modal.appendChild(outerRect);
  modal.appendChild(innerRect);
  modal.appendChild(text1);
  modal.appendChild(graphic);
  modal.appendChild(text2);
  modal.appendChild(closeButton);
  board.appendChild(modal);
};

btnNewGame.addEventListener("click", onNewGame);
btnEnter.addEventListener("click", onEnter);

hideEnterButton();
addSecretPanel();
addRows();
addMainPanel();
