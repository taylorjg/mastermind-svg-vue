const board = document.getElementById("board");

const createSVGElement = elementName =>
  document.createElementNS('http://www.w3.org/2000/svg', elementName);

const SMALL_PEG_HOLE_RADIUS = 8;
const LARGE_PEG_HOLE_RADIUS = 12;
const FIRST_ROW_CENTRE_Y = 148;
const ROW_GAP_Y = 60;
const FIRST_LARGE_PEG_X = 155;
const LARGE_PEG_GAP_X = 62;

const range = n => Array.from(Array(n).keys());

const addSecretPanel = () => {
  const path = createSVGElement("path");
  path.setAttribute("class", "secret-panel");
  path.setAttribute("d", "M134 20 L124 20 L124 80 L372 80 L372 20 L362 20");
  board.appendChild(path);
  range(4).forEach(addSecretPanelLargePegHole);
};

const addSecretPanelLargePegHole = n => {
  const cx = FIRST_LARGE_PEG_X + (n * LARGE_PEG_GAP_X);
  const cy = 48;
  addLargePegHole(cx, cy);
};

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
  
  // <circle class="small-peg-hole" cx="93" cy="136" r="8"></circle>
  // <circle class="small-peg-hole" cx="53" cy="136" r="8"></circle>
  // <circle class="small-peg-hole" cx="93" cy="160" r="8"></circle>
  // <circle class="small-peg-hole" cx="53" cy="160" r="8"></circle>

  // <circle class="small-peg-hole" cx="93" cy="196" r="8"></circle>
  // <circle class="small-peg-hole" cx="53" cy="196" r="8"></circle>
  // <circle class="small-peg-hole" cx="93" cy="220" r="8"></circle>
  // <circle class="small-peg-hole" cx="53" cy="220" r="8"></circle>
};

const addRowLargePegHoles = row => {
  range(4).forEach(n => addRowLargePegHole(row, n));
};

const addRowLargePegHole = (row, n) => {
  const cx = FIRST_LARGE_PEG_X + (n * LARGE_PEG_GAP_X);
  const cy = FIRST_ROW_CENTRE_Y + (row * ROW_GAP_Y);
  addLargePegHole(cx, cy);
};

const addLargePegHole = (cx, cy) => {
  const circle = createSVGElement("circle");
  circle.setAttribute("class", "large-peg-hole");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", LARGE_PEG_HOLE_RADIUS);
  board.appendChild(circle);
};

const addMainPanel = () => {
  // const pathData1 = "M30 100 L374 100 L374 720 L30 720 Z";
  // const pathData2 = "M40 122 L107 122 L107 174 L40 174 Z";
  // const pathData = [
  //   pathData1,
  //   pathData2
  // ].join(" ");

  // const path = createSVGElement("path");
  // path.setAttribute("class", "main-panel");
  // path.setAttribute("d", pathData);
  // board.appendChild(path);
};

addSecretPanel();
addRows();
addMainPanel();
