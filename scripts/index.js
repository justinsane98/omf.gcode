var OUTPUT = "";
var PIXELS = {};//$.getJSON("pixels.json", function(data){return data});
var SIZE = 0;
var FILL = "";
var LIFT_DISTANCE = 0; // mm
var CANVAS = "";
var CTX = "";
var PALETTE = 
  {
   "THIRTY_TWO" : [
			[214, 160, 144],
			[254, 59, 30],
			[161, 44, 50],
			[250, 47, 122],
			[251, 159, 218],
			[230, 28, 247],
			[153, 47, 124],
			[71, 1, 31],
			[5, 17, 85],
			[79, 2, 236],
			[45, 105, 203],
			[0, 166, 238],
			[111, 235, 255],
			[8, 162, 154],
			[42, 102, 106],
			[6, 54, 25],
			[0, 0, 0],
			[74, 73, 87],
			[142, 123, 164],
			[183, 192, 255],
			[255, 255, 255],
			[172, 190, 156],
			[130, 124, 112],
			[90, 59, 28],
			[174, 101, 7],
			[247, 170, 48],
			[244, 234, 92],
			[155, 149, 0],
			[86, 98, 4],
			[17, 150, 59],
			[81, 225, 19],
			[8, 253, 204]
    ],
    "TWO" : [
			[214, 160, 144],
			[254, 59, 30]
    ]
}

var code = function(gcode, comment){
    comment = comment || ""; 
    return gcode + "; " + comment + "\n";
};

var comment = function(text){
    return "; " + text + "\n";
};

var title = function(text){
    return "\n;;; " + text + "\n\n";
};

var move = function(position){
    return "G1 " + position + "\nM400\n";
};

var goToPixel = function(x, y, z){
  z = z || 0;
  var output = "";
  output += title("GOTO (" + x + ", " + y + ")");
  output += move("Z"+ LIFT_DISTANCE);
  output += move("X"+x+" Y"+y);
  output += move("Z"+z);
  return output;
};

var fillSquare = function(x, y, height, width){
  var output = "";
  output += title("FILL SQUARE (" + height + " x "+ width + " , " + FILL + ")");
  
  height = parseInt(height);
  width = parseInt(width);
  
  if (FILL == "border") {
      output += "G01 X" + (x+height) + " Y" + y + "\n"; // top left
      output += "G01 X" + (x+height) + " Y" + (y+width) + "\n"; // top right
      output += "G01 X" + x + " Y" + (y+width) + "\n"; // bottom right
      output += "G01 X" + x + " Y" + y + "\n";// bottom left
  }
  if (FILL == "x") {
      output += "G01 X" + (x+height) + " Y" + (y+width) + "\n"; // top right
      goToPixel(x+height, y); // top left
      output += "G01 X" + x + " Y" + (y+width) + "\n"; // bottom right
  }
  return output;
};

var startup = function() {
  var output = "";
  output += title("STARTUP");
  output += code("G90", "Set to Absolute Positioning");
  output += code("M82", "Set extruder to absolute mode"); 
  output += code("M104 S0", "Turn off extruder");
  output += code("M140 S0", "Turn off bed");
  output += code("M107", "Turn off fan");
  output += code("G92 E0", "Reset extruder position");
  output += code("G92 X0", "Reset X position");
  output += code("G92 Y0", "Reset Y position");
  output += code("G92 Z0", "Reset Z position");
  return output;
};

var shutdown = function() {
  var output = "";
  output += title("SHUTDOWN");
  output += goToPixel(0,0);
  output += code("M400", "Finish Moves");
  output += code("M84", "Disable motors");
  output += code("M300 S294 P200", "Play sound 294 for 200ms");
  output += code("G4 2500", "Wait 200ms");
  output += code("M300 S294 P200", "Play sound 294 for 200ms");
  output += code("G4 2500", "Wait 200ms");
  output += code("M300 S294 P200", "Play sound 294 for 500ms");
  return output;
};

var color_change = function(color_new) {
  var regExp = /\(([^)]+)\)/;
  var rgb = regExp.exec(color_new)[1];
  var output = "";
  output += title("COLOR CHANGE");
  output += goToPixel(0, 0, 3);
  output += code("M400", "Finish Moves");
  output += code("M300 S294 P500", "Play sound 294 for 500ms");
  output += code("M117 " + rgb);
  output += code("M0 " + rgb);
  return output;
};

var draw_color = function(color, locations) {
  locations = locations || [];
  var output = "";
  output += color_change(color);
  var count = 0;
  var SIZE = $('.config-size').val();
  for (var location in locations) {
    if(location){
      var x = (locations[location][0] * SIZE);
      var y = (locations[location][1] * SIZE);
      output += goToPixel(x, y);
      output += fillSquare(x, y, SIZE-1, SIZE-1);
    }
  }
  return output;
};

var add_to_canvas = function(color, locations) {
  locations = locations || [];
  for (var location in locations){
      var x = locations[location][0];
      var y = locations[location][1];
      CTX.fillStyle = color;
      CTX.fillRect(x, y, 1, 1);
  }
}

var clear_canvas = function(){
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

var clear_stats = function() {
  var pixel_count = 0;
  $('.stat-color ').each(function(i){
    $(".stat-color-"+i+"-swatch").css('background-color', "rgba(255,255,255)");
    log("color-"+i+"-name", "");
    log("color-"+i+"-length", "");
  });
  $('.show-all').text('');
}

var add_stat = function(i, color) {
    $(".stat-color-"+i+"-swatch").css('background-color', color);
    log("color-"+i+"-name", color);
    log("color-"+i+"-length", PIXELS[color].length);
}

var clear_gcode = function() {
  $('#textarea-output').val(""); 
}

var add_image_to_canvas = function(e) {
  var reader = new FileReader();
  reader.onload = function(e){
    var img = new Image();
      img.onload = function(){
        var width = $('.config-width').val();
        var height = $('.config-height').val();
        CANVAS.width = width;
        CANVAS.height = height;
        if(height > 0 && width > 0){
          CTX.drawImage(img,0,0, width, height);
        } else {
          CTX.drawImage(img,0,0);
        }
      }
    img.src = event.target.result;
  }
  reader.readAsDataURL($('.config-image').prop('files')[0]);     
}

var log = function(type, message){
  $('.stat-'+type).text(message);
};

var quantize = function() {
  var width = parseInt($('.config-width').val(), 10);
  var height = parseInt($('.config-height').val(), 10);
  var palette = PALETTE[$('.config-palette').val()];
  var imageData = CTX.getImageData(0, 0, width, height);
  var q = new RgbQuant({
    method: 2,
    colors: palette.length,
    palette: palette,
    reIndex: true
  });
  var reducedImageData = q.reduce(imageData);
  imageData.data.set(reducedImageData);
  clear_canvas();
  CTX.putImageData(imageData, 0, 0);
}

var get_pixels_from_canvas = function() {
  var width = parseInt($('.config-width').val(), 10);
  var height = parseInt($('.config-height').val(), 10);
  var imageData = CTX.getImageData(0, 0, width, height);
  for (var i = 0; i < imageData.data.length; i+=4) {
      var r = imageData.data[i];
      var g = imageData.data[i+1];
      var b = imageData.data[i+2];
      //console.log(i + " = rgb(" + r + ", " + g + ", "+ b +")");
  }

  // QUANTIZE
  quantize();

  // for each pixel in PIXELS
  for(var x=0;x<width;x++){
    for(var y=0;y<height;y++){
      var data = CTX.getImageData(x, y, 1, 1).data;
      var color = "rgb(" + data[0] + ","  + data[1] + "," + data[2] + ")";
      if(color !=$('.config-background').val()){
        if(!PIXELS.hasOwnProperty(color)){
          PIXELS[color] = [[x,y]];
        } else {
          PIXELS[color].push([x,y]);
        }
      }
    }
  }
};

var resize_canvas = function() {
  var zoom  = parseInt($('.config-zoom').val(), 10);
  var width = parseInt($('.config-width').val(), 10);
  var height = parseInt($('.config-height').val(), 10);
  CANVAS.style.width = (width * zoom) + "px";
  CANVAS.style.height = (height * zoom) + "px";
}

var output = function() {
  FILL = $('.config-fill').val();
  LIFT_DISTANCE = $('.config-lift-distance').val();
  OUTPUT = ""; // reset
  OUTPUT += startup();
  // main routine
  OUTPUT += title("MAIN");

  var pixel_count = 0;
  Object.keys(PIXELS).forEach(function(color, i) {
    OUTPUT += draw_color(color, PIXELS[color]);
    add_stat(i, color);
    pixel_count++
  });
  $('.show-all').text('show all (' + pixel_count+ ')');
  
  OUTPUT += shutdown();
  $('#textarea-output').val(OUTPUT); 
}

var init = function() {
  CANVAS = $('#canvas-output')[0];
  CTX = CANVAS.getContext('2d');
  CANVAS.width = CANVAS.height * (CANVAS.clientWidth / CANVAS.clientHeight);
};