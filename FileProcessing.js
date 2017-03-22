const path = require('path');
const fs = require('fs');

class FileProcessing {
  getDirName(file) {
    return path.dirname(file);
  }

  getFilename(file) {
    return path.basename(file).split('.')[0];
  }

  checkFileExist(file) {
    return Promise.resolve(fs.existsSync(file));
  }
}

module.exports = FileProcessing;
