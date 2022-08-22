import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const doImgProcessing = (fn: string, w: number, h: number): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const dirPath = path.join(__dirname, './../../../../public');
    if (!fs.existsSync(`${dirPath}/resized-images`)) {
      fs.mkdir(`${dirPath}/resized-images`, (err) => {return err});
    }
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
  });
};
export default doImgProcessing;
