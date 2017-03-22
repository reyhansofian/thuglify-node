#!/usr/bin/env node

const _ = require('underscore');
const program = require('commander');
const path = require('path');
const fs = require('fs');
const Faced = require('faced');
const Canvas = require('canvas');
const ImageProcessing = require('./ImageProcessing');
const FaceProcessing = require('./FaceProcessing');
const FileProcessing = require('./FileProcessing');

const faced = new Faced();
const imageProcessing = new ImageProcessing();
const fileProcessing = new FileProcessing();

program
  .version('1.0.0')
  .option('-i --input <path>', 'Image file path')
  .parse(process.argv);

fileProcessing.checkFileExist(program.input)
  .then((isExist) => {
    if (typeof program.input === 'undefined') {
      throw new Error('Please specify the image path using \'--input\' options');
    }

    if (!isExist) {
      throw new Error(`File with path ${program.input} is not exists!`);
    }

    return imageProcessing.getImageMetadata(program.input);
  })
  .then((metadata) => {
    const { width, height } = metadata;
    const Image = Canvas.Image;
    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');
    const imagePath = path.join(__dirname, '/images', `${fileProcessing.getFilename(program.input)}-processed.png`);

    return imageProcessing.convertImageToPng(program.input, imagePath)
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
      });
  })
  .catch((err) => {
    console.error(err);
  });
