"use client";

import MainComponent from "@/components/main-component";
import UploadImage from "@/components/upload-image";
import { UploadContext } from "@/context/useUploadData";
import { useContext, useState } from "react";

export default function Home() {
  const { upload } = useContext(UploadContext);
  const [version, setVersion] = useState(2);
  return (
    <main className="h-screen flex flex-col p-4">
      {/* version switch  */}
      <nav className="flex items-center justify-between">
        <select className="bg-white dark:bg-[#272727] rounded-lg text-sm px-2 py-1">
          <option
            value="1"
            selected={version === 1}
            onClick={() => setVersion(1)}
          >
            v1
          </option>
          <option
            value="2"
            selected={version === 2}
            onClick={() => setVersion(2)}
          >
            v2
          </option>
        </select>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/prajnao/aura"
            target="_blank"
            rel="noreferrer"
            aria-label="NPM package"
            className="mb-0.5 inline-flex h-6 w-6 cursor-pointer text-gray-400 dark:text-zinc-700 bg-white cursor-pointer dark:bg-[#272727] rounded-[5px] items-center justify-center text-muted transition-colors hover:text-strong"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.92c.85 0 1.7.12 2.5.36 1.9-1.33 2.74-1.05 2.74-1.05.55 1.43.2 2.49.1 2.75.64.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.93 0 1.4-.01 2.53-.01 2.88 0 .28.18.6.69.5A10.2 10.2 0 0 0 22 12.23C22 6.58 17.52 2 12 2z" />
            </svg>
          </a>

          <a
            href="https://x.com/prjnap"
            target="_blank"
            rel="noreferrer"
            aria-label="NPM package"
            className="mb-0.5 inline-flex h-6 w-6 cursor-pointer text-gray-400 dark:text-zinc-700 bg-white cursor-pointer dark:bg-[#272727] rounded-[5px] items-center justify-center text-muted transition-colors hover:text-strong"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              color="currentColor"
              fill="none"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"></path>
            </svg>
          </a>
        </div>
      </nav>

      <div className="flex flex-col mt-2 justify-center items-center">
        {upload ? <MainComponent /> : <UploadImage />}
      </div>
    </main>
  );
}
