/**
 * @import { Canvas } from "canvas";
 */

import { createCanvas } from "canvas";

/**
 * The version of the program.
 */
export const format_version = "1.0.3";

/**
 * Generates a random image of the specified dimensions and scale.
 *
 * @param {{ width?: number, height?: number, scale?: [x: number, y: number], grayscale?: boolean }} options The options for the generate command.
 * @param {number} [options.width=128] The width of the image. Defaults to 128.
 * @param {number} [options.height=128] The height of the image. Defaults to 128.
 * @param {[x: number, y: number]} [options.scale=[1, 1]] The X and Y scale of the image, this specifies the size of each pixel, this will not affect the width or height of the image. Defaults to [1, 1]. Must be an integer of at least 1.
 * @param {boolean} [options.grayscale=false] Whether to generate a grayscale image. Defaults to false.
 * @returns {Buffer<ArrayBufferLike} The generated image as a buffer, its MIME type is `image/png`.
 *
 * @throws {TypeError} If the width or height is not an integer.
 * @throws {RangeError} If the width or height is less than 0.
 * @throws {RangeError} If the X or Y scale is less than 1.
 */
export function generateRandomImage(options = {}) {
    // Check if the width is an integer.
    if (options.width !== undefined && Math.floor(options.width) !== options.width) {
        throw new TypeError("Width must be an integer.");
    }

    // Check if the width is at least 1.
    if ((options.width ?? 128) < 0) {
        throw new RangeError("Width must be at least 0.");
    }

    // Check if the height is an integer.
    if (options.height !== undefined && Math.floor(options.height) !== options.height) {
        throw new TypeError("Height must be an integer.");
    }

    // Check if the height is at least 1.
    if ((options.height ?? 128) < 0) {
        throw new RangeError("Height must be at least 0.");
    }

    // Check if the X scale is at least 1.
    if ((options.scale?.[0] ?? 1) < 1) {
        throw new RangeError("X scale must be at least 1.");
    }

    // Check if the Y scale is at least 1.
    if ((options.scale?.[1] ?? 1) < 1) {
        throw new RangeError("Y scale must be at least 1.");
    }

    /**
     * The canvas object.
     *
     * @type {Canvas}
     */
    const canvas = createCanvas(options.width ?? 128, options.height ?? 128);

    /**
     * The canvas context.
     *
     * @type {CanvasRenderingContext2D}
     */
    const context = canvas.getContext("2d");

    // Iterate over the x coordinates of the image.
    for (let x = 0; x < (options.width ?? 128); x += options.scale?.[0] ?? 1) {
        // Iterate over the y coordinates of the image.
        for (let y = 0; y < (options.height ?? 128); y += options.scale?.[1] ?? 1) {
            // If options.grayscale is true, generate a random grayscale image.
            if (options.grayscale ?? false) {
                const value = Math.floor(Math.random() * 256);
                const r = value;
                const g = value;
                const b = value;
                // Set the fill style to the generated color.
                context.fillStyle = `rgb(${r},${g},${b})`;
                // Fill the current pixel with the generated color.
                context.fillRect(x, y, options.scale?.[0] ?? 1, options.scale?.[1] ?? 1);
                // Continue to the next iteration of the loop.
                continue;
            }
            // If options.grayscale is false, generate a random color image.
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            // Set the fill style to the generated color.
            context.fillStyle = `rgb(${r},${g},${b})`;
            // Fill the current pixel with the generated color.
            context.fillRect(x, y, options.scale?.[0] ?? 1, options.scale?.[1] ?? 1);
        }
    }

    /**
     * The generated image as a buffer.
     *
     * @type {Buffer<ArrayBufferLike>}
     */
    return canvas.toBuffer("image/png");
}
