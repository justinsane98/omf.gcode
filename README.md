# PPP
Photo to Pen Plotting Program

## Getting Started
...

### Prerequisites
Javascript, HTML, CSS, Grunt, SASS, Pug

### Installing

Run `grunt`

## Devlopment

Run `grunt`

## Built With

* Brackets, Chrome and Github

## Authors

* **Justin Shearer** - *Initial work* - [Justinsane98](https://github.com/Justinsane98)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [RgbQuant](https://github.com/leeoniya/RgbQuant.js)
* [Neoquant](https://github.com/unindented/neuquant-js)
* [G-Code Q'n'dirty toolpath simulator](https://nraynaud.github.io/webgcode/)
* [NC Viewer](https://ncviewer.com/)

## Todo
* exclude background color from output (canvas and gcode)
* crop initial image
* set canvas pixel preview size/zoom/scale
* minimize gcode output/debug mode/prod mode?
* add error check for adding an image to see IF there is an image
* compile js add watch in gruntfile
* verify pixel output size is tied to config-size
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
