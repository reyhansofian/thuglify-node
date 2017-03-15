const _ = require('underscore');

class FaceProcessing {
  constructor() {
    this.face = [];
    this.mouth = [];
    this.nose = [];
    this.eyeLeft = [];
    this.eyeRight = [];
  }

  processFaceFeatures(features) {
    _.each(features, (feature, name) => {
      this[name] = feature;

      // Check if eye is detected
      if (!this.eyeRight.length && this.eyeLeft.length) {
        // Let's assume that if right eye is not detected,
        // it has same property as left eye
        this.eyeRight = this.eyeLeft;
      }

      if (!this.eyeLeft.length && this.eyeRight.length) {
        // Let's assume that if left eye is not detected,
        // it has same property as right eye
        this.eyeLeft = this.eyeRight;
      }
    });
  }

  calculateGlassesWidth() {
    const leftEyeX = this.eyeLeft[0].getX();
    const rightEyeX = this.eyeRight[0].getX();
    const rightEyeWidth = this.eyeRight[0].getWidth();

    // Get length from left eye X to right eye X (the most left position of the right eye)
    const totalLeftEyeWidth = rightEyeX - leftEyeX;

    return totalLeftEyeWidth + rightEyeWidth;
  }
}

module.exports = FaceProcessing;
