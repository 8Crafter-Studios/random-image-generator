# 8Crafter's Random Image Generator

[![NPM Downloads](https://img.shields.io/npm/d18m/random-image-generator-plus)](https://npmjs.com/package/random-image-generator-plus)
[![NPM Version](https://img.shields.io/npm/v/random-image-generator-plus)](https://npmjs.com/package/random-image-generator-plus)
[![NPM License](https://img.shields.io/npm/l/random-image-generator-plus)](https://npmjs.com/package/random-image-generator-plus)
[![NPM Last Update](https://img.shields.io/npm/last-update/random-image-generator-plus)](https://npmjs.com/package/random-image-generator-plus)
[![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/random-image-generator-plus)](https://npmjs.com/package/random-image-generator-plus)
[![GitHub last commit](https://img.shields.io/github/last-commit/8Crafter-Studios/random-image-generator)](https://github.com/8Crafter-Studios/random-image-generator/commits/main)
[![Discord](https://img.shields.io/discord/1213197616570048512?logo=discord&label=discord&link=https%3A%2F%2Fdiscord.gg%2FjrCTeHGuhx)](https://discord.gg/jrCTeHGuhx)

This Node.js program generates images by setting each pixel to a randomly colored pixel.

It has both a CLI and module exports.

## CLI

```
Usage:

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
[directory]     The directory to save the image in (requires quotes if the directory contains spaces). If not provided, the image will be saved in ./corruptedImages.
```

## Module

```js
import { generateRandomImage } from "random-image-generator-plus";

fs.writeFileSync("./corruptedImage.png", generateRandomImage({width: 128, height: 128, scale: [1, 1], grayscale: false}));
```

## Sample Images

### No Arguments
![No Arguments](./sample_images/no-args.png)

### Height: 512
![Height: 512](./sample_images/height-512.png)

### Scale: [x: 20, y: 64]
![Scale: [x: 20, y: 64]](./sample_images/scale-20-64.png)

### Scale: [x: 20, y: 64], Grayscale: true
![Scale: [x: 20, y: 64], Grayscale: true](./sample_images/scale-20-64-grayscale-true.png)

### Grayscale: true
![Grayscale: true](./sample_images/grayscale-true.png)