export const C = {
  R: '#FF0000',
  G: '#00FF00',
  B: '#0000FF',
  Y: '#FFFF00',
  BL: '#000000',
  WH: '#FFFFFF'
}

export const COLOURS = Object.values(C)

export const P = {
  R: 'R',
  G: 'G',
  B: 'B',
  Y: 'Y',
  BL: 'BL',
  WH: 'WH'
}

export const ALL_PEGS = Object.values(P)

export const PEG_TO_COLOUR = {
  [P.R]: C.R,
  [P.G]: C.G,
  [P.B]: C.B,
  [P.Y]: C.Y,
  [P.BL]: C.BL,
  [P.WH]: C.WH,
}

export const COLOUR_TO_PEG = {
  [C.R]: P.R,
  [C.G]: P.G,
  [C.B]: P.B,
  [C.Y]: P.Y,
  [C.BL]: P.BL,
  [C.WH]: P.WH,
}
