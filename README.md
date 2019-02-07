![OMF.Gcode](https://raw.githubusercontent.com/justinsane98/omf.gcode/master/screeshot.png "OMF.Gcode")

# OMF.Gcode
Original photo + Modifications = Fabication ready Gcode
Import any image, select a palette and generate gcode to run on device running Marlin firmware. 

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
* fix skewing issue when you zoom in past the width of the container
* create logo
* enlarge canvas
* reduce the size of the color list
* create a color  distribution "bar" [variation of the list]
* show list when you click modify


## Features
* X fill pattern
* horizontal&vertical zigzag fill pattern
* circle fill pattern
* rounded pixel fill pattern
* spiral fill pattern
* repeating alphanumeric character as a fill pattern
* allow for multiple type of firmware and versions

## Bugs
* after selecting a single color layer, the opacity is wierd... the canvas is now super light

