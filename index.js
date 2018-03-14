const SMALL_PEG_HOLE_RADIUS = 8;
const LARGE_PEG_HOLE_RADIUS = 12;
const FIRST_ROW_CENTRE_Y = 148;
const ROW_GAP_Y = 60;
const FIRST_LARGE_PEG_X = 155;
const LARGE_PEG_GAP_X = 62;

const board = document.getElementById("board");

const createSVGElement = elementName =>
  document.createElementNS('http://www.w3.org/2000/svg', elementName);

const range = n => Array.from(Array(n).keys());

const addSecretPanel = () => {
  const path = createSVGElement("path");
  path.setAttribute("class", "secret-panel");
  path.setAttribute("d", "M134 20 L124 20 L124 80 L372 80 L372 20 L362 20");
  board.appendChild(path);
  range(4).forEach(addSecretPanelLargePegHole);
};

const addSecretPanelLargePegHole = n =>
  addLargePegHole(48, n);

const addRows = () =>
  range(10).forEach(addRow);

const addRow = row => {
  addRowSmallPegHoles(row);
  addRowLargePegHoles(row);
};

const addRowSmallPegHoles = row => {
  range(4).forEach(n => addRowSmallPegHole(row, n));
};

const addRowSmallPegHole = (row, n) => {
  const cx = n % 2 ? 93 : 53;
  const cy = FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y) + (n >= 2 ? 12 : -12);
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
  const cy = FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y);
  const y1 = cy - 20;
  const y2 = cy + 20;
  const d1 = `M175 ${y2} A 27 27 0 1 1 175 ${y1}`;
  const d2 = `L195 ${y1} A 27 27 1 0 1 237 ${y1}`;
  const d3 = `L257 ${y1} A 27 27 1 0 1 298 ${y1}`;
  const d4 = `L320 ${y1} A 27 27 1 1 1 320 ${y2}`;
  const d5 = `L298 ${y2} A 27 27 1 0 1 257 ${y2}`;
  const d6 = `L237 ${y2} A 27 27 1 0 1 195 ${y2} Z`;
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

addSecretPanel();
addRows();
addMainPanel();
