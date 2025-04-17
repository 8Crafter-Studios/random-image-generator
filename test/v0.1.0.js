import { createCanvas } from "canvas";
import * as fs from "fs";

// Dimensions for the image
const width = 128;
const height = 128;
const useGrayScale = true;

// Instantiate the canvas object
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        if (useGrayScale) {
            const value = Math.floor(Math.random() * 256);
            const r = value;
            const g = value;
            const b = value;
            context.fillStyle = `rgb(${r},${g},${b})`;
            context.fillRect(x, y, 1, 1);
            continue;
        }
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        context.fillStyle = `rgb(${r},${g},${b})`;
        context.fillRect(x, y, 1, 1);
    }
}

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);