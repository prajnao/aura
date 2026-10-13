"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import {
  direction, dropdownGeometry, polar,
  DROPDOWN_PAD, DROPDOWN_ITEM_HEIGHT,
  LEAD_IN, STAGGER, SWATCH, SWATCH_IN,
} from "@/libs/geometry";
import { insetClip, lerpBox } from "@/libs/shape";
import { getRequiredFormatValue } from "@/libs/getRequiredFormatValue";

const FORMATS = ["HEX", "RGB", "HSL"] as const;
const SPRING = { type: "spring", visualDuration: 0.35, bounce: 0.25 } as const;
const COPIED_HOLD = 1200;

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // fallback for non-secure contexts (e.g. testing over a LAN IP)
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  if (!ok) throw new Error("copy failed");
}

type Props = { color: number[]; index: number; total: number };

export default function Swatch({ color, index, total }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>();
  const rootRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const rgb = `rgb(${color.join(",")})`;
  const { x, y } = polar(index, total);
  const geo = dropdownGeometry(direction(index, total), FORMATS.length);

  const progress = useMotionValue(0);

useMotionValueEvent(progress, "change", (t) => {
    const box = lerpBox(geo.ring, geo.open, t);
    const clip = insetClip(box, geo.layer.width, geo.layer.height);
    if (blobRef.current) blobRef.current.style.clipPath = clip;
    if (menuRef.current) menuRef.current.style.clipPath = clip;
  });

  useEffect(() => {
    const controls = animate(progress, open ? 1 : 0, SPRING);
    return () => controls.stop();
  }, [open, progress]);

  useEffect(() => {
    if (open) return;
    clearTimeout(copiedTimer.current);
    setCopied(null);
  }, [open]);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const onCopy = async (format: string) => {
    try {
      await copyText(getRequiredFormatValue(format, color));
    } catch {
      return;
    }
    setCopied(format);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(null), COPIED_HOLD);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
    className="absolute top-1/2 left-1/2 text-white dark:text-[#272727]"
      style={{
        width: geo.layer.width,
        height: geo.layer.height,
        marginLeft: -SWATCH / 2 + geo.layer.left,
        marginTop: -SWATCH / 2 + geo.layer.top,
        transform: `translate(${x}px, ${y}px)`,
        transformOrigin: `${geo.swatch.x + SWATCH / 2}px ${geo.swatch.y + SWATCH / 2}px`,
        zIndex: open ? 10 : 1,
        ["--x" as string]: `${x}px`,
        ["--y" as string]: `${y}px`,
        animationName: "swatch-pop",
        animationDuration: `${SWATCH_IN}ms`,
        animationTimingFunction: "cubic-bezier(.4, 1.61, .6, 1)",
        animationDelay: `${LEAD_IN + index * STAGGER}ms`,
        animationFillMode: "backwards",
      }}
    >
      {/* ---- goo layer: everything white ---- */}
<div
  className="pointer-events-none absolute inset-0"
  style={{ filter: "url(#goo)" }}
>
  <div
    className="absolute bg-current"
    style={{
      left: geo.ring.x, top: geo.ring.y,
      width: geo.ring.w, height: geo.ring.h,
      borderRadius: geo.ring.r,
    }}
  />
  <div
    ref={blobRef}
    className="absolute inset-0 bg-current"
    style={{ clipPath: insetClip(geo.ring, geo.layer.width, geo.layer.height) }}
  />
</div>

{/* crisp ring — drawn on top, never filtered, so its corners stay exact */}
<div
  className="pointer-events-none absolute"
  style={{
    left: geo.ring.x, top: geo.ring.y,
    width: geo.ring.w, height: geo.ring.h,
    borderRadius: geo.ring.r,
    background: "currentColor",
    boxShadow: "0 6px 14px rgb(0 0 0 / 0.18)",
    // @ts-expect-error non-standard
    cornerShape: "squircle",
  }}
/>

      {/* ---- crisp layer ---- */}
      <button
        type="button"
        aria-label={rgb}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="absolute rounded-3xl"
        style={{
          left: geo.swatch.x, top: geo.swatch.y,
          width: SWATCH, height: SWATCH,
          background: rgb,
          // @ts-expect-error non-standard
          cornerShape: "squircle",
        }}
      />

<div
  ref={menuRef}
  role="menu"
  className="absolute inset-0"
  style={{
    clipPath: insetClip(geo.ring, geo.layer.width, geo.layer.height),
    opacity: open ? 1 : 0,
    filter: open ? "blur(0px)" : "blur(8px)",
    transition: open ? "none" : "opacity 180ms ease-in, filter 180ms ease-in",
    pointerEvents: open ? "auto" : "none",
  }}
>
  <div
    className="absolute"
    style={{
      left: geo.open.x,
      top: geo.open.y,
      width: geo.open.w,
      height: geo.open.h,
      padding: DROPDOWN_PAD,
    }}
  >
    {FORMATS.map((format) => (
      <button
        key={format}
        role="menuitem"
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label={`Copy ${format} value`}
        onClick={() => onCopy(format)}
        style={{ height: DROPDOWN_ITEM_HEIGHT }}
        className="flex w-full items-center justify-between rounded-xl px-3 text-[13px] whitespace-nowrap text-neutral-600 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <span className="font-medium">{format}</span>
        <span className="font-mono text-neutral-400">
          {copied === format ? "Copied!" : getRequiredFormatValue(format, color)}
        </span>
      </button>
    ))}
  </div>
</div>
    </div>
  );
}