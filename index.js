var OUTPUT = "";
var PIXELS = {};//$.getJSON("pixels.json", function(data){return data});
var SIZE = 0;
var FILL = "";
var LIFT_DISTANCE = 0; // mm
var CANVAS = "";
var CTX = "";

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
  for (var location in locations) {
    if(location){
      var x = (locations[location][0] * SIZE);
      var y = (locations[location][1] * SIZE);
      output += goToPixel(x, y);
      output += fillSquare(x, y, SIZE, SIZE);
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
      CTX.fillRect(x*SIZE, y*SIZE, SIZE-1, SIZE-1);
  }
}

var clear_canvas = function(){
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

var add_image_to_canvas = function(e) {
  var reader = new FileReader();
  reader.onload = function(e){
    var img = new Image();
      img.onload = function(){
        var width = $('.config-width').val();
        var height = $('.config-height').val();
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

var get_pixels_from_canvas = function() {
  
  var imageData = CTX.getImageData(0, 0, canvas.width, canvas.height);
  
  for (var i = 0; i < imageData.data.length; i++) {
    
    imageData.data[i] = 255;
  }
  CTX.putImageData(imageData, 0, 0);
  
};

var output = function() {
  SIZE = $('.config-size').val();
  FILL = $('.config-fill').val();
  LIFT_DISTANCE = $('.config-lift-distance').val();
  
  OUTPUT += startup();

  // main routine
  OUTPUT += title("MAIN");
  
  $.getJSON($('.config-json').val(), function(data){
    PIXELS = data;
    Object.keys(data).forEach(function(color, i) {
      $(".stat-color-"+i+"-swatch").css('background-color', color);
      log("color-"+i+"-name", color);
      
      log("color-"+i+"-length", data[color].length);
      OUTPUT += draw_color(color, data[color]);
      add_to_canvas(color, data[color]);
    });
    
    OUTPUT += shutdown();
    $('#textarea-output').val(OUTPUT); 
  });
  
  // get the pixels from the image
  //OUTPUT += get_pixels("balloon26.jpg");

  // FOR EACH COLOR
  // {  "rgb(000,000,000)" : [[x,y],,,],,,}
}

var init = function() {
  CANVAS = $('#canvas-output')[0];
  CTX = CANVAS.getContext('2d');
  CANVAS.width = CANVAS.height * (CANVAS.clientWidth / CANVAS.clientHeight);
};