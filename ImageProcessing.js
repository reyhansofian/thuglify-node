const sharp = require('sharp');

class ImageProcessing {
  getImageMetadata(file) {
    return sharp(file).metadata();
  }

  convertImageToPng(inputFilePath, outputFilePath) {
    return sharp(inputFilePath)
      .png()
      .toFile(outputFilePath);
  }
}

module.exports = ImageProcessing;
