"use client";

import { useContext } from "react";
import { UploadContext } from "@/context/useUploadData";
import Swatch from "./swatch";

export default function Palette() {
  const { colorPalette } = useContext(UploadContext);
  if (!colorPalette?.length) return null;

  return (
    <>
    <svg className="absolute h-0 w-0" aria-hidden>
  <defs>
    <filter id="goo" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
        result="goo"
      />
    </filter>
  </defs>
</svg>

      {colorPalette.map((color, i) => (
        <Swatch
          key={`${color.join("-")}-${i}`}
          color={color}
          index={i}
          total={colorPalette.length}
        />
      ))}
    </>
  );
}


