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
* hide $('.stats') when empty (so show all isn't alsways on)
* Original section has the Image file input
* group height/width, palette, background color into a Modify section
* group pixel size, pixel fill pattern and lift distance into a Fabirication section

* HIDE UI to only show available options...
    * opacity 25% for canvas, stats and gcode
    * click "add image" raise the canvas and stats opacity to 100%
    * click "generate" set gcode opacity to 100%
    * hide zoom, apply palette, generate, copy gcode, clear actions
    * show zoom and apply palatte after click "add image"
    * show generate after click "apply palette/Modify"

* general concept show/hide if Original, Modification Fabrication content or action
* trigger app level classes to cascade of UI changes via CSS body.original-active
* move add image action into original section as CTA
* rename/refactor Apply palatte to Modify and move to modify section as CTA
* move generate action into the Fabrication section as CTA
* move copy gcode into the gcode section (pin to top right)


## Features
* X fill pattern
* horizontal&vertical zigzag fill pattern
* circle fill pattern
* rounded pixel fill pattern
* spiral fill pattern
* repeating alphanumeric character as a fill pattern
* allow for multiple type of firmware and versions


## UI notes
* what is the flow like?
* Example:
    * import Original image
    * Modify (set height/width, palette, background color)
    * generate Fabrication ready Gcode


## Bugs
* after selecting a single color layer, the opacity is wierd... the canvas is now super light

