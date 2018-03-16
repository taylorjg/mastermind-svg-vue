const R = "#FF0000";
const G = "#00FF00";
const B = "#0000FF";
const Y = "#FFFF00";
const BL = "#000000";
const WH = "#FFFFFF";
const LARGE_PEG_RADIUS = 15;
const SMALL_PEG_RADIUS = 7;
const SMALL_PEG_HOLE_RADIUS = 6;
const LARGE_PEG_HOLE_RADIUS = 12;
const FIRST_ROW_CENTRE_Y = 140;
const ROW_GAP_Y = 60;
const FIRST_LARGE_PEG_X = 155;
const LARGE_PEG_GAP_X = 62;
const SMALL_PEG_GAP_Y = 10;
const SMALL_PEG_LEFT_X = 60;
const SMALL_PEG_RIGHT_X = 86;

const board = document.getElementById("board");

const createSVGElement = elementName =>
  document.createElementNS('http://www.w3.org/2000/svg', elementName);

const range = n => Array.from(Array(n).keys());

const addSecretPanel = () => {
  const path = createSVGElement("path");
  path.setAttribute("class", "secret-panel");
  path.setAttribute("d", "M134 10 L124 10 L124 80 L372 80 L372 10 L362 10");
  board.appendChild(path);
  range(4).forEach(addSecretPanelLargePegHole);
};

const addSecretPanelLargePegHole = n =>
  addLargePegHole(38, n);

const addSecretPanelCover = () => {
  const path = createSVGElement("path");
  path.setAttribute("class", "secret-panel-cover");
  path.setAttribute("d", "M127 13 L127 77 L369 77 L369 13 Z");
  board.appendChild(path);

  const text1 = createSVGElement("text");
  text1.setAttribute("x", 127 + 20);
  text1.setAttribute("y", 46);
  text1.setAttribute("class", "secret-panel-cover-text-1");
  text1.appendChild(document.createTextNode("MASTER"));
  board.appendChild(text1);

  const text2 = createSVGElement("text");
  text2.setAttribute("x", 369 - 20);
  text2.setAttribute("y", 74);
  text2.setAttribute("class", "secret-panel-cover-text-2");
  text2.appendChild(document.createTextNode("MIND"));
  board.appendChild(text2);
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
  addLargePegHole(cy, n);
};

const addLargePegHole = (cy, n) => {
  const cx = FIRST_LARGE_PEG_X + (n * LARGE_PEG_GAP_X);
  const circle = createSVGElement("circle");
  circle.setAttribute("class", "large-peg-hole");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", LARGE_PEG_HOLE_RADIUS);
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
  const cy = FIRST_ROW_CENTRE_Y + (inverseRowNumber * ROW_GAP_Y) + SMALL_PEG_GAP_Y * (n >= 2 ? +1 : -1);
  const circle = createSVGElement("circle");
  circle.setAttribute("class", "small-peg");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", SMALL_PEG_RADIUS);
  circle.setAttribute("fill", colour);
  board.appendChild(circle);
};

const addLargePeg = (row, n, colour) => {
  const row2 = 9 - row;
  const cy = FIRST_ROW_CENTRE_Y + (row2 * ROW_GAP_Y);
  const cx = FIRST_LARGE_PEG_X + (n * LARGE_PEG_GAP_X);
  const circle = createSVGElement("circle");
  circle.setAttribute("class", "large-peg");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", LARGE_PEG_RADIUS);
  circle.setAttribute("fill", colour);
  board.appendChild(circle);
};

addSecretPanel();
addSecretPanelCover();
addRows();
addMainPanel();

addLargePeg(0, 0, R);
addLargePeg(0, 1, R);
addLargePeg(0, 2, Y);
addLargePeg(0, 3, WH);

addSmallPeg(0, 0, BL);
addSmallPeg(0, 1, WH);
