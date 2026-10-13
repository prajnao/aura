"use client";

import React, { useContext, useEffect } from "react";
import { Caveat } from "next/font/google";
import { getImageUploadData } from "@/libs/upload";
import { UploadContext } from "@/context/useUploadData";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
});

type UploadImageProps = {
  onImageUpload?: () => void;
};

export default function UploadImage({ onImageUpload }: UploadImageProps) {
  const { upload, setUpload, colorPalette, setColorPalette } =
    useContext(UploadContext);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { uploadValue, colorPaletteList } = await getImageUploadData(file);
      setUpload(uploadValue);
      setColorPalette(colorPaletteList);
      if (onImageUpload) onImageUpload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    console.log(upload, "upload");
    console.log(colorPalette, "palette");
  }, [upload, colorPalette]);

  return (
    <div className="mt-60">
      <h4
        className={`${caveat.className} text-gray-400 dark:text-zinc-700 text-xl absolute top-52 left-[35%] -rotate-[20deg] w-34`}
      >
        drag and drop file
      </h4>
      <div
        // @ts-expect-error - eslint issue
        style={{ cornerShape: "squircle" }}
        className="bg-white dark:bg-[#1B1B1B] p-3 rounded-3xl  w-fit"
      >
        <div
          // @ts-expect-error - eslint issue
          style={{ cornerShape: "squircle" }}
          className="flex flex-col justify-center items-center w-60 h-20 p-4 border border-dashed border-gray-200 dark:border-zinc-700 rounded-2xl "
        >
          <input
            type="file"
            onChange={handleUpload}
            className="w-80 h-44 opacity-0 z-10 absolute cursor-pointer"
            name="file"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M11 3L6 3C4.3431 3 3 4.3431 3 6L3 18C3 19.6569 4.3431 21 6 21L18 21C19.6569 21 21 19.6569 21 18L21 13M3 18L7.9393 13.0607C8.5251 12.4749 9.4749 12.4749 10.0607 13.0607L12.0801 15.0801C12.6079 15.6079 13.4436 15.6673 14.0408 15.2194L15.9592 13.7806C16.5564 13.3327 17.3921 13.3921 17.9199 13.9199L21 17M18 3V9M15 6L18 9L21 6" />
            <path
              d="M9.5 7.5C9.5 8.3284 8.8284 9 8 9C7.1716 9 6.5 8.3284 6.5 7.5C6.5 6.6716 7.1716 6 8 6C8.8284 6 9.5 6.6716 9.5 7.5Z"
              fill="#9ca3af"
              stroke="none"
            />
          </svg>
          <p className={`text-gray-400 dark:text-zinc-700 text-xs mt-2`}>
            or click here to upload
          </p>
        </div>
      </div>
    </div>
  );
}
