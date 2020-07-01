// Galaxy S5: 360 x 640 (according to Chrome dev tools)
const DEFAULT_WIDTH = 360
const DEFAULT_HEIGHT = 640

export const GUTTER_Y = 10
export const BORDER = 6
export const HALF_BORDER = BORDER / 2

export let boardWidth
export let boardHeight

export let secretPanelX
export let secretPanelY
export let secretPanelWidth
export let secretPanelHeight
export let secretPanelPaddingY

export let mainPanelX
export let mainPanelY
export let mainPanelWidth
export let mainPanelHeight

export let secretRowCentreY
export let firstRowCentreY

export let largePegHoleRadius
export let largePegHoleStroke
export let largePegHoleOuterRadius

export let smallPegHoleRadius
export let smallPegHoleStroke

export let largePegRadius
export let smallPegRadius

export let smallCutoutX
export let smallCutoutWidth
export let smallCutoutHeight
export let largeCutoutWidth

export let spareWidth
export let gutterX
export let rowGapY
export let firstLargePegX
export let largePegGapX
export let smallPegGapY
export let smallPegLeftX
export let smallPegRightX

export const recalculateDimensions = () => {

  const clientWidth = document.body.clientWidth
  const clientHeight = document.body.clientHeight

  // Bootstrap 4
  // > Extra small devices (portrait phones, less than 576px)
  const isExtraSmallDevice = clientWidth < 576

  boardWidth = isExtraSmallDevice ? clientWidth : DEFAULT_WIDTH
  boardHeight = isExtraSmallDevice ? clientHeight : DEFAULT_HEIGHT

  const board = document.getElementById('board')
  board.setAttribute('width', boardWidth)
  board.setAttribute('height', boardHeight)

  rowGapY = boardHeight / 12
  largePegGapX = boardHeight / 12.5

  mainPanelHeight = 10 * rowGapY
  mainPanelY = boardHeight - mainPanelHeight - GUTTER_Y
  secretPanelY = GUTTER_Y
  secretPanelHeight = boardHeight - mainPanelHeight - 3 * GUTTER_Y
  secretRowCentreY = secretPanelY + secretPanelHeight / 2
  firstRowCentreY = mainPanelY + 9.5 * rowGapY

  largePegHoleOuterRadius = boardHeight / 26
  largePegHoleRadius = boardHeight / 51.2
  largePegHoleStroke = largePegHoleRadius / 4
  largePegRadius = largePegHoleRadius + largePegHoleStroke / 2

  smallCutoutWidth = 2.5 * largePegHoleOuterRadius
  smallCutoutHeight = 2 * largePegHoleOuterRadius

  smallPegHoleRadius = boardHeight / 128
  smallPegHoleStroke = smallPegHoleRadius / 4
  smallPegRadius = smallPegHoleRadius + smallPegHoleStroke / 2

  largeCutoutWidth = 3 * largePegGapX + largePegHoleOuterRadius
  spareWidth = boardWidth - smallCutoutWidth - largeCutoutWidth

  gutterX = spareWidth / 5
  firstLargePegX = boardWidth - gutterX - largeCutoutWidth
  mainPanelX = gutterX
  mainPanelWidth = boardWidth - 2 * gutterX
  smallCutoutX = mainPanelX

  smallPegGapY = smallCutoutHeight / 5
  smallPegLeftX = mainPanelX + smallCutoutWidth / 4
  smallPegRightX = mainPanelX + 3 * smallCutoutWidth / 4

  secretPanelPaddingY = boardWidth - gutterX - (firstLargePegX + 3 * largePegGapX)
  secretPanelWidth = 3 * largePegGapX + 2 * secretPanelPaddingY
  secretPanelX = firstLargePegX - secretPanelPaddingY + HALF_BORDER / 2
}
