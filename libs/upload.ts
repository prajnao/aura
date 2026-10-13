import ColorThief from "colorthief";

export const getImageUploadData = (
  file: File
): Promise<{ uploadValue: string; colorPaletteList: number[][] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(img, 10);
        resolve({
          uploadValue: event.target?.result as string,
          colorPaletteList: colorPalette,
        });
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};
