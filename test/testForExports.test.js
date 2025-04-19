import { format_version, generateRandomImage } from "../lib/exports.js";

console.log(`Version: ${format_version}`);
console.log(generateRandomImage());
console.log(generateRandomImage({width: 128, height: 128, scale: [1, 1], grayscale: false, format: "jpg", jpegOptions: {chromaSubsampling: true, progressive: true, quality: 1}}));

// Generate a colored 128x128 PNG image and save it to ./corruptedImage.png.
fs.writeFileSync("./corruptedImage.png", generateRandomImage({ width: 128, height: 128, scale: [1, 1], grayscale: false }));

// Generate a colored 128x128 JPEG image with chroma subsampling, progressive encoding, and maximum quality and save it to ./corruptedImage.jpg.
fs.writeFileSync(
    "./corruptedImage.jpg",
    generateRandomImage({
        width: 128,
        height: 128,
        scale: [1, 1],
        grayscale: false,
        format: "jpg",
        jpegOptions: { chromaSubsampling: true, progressive: true, quality: 1 },
    })
);

// Generate a grayscale 128x128 PDF image and save it to ./corruptedGrayscaleImage.pdf.
fs.writeFileSync("./corruptedGrayscaleImage.pdf", generateRandomImage({ width: 128, height: 128, scale: [1, 1], grayscale: true, format: "pdf" }));

// Generate a grayscale 128x128 SVG image with pixels of size 20x64 and save it to ./corruptedGrayscaleImage.svg.
fs.writeFileSync("./corruptedGrayscaleImage.svg", generateRandomImage({ width: 128, height: 128, scale: [20, 64], grayscale: true, format: "svg" }));
