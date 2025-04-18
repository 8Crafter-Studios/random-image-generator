/**
 * @import { Canvas } from "canvas";
 */

import { createCanvas } from "canvas";
import * as fs from "fs";
import path from "path";

/**
 * The version of the program.
 */
const format_version = "1.0.0";

/**
 * The arguments passed to the CLI.
 *
 * The {@link process.argv} array without the first two elements (node and the script name).
 *
 * @type {string[]}
 */
const args = process.argv.slice(2);

/**
 * The arguments that are not flags.
 *
 * The {@link args} array without any of the strings that started with a `-`, and without the subcommand name.
 *
 * @type {string[]}
 */
const nonFlagArgs = args.slice(1).filter((arg) => !arg.startsWith("-"));

switch (args[0]?.toLowerCase()) {
    case "version":
        versionCommand();
        break;
    case "-h":
    case "--help":
    case "help":
        helpCommand();
        break;
    case "generate":
        generateCommand();
        break;
    case undefined:
        console.error("\u001B[38;2;255;0;0mNo subcommand provided. Use the help subcommand to see the usage.\u001B[0m");
        process.exit(1);
    default:
        console.error("\u001B[38;2;255;0;0mInvalid subcommand: " + args[0] + ". Use the help subcommand to see the usage.\u001B[0m");
        process.exit(1);
}

function helpCommand() {
    // Print the help message.
    console.log(`Usage:

random-image-generator-plus generate [options] [width] [height] [scale] [directory]      Generate a random iamge of the specified dimensions.
random-image-generator-plus version                                                      Shows the version number.
random-image-generator-plus help                                                         Show this help message.
random-image-generator-plus -h                                                           Show this help message.
random-image-generator-plus --help                                                       Show this help message.

Options:
  -o, --overwrite             Overwrite the image file if it already exists.
  -g, --grayscale             Generate a grayscale image.
  -n, --name=<name>           Set the name of the image file (extension not included, requires quotes if the name contains spaces).
  -d-pa, --debug-print-args   Print the arguments and resolved configuration to the console. Useful for debugging.
  -dr, --dry-run              Prevents the command from actually modifying anything, enabling this flag also enabled the --debug-print-args flag.

Paramters:
[width]         The width of the image. If not provided, the width will be 128 pixels.
[height]        The height of the image. If not provided, the height will be 128 pixels.
[scale]         The scale of the image, this specifies the size of each pixel, this will not affect the width or height of the image. If not provided, the scale will be 1. Format should be "scaleX:scaleY" or "scale".
[directory]     The directory to save the image in (requires quotes if the directory contains spaces). If not provided, the image will be saved in ./corruptedImages.`);
    process.exit(0);
}

// Print the arguments if the -d-pa, --debug-print-args, -dr or --dry-run flag is provided.
if (args.includes("-d-pa") || args.includes("--debug-print-args") || args.includes("-dr") || args.includes("--dry-run")) {
    console.log(`argv0: ${process.argv0}`);
    console.log(`Arguments: ${JSON.stringify(process.argv)}`);
    console.log(`CWD: ${process.cwd()}`);
}

function generateCommand() {
    // Check if the width is an integer.
    if (nonFlagArgs[0] !== undefined && !/^[0-9]+$/.test(nonFlagArgs[0])) {
        console.error("\u001B[38;2;255;0;0mInvalid width, must be an integer. Use the --help or -h option to see the usage.\u001B[0m");
        process.exit(1);
    }

    // Check if the height is an integer.
    if (nonFlagArgs[1] !== undefined && !/^[0-9]+$/.test(nonFlagArgs[1])) {
        console.error("\u001B[38;2;255;0;0mInvalid height, must be an integer. Use the --help or -h option to see the usage.\u001B[0m");
        process.exit(1);
    }

    // Check if the scale is in the form "scaleX:scaleY" or "scale", and scaleX, scaleY, and scale are integers.
    if (nonFlagArgs[2] !== undefined && !/^x?[0-9]+(?:[:,\\\/;\-&|xy][0-9]+y?)?$/.test(nonFlagArgs[2])) {
        console.error(
            '\u001B[38;2;255;0;0mInvalid scale, must be in the form "scaleX:scaleY" or "scale", scaleX, scaleY and scale must be integers. Use the --help or -h option to see the usage.\u001B[0m'
        );
        process.exit(1);
    }

    /**
     * The directory to save the image in.
     *
     * @type {string}
     */
    const directory = path.resolve(process.cwd(), nonFlagArgs.length > 3 ? nonFlagArgs[3] : "./corruptedImages");

    // Create the directory if it doesn't exist.
    fs.mkdirSync(directory, { recursive: true });

    /**
     * The width of the image.
     *
     * Get the value from the first non-flag argument.
     *
     * @type {number}
     */
    const width = Number(nonFlagArgs[0] ?? 128);

    /**
     * The height of the image.
     *
     * Get the value from the second non-flag argument.
     *
     * @type {number}
     */
    const height = Number(nonFlagArgs[1] ?? 128);

    /**
     * The X scale of the image.
     *
     * Get the value from the third non-flag argument.
     *
     * @type {number}
     */
    const scaleX = nonFlagArgs[2]
        ? /^[0-9]+$/.test(nonFlagArgs[2])
            ? Number(nonFlagArgs[2])
            : Number(nonFlagArgs[2].match(/^x?([0-9]+)[:,\\\/;\-&|xy]([0-9]+)y?$/)?.[1] ?? 1)
        : 1;

    /**
     * The Y scale of the image.
     *
     * Get the value from the third non-flag argument.
     *
     * @type {number}
     */
    const scaleY = nonFlagArgs[2]
        ? /^[0-9]+$/.test(nonFlagArgs[2])
            ? Number(nonFlagArgs[2])
            : Number(nonFlagArgs[2].match(/^x?[0-9]+[:,\\\/;\-&|xy]([0-9]+)y?$/)?.[1] ?? 1)
        : 1;

    // Check if the X scale is at least 1.
    if (scaleX < 1) {
        console.error("\u001B[38;2;255;0;0mInvalid X scale, must be at least 1. Use the --help or -h option to see the usage.\u001B[0m");
        process.exit(1);
    }

    // Check if the Y scale is at least 1.
    if (scaleY < 1) {
        console.error("\u001B[38;2;255;0;0mInvalid Y scale, must be at least 1. Use the --help or -h option to see the usage.\u001B[0m");
        process.exit(1);
    }

    /**
     * Whether or not to generate a grayscale image.
     *
     * Set to true if the -g or --grayscale flag is provided.
     *
     * @type {boolean}
     *
     * @default false
     */
    const useGrayScale = args.includes("-g") || args.includes("--grayscale");

    /**
     * Whether or not to overwrite the image file if it already exists.
     *
     * Set to true if the -o or --overwrite flag is provided.
     *
     * @type {boolean}
     *
     * @default false
     */
    const overwrite = args.includes("-o") || args.includes("--overwrite");

    /**
     * The name of the image file.
     *
     * Get the value from the -n or --name flag.
     *
     * @type {string}
     *
     * @default "image"
     */
    const name =
        args
            .find((arg) => arg.startsWith("-n") || arg.startsWith("--name="))
            ?.split("=")
            .slice(1)
            .join("=") || "image";

    // Print the arguments if the -d-pa, --debug-print-args, -dr or --dry-run flag is provided.
    if (args.includes("-d-pa") || args.includes("--debug-print-args") || args.includes("-dr") || args.includes("--dry-run")) {
        console.log(`width: ${width}`);
        console.log(`height: ${height}`);
        console.log(`scaleX: ${scaleX}`);
        console.log(`scaleY: ${scaleY}`);
        console.log(`useGrayScale: ${useGrayScale}`);
        console.log(`overwrite: ${overwrite}`);
        console.log(`name: ${name}`);
        console.log(`directory: ${directory}`);
    }

    /**
     * The canvas object.
     *
     * @type {Canvas}
     */
    const canvas = createCanvas(width, height);

    /**
     * The canvas context.
     *
     * @type {CanvasRenderingContext2D}
     */
    const context = canvas.getContext("2d");

    // Iterate over the x coordinates of the image.
    for (let x = 0; x < width; x += scaleX) {
        // Iterate over the y coordinates of the image.
        for (let y = 0; y < height; y += scaleY) {
            // If useGrayScale is true, generate a random grayscale image.
            if (useGrayScale) {
                const value = Math.floor(Math.random() * 256);
                const r = value;
                const g = value;
                const b = value;
                // Set the fill style to the generated color.
                context.fillStyle = `rgb(${r},${g},${b})`;
                // Fill the current pixel with the generated color.
                context.fillRect(x, y, scaleX, scaleY);
                // Continue to the next iteration of the loop.
                continue;
            }
            // If useGrayScale is false, generate a random color image.
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            // Set the fill style to the generated color.
            context.fillStyle = `rgb(${r},${g},${b})`;
            // Fill the current pixel with the generated color.
            context.fillRect(x, y, scaleX, scaleY);
        }
    }

    /**
     * The generated image as a buffer.
     *
     * @type {Buffer<ArrayBufferLike>}
     */
    const buffer = canvas.toBuffer("image/png");
    // If overwrite is false, check if the image file already exists.
    if (!overwrite && fs.existsSync(path.join(directory, `${name}.png`))) {
        /**
         * The next available ID.
         *
         * @type {number}
         */
        let ID = 1;
        /**
         * The IDs found in the directory.
         *
         * @type {number[]}
         */
        let foundIDs = [];
        fs.readdirSync(directory).forEach((file) => {
            // Check if the file name matches `${name} (${ID}).png`.
            if (file.split("/").pop().startsWith(name) && /^ \([0-9]+\)\.png$/.test(file.split("/").pop().slice(name.length))) {
                // Push the ID to the foundIDs array.
                foundIDs.push(
                    parseInt(
                        file
                            .split("/")
                            .pop()
                            .slice(name.length)
                            .match(/^ \(([0-9]+)\)\.png$/)[1]
                    )
                );
            }
        });
        // Sort the foundIDs array.
        foundIDs.sort((a, b) => a - b);
        // Find the next available ID.
        foundIDs.forEach((id) => {
            // If the current ID already exists, increment it.
            // If there is a gap in IDs, for example `${name} (1).png` and `${name} (3).png`, the next available ID will be 2.
            if (id === ID) {
                // Increment the ID.
                ID++;
            }
        });
        // If the -d-pa, --debug-print-args, -dr or --dry-run flag is provided, print the evaluated file name.
        if (args.includes("-d-pa") || args.includes("--debug-print-args") || args.includes("-dr") || args.includes("--dry-run")) {
            console.log(`Evaluated file name: ${name} (${ID}).png`);
        }
        // If the -dr or --dry-run flag is not provided, write the image.
        if (!args.includes("-dr") && !args.includes("--dry-run")) {
            // Write the image with the next available ID.
            fs.writeFileSync(path.join(directory, `${name} (${ID}).png`), buffer);
        }
    } else {
        // If the -d-pa, --debug-print-args, -dr or --dry-run flag is provided, print the evaluated file name.
        if (args.includes("-d-pa") || args.includes("--debug-print-args") || args.includes("-dr") || args.includes("--dry-run")) {
            console.log(`Evaluated file name: ${name} (${ID}).png`);
        }
        // If the -dr or --dry-run flag is not provided, write the image.
        if (!args.includes("-dr") || !args.includes("--dry-run")) {
            // Write the image. Overwrites the file if it already exists.
            fs.writeFileSync(path.join(directory, `${name}.png`), buffer, { encoding: "utf8", flag: "w" });
        }
    }
}

function versionCommand() {
    // Print the version number.
    console.log(`random-image-generator-plus v${format_version}`);
}
