import express from 'express';
import path from 'path';
import doImageProcessing from './services/imageProcessingService';
import fs from 'fs';

const images = express.Router();

images.get(
  '/',
  (req: express.Request, res: express.Response): express.Response => {
    if (!req.query.filename && !req.query.width && !req.query.height)
      return res.status(200).send('Images API endpoint');

    if (!req.query.filename && (req.query.width || req.query.height))
      return res.status(200).send({ message: 'Please enter a filename' });

    if (req.query.filename && (!req.query.width || !req.query.height)) {
      const src = `${path.join(
        __dirname,
        `./../../../public/images/${req.query.filename}.png`
      )}`;
      if (fs.existsSync(src))
        return res
          .status(200)
          .send(`<img src=./images/${req.query.filename}.png />`);
      else
        return res
          .status(200)
          .send({ message: 'Please enter a valid filename' });
    }

    if (req.query.filename && req.query.width && req.query.height) {
      try {
        if (!parseInt(req.query.width as string))
          return res
            .status(400)
            .send('Bad Request: Please, enter a valid width');

        if (!parseInt(req.query.height as string))
          return res
            .status(400)
            .send('Bad Request: Please, enter a valid height');

        const intWidth = parseInt(req.query.width as string);
        const intHeight = parseInt(req.query.height as string);

        doImageProcessing(req.query.filename as string, intWidth, intHeight)
          .then((result) => {
            const img = `<img src=./../../../resized-images/${result}.png />`;
            res.status(200).send(img);
          })
          .catch((err) => res.status(500).send({ Error: err }));

        return res;
      } catch (error) {
        return res.status(400).send(error);
      }
    }
    return res.status(200).send('Images API endpoint returned');
  }
);

images.use(express.static(path.join(__dirname, './../../../public')));

export default images;
