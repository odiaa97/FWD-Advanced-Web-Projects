import sharp from 'sharp';
import path from 'path';

const doImgProcessing = (fn: string, w: number, h: number): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    sharp(path.join(__dirname, `./../../../../public/images/${fn}.png`))
      .resize(w, h)
      .png()
      .toFile(
        path.join(
          __dirname,
          `./../../../../public/resized-images/${fn}-${w}-${h}.png`
        )
      )
      .then(() => {
        resolve(`${fn}-${w}-${h}`);
      })

      .catch((err) => {
        reject(`Error: ${err.message}`);
      });
  });
};
export default doImgProcessing;
