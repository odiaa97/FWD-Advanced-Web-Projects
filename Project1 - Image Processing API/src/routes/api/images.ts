import express from 'express';
import path from 'path';
import sharp from 'sharp';

const images = express.Router();

images.use(express.static(path.join(__dirname, './../../../public')));

images.get('/', (req, res) => {
  if (!req.query.filename && !req.query.width && !req.query.height)
    return res.status(200).send('Images API endpoint');

  if (!req.query.filename && (req.query.width || req.query.height))
    return res
      .status(400)
      .send({ message: 'Bad Requst: Please enter a filename' });

  if (req.query.filename && (!req.query.width || !req.query.height))
    return res
      .status(200)
      .send(`<img src=./images/${req.query.filename}.png />`);

  if (req.query.filename && req.query.width && req.query.height) {
    try {
      const intWidth = parseInt(req.query.width as string);
      const intheight = parseInt(req.query.height as string);

      if (typeof intWidth != 'number')
        return res.status(400).send('Bad Request: Please, enter a valid width');
      if (typeof intheight != 'number')
        return res
          .status(400)
          .send('Bad Request: Please, enter a valid height');

      sharp(
        path.join(
          __dirname,
          `./../../../public/images/${req.query.filename}.png`
        )
      )
        .resize(intWidth, intheight)
        .png()
        .toFile(
          path.join(
            __dirname,
            `./../../../public/resized-images/${req.query.filename}-${req.query.width}-${req.query.height}.png`
          )
        )
        .then(() => {
          res.send(
            `<img src=./resized-images/${req.query.filename}-${req.query.width}-${req.query.height}.png />`
          );
        })
        .catch((err) => {
          console.log({ error: err });
          return res.status(500).send({ error: err.message });
        });
    } catch (error) {
      console.log('ERROR: ', error);
      return res.status(400).send(error);
    }
  } else return res.status(200).send('Images API endpoint returned');
});

export default images;
