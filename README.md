# OMF.Gcode
Original photo + Modifications = Fabication ready Gcode
Import any image, select a palette and generate gcode to run on a Marlin

## Getting Started
...

### Prerequisites
Javascript, HTML, CSS, Grunt, SASS, Pug/Jade

### Install and Run
Run `npm install`
Run `grunt`

## Devlopment
Run `grunt watch`

## Built With
* VS Code, Chrome and Github

## Authors
* **Justin Shearer** - *Initial work* - [Justinsane98](https://github.com/Justinsane98)
See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License
This project is licensed under the MIT License.

## Acknowledgments
* [RgbQuant](https://github.com/leeoniya/RgbQuant.js)
* [Neoquant](https://github.com/unindented/neuquant-js)
* [G-Code Q'n'dirty toolpath simulator](https://nraynaud.github.io/webgcode/)
* [NC Viewer](https://ncviewer.com/)
* [Marlin Gcode] (http://marlinfw.org/meta/gcode/)

## Todo
* crop initial image
* minimize gcode output/debug mode/prod mode?
* add error check for adding an image to see IF there is an image
* write cooresponding draw functions for canvas to mirror gcode (fill, spacing, etc)

## Features
* X fill pattern
* horizontal&vertical zigzag fill pattern
* circle fill pattern
* rounded pixel fill pattern
* spiral fill pattern
* repeating alphanumeric character as a fill pattern

## UI notes
* what is the flow like?
* import image > set dimensions > set palette > set print settings
* import settings vs export settings?
* canvas height x width (pixel ~= mm)
* import image to canvas to "fit"
