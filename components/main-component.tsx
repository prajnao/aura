"use client";

import { useContext, useEffect, useState } from "react";
import UploadedImage from "./uploaded-image";
import Palette from "./palette";
import { CONSTELLATION, MARGIN } from "@/libs/geometry";
import { UploadContext } from "@/context/useUploadData";

/** Shrinks the whole composition on short viewports, keeping proportions. */
function useFitScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const available =
        Math.min(window.innerWidth, window.innerHeight) - MARGIN * 2;
      setScale(Math.min(1, available / CONSTELLATION));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export default function MainComponent() {
  const scale = useFitScale();
  const [activeColor, setActiveColor] = useState(0);
  const { upload } = useContext(UploadContext);

  useEffect(() => setActiveColor(0), [upload]);

  return (
    <div className="grid h-screen -mt-16 w-screen place-items-center overflow-hidden">
      <div
        key={upload}
        className="relative grid place-items-center"
        style={{ transform: `scale(${scale})` }}
      >
        <UploadedImage />
        <Palette activeColor={activeColor} onSelect={setActiveColor} />
      </div>
    </div>
  );
}
