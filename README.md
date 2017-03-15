# Thuglify Node

Unimportant package for unimportant purpose. Thuglify your photo. Added thug life assets to your photo.
This package uses:

1. [faced](https://github.com/gordalina/faced) (Face recognition package based on [node-opencv](https://github.com/peterbraden/node-opencv))
2. [node-canvas](https://github.com/Automattic/node-canvas) (Canvas implementation based on [Cairo](http://cairographics.org/))
3. [sharp](http://sharp.dimens.io/en/stable) (Image processing)

# How to install

1. Install `node-canvas` prequisite package. Please refer to [here](https://github.com/Automattic/node-canvas/wiki/_pages)
2. Install `openCV` version `2.4.x`. Please refer to [here](http://docs.opencv.org/2.4/doc/tutorials/introduction/table_of_content_introduction/table_of_content_introduction.html)
3. Run `npm install`

# How to run

1. Go to root directory of this package
2. Run `node images/lenna.png` as example. It will create a new file `images/lenna-processed.png` with glasses on her face.

