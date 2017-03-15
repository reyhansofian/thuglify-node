const _ = require('underscore');
const path = require('path');
const fs = require('fs');
const Faced = require('faced');
const Canvas = require('canvas');
const ImageProcessing = require('./ImageProcessing');
const FaceProcessing = require('./FaceProcessing');

const faced = new Faced();
const imageProcessing = new ImageProcessing();

const getFilename = file => path.basename(file).split('.')[0];

imageProcessing.constructor.getImageMetadata(process.argv[2])
  .then((metadata) => {
    const { width, height } = metadata;
    const Image = Canvas.Image;
    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');
    const imagePath = path.join(__dirname, '/images', `${getFilename(process.argv[2])}-processed.png`);

    return imageProcessing.constructor.convertImageToPng(process.argv[2], imagePath)
      .then(() => {
        faced.detect(imagePath, (faces) => {
          const faceProcessing = new FaceProcessing();

          _.each(faces, (face) => {
            faceProcessing.processFaceFeatures(face.getFeatures());

            fs.readFile(imagePath, (err, photo) => {
              if (err) throw err;

              const img = new Image();
              img.src = photo;

              ctx.drawImage(img, 0, 0, width, height);

              fs.readFile(path.join(__dirname, '/assets/glasses.png'), (errGlasses, glass) => {
                const glasses = new Image();
                glasses.src = glass;

                ctx
                  .drawImage(
                      glasses,
                      faceProcessing.eyeLeft[0].getX(),
                      faceProcessing.eyeLeft[0].getY(),
                      faceProcessing.calculateGlassesWidth(),
                      faceProcessing.eyeLeft[0].getHeight()
                  );

                canvas
                  .createPNGStream()
                  .pipe(fs.createWriteStream(imagePath));
              });
            });
          });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
