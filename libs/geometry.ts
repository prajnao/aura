// image, frame, color box, padding & gap 
export const MAX_W = 260;
export const MAX_H = 200;
export const FRAME = 5;
export const SWATCH = 70;
export const GAP = 30;
export const MARGIN = 32;
export const START_ANGLE = -90;

// animation values - all in ms
export const IMAGE_IN = 420;   // image frame settles first
export const SWATCH_IN = 600;  // individual color box flight time
export const STAGGER = 130;    // gap between each color box
export const LEAD_IN = 250;    // time for the first box to pop out (intentional delay added )

// ring is sized to the LARGEST the frame can ever be, so it never moves.
const HALF_DIAGONAL = Math.hypot(MAX_W + FRAME * 2, MAX_H + FRAME * 2) / 2;

export const RADIUS = HALF_DIAGONAL + GAP + SWATCH / 2;
export const CONSTELLATION = RADIUS * 2 + SWATCH;

export function polar(i: number, total: number, r = RADIUS) {
  const rad = ((START_ANGLE + (360 / total) * i) * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}


export type DIRECTION = "top-right" | "bottom-right" | "bottom-left" | "top-left";

const QUADRANTS:DIRECTION[]=[
  "top-right", // 0 - 90deg
  "bottom-right", // 90-180 
  "bottom-left", // 180-270deg
  "top-left"  // 270-360deg
]


export function direction(i:number, total:number){
    const degree=(360/total)*i // clockwise from 12o clock
    return QUADRANTS[Math.floor(degree/90)%4];
}


// gooey dropdown related values and constants 
export const DROPDOWN_WIDTH=220;
export const DROPDOWN_ITEM_HEIGHT=35;
export const DROPDOWN_PAD=6;
export const DROPDOWN_GAP=6;
export const SWATCH_RADIUS=24;
export const DROPDOWN_RADIUS=12;


export const RING = 4;

export function dropdownGeometry(dir: DIRECTION, itemCount: number) {
  const dropdownHeight = itemCount * DROPDOWN_ITEM_HEIGHT + DROPDOWN_PAD * 2;

  const opensRight = dir === "top-right" || dir === "bottom-right";
  const opensDown = dir === "bottom-left" || dir === "bottom-right";

  const dx = opensRight ? SWATCH-5 : - RING - DROPDOWN_WIDTH - DROPDOWN_GAP;
  const dy = opensDown ? SWATCH + DROPDOWN_GAP+ RING :-RING - DROPDOWN_GAP - dropdownHeight;

  // the ring is the swatch inflated by RING on every side
  const rx = -RING;
  const ry = -RING;
  const rw = SWATCH + RING * 2;
  const rh = SWATCH + RING * 2;

  const minX = Math.min(rx, dx);
  const minY = Math.min(ry, dy);
  const maxX = Math.max(rx + rw, dx + DROPDOWN_WIDTH);
  const maxY = Math.max(ry + rh, dy + dropdownHeight);

  return {
    layer: { width: maxX - minX, height: maxY - minY, left: minX, top: minY },
    // white ring — the morph's starting shape
    ring: { x: rx - minX, y: ry - minY, w: rw, h: rh, r: SWATCH_RADIUS + RING },
    // colored square — never morphs, just sits here
    swatch: { x: -minX, y: -minY, w: SWATCH, h: SWATCH, r: SWATCH_RADIUS },
    // the dropdown panel
    open: { x: dx - minX, y: dy - minY, w: DROPDOWN_WIDTH, h: dropdownHeight, r: DROPDOWN_RADIUS },
  };
}