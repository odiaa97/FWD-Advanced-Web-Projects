import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const doImgProcessing = (fn: string, w: number, h: number): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const dirPath = path.join(__dirname, './../../../../public'); // Path to the images directory

    // Create a new directory if it doesn't exist
    if (!fs.existsSync(`${dirPath}/resized-images`)) {
      fs.mkdir(`${dirPath}/resized-images`, (err) => {
        return err;
      });
    }

    // check if it exists already, and get it from the resized-images directory
    if (fs.existsSync(`${dirPath}/resized-images/${fn}-${w}-${h}.png`)) {
      resolve(`${fn}-${w}-${h}`);
    }

    // If it doesn't exist, create it with sharp
    else {
      // Create a new image with new dimensions, and return only the image name
      sharp(`${dirPath}\\images\\${fn}.png`)
        .resize(w, h)
        .png()
        .toFile(`${dirPath}/resized-images/${fn}-${w}-${h}.png`)
        .then(() => {
          resolve(`${fn}-${w}-${h}`);
        })

        .catch((err) => {
          reject(`Error: ${err.message}`);
        });
    }
  });
};

export default doImgProcessing;
