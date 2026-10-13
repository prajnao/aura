export type Box = { x: number; y: number; w: number; h: number; r: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Blend two boxes. t=0 is fully `a`, t=1 is fully `b`. */
export function lerpBox(a: Box, b: Box, t: number): Box {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    w: lerp(a.w, b.w, t),
    h: lerp(a.h, b.h, t),
    r: lerp(a.r, b.r, t),
  };
}

/** A rounded rect, expressed as distances in from each edge of its container. */
export function insetClip(box: Box, layerW: number, layerH: number) {
  const top = box.y;
  const right = layerW - (box.x + box.w);
  const bottom = layerH - (box.y + box.h);
  const left = box.x;
  const p = (n: number) => `${n.toFixed(2)}px`;
  return `inset(${p(top)} ${p(right)} ${p(bottom)} ${p(left)} round ${p(box.r)})`;
}