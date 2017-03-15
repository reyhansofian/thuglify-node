const sharp = require('sharp');

class ImageProcessing {
  static getImageMetadata(file) {
    return sharp(file).metadata();
  }

  static convertImageToPng(inputFilePath, outputFilePath) {
    return sharp(inputFilePath)
      .png()
      .toFile(outputFilePath);
  }
}

module.exports = ImageProcessing;
