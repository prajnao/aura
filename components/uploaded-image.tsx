"use client";

import { UploadContext } from "@/context/useUploadData";
import { useContext } from "react";
import { FRAME, IMAGE_IN, MAX_H, MAX_W } from "@/libs/geometry";

export default function UploadedImage() {
  const { upload } = useContext(UploadContext);

  return (
    <div
    style={{
      padding: FRAME,
      // @ts-expect-error - eslint issue
      cornerShape:"squircle",
      animation: `frame-in ${IMAGE_IN}ms cubic-bezier(0.22, 1, 0.36, 1) backwards`,
    }}
    className="frame-animate h-fit w-fit rounded-3xl bg-white shadow-xl dark:bg-[#272727] dark:shadow-2xl"
  >
      <img
        src={upload!}
        alt="uploaded"
        // @ts-expect-error - eslint issue
        style={{ maxWidth: MAX_W, maxHeight: MAX_H ,cornerShape:"squircle"}}
        className="block h-auto w-auto rounded-3xl"
      />
    </div>
  );
}