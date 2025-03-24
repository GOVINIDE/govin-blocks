/**
 * Visual Blocks Language
 *
 * Copyright 2021 Arthur Zheng.
 * https://github.com/ottawastem/scratch-Python-blocks
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

goog.provide('Blockly.Python.micropython');

goog.require('Blockly.Python');


Blockly.Python['microPython_pin_setDigitalOutput'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var level = Blockly.Python.valueToCode(block, 'LEVEL', Blockly.Python.ORDER_UNARY_POSTFIX) || 'LOW';

  var code = "pin"+ pin + ".digitalWrite(" + level + ")\n";
  return code;
};

// Blockly.Python['microPython_pin_setPinMode'] = function(block) {
//   var pin = block.getFieldValue('PIN') || '0';
//   var level = block.getFieldValue('MODE') || 'INPUT';
//   var code = "pinMode(" + pin + ", " + level + ");\n";
//   return code;
//   };

Blockly.Python['microPython_pin_setPinMode'] = function(block) {
  var pin = block.getFieldValue('PIN') || '0';
  var level = block.getFieldValue('MODE') || 'INPUT';  
  var code = "pin"+ pin + "= Pin(" + pin + ",Pin."+ level + ");\n";
  return code;
};

Blockly.Python['microPython_pin_menu_level'] = function(block) {
  var code = block.getFieldValue('level') || '0';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_pin_esp32SetPwmOutput'] = function(block) {
  var pin = block.getFieldValue('PIN') || '0';
  var level = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_UNARY_POSTFIX) || 0;
  var code = "pin" + pin + ".analogWrite(" + level + ")\n";
  return code;
};

Blockly.Python['microPython_pin_readDigitalPin'] = function(block) {
  var pin = block.getFieldValue('PIN') || '0';
  var code = "pin" + pin + ".digitalRead()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python['microPython_pin_readAnalogPin'] = function(block) {
  var pin = block.getFieldValue('PIN') || 'A1';
  var code = "pin" + pin + ".analogRead()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_pin_pinTouched'] = function(block) {
  var pin = block.getFieldValue('PIN') || '0';
  var code = "pin" + pin + ".is_touched()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_display_showImage'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';

  arg0 = arg0.replace(/1/g, '9');
  arg0 = arg0.slice(0, 5) + ':' + arg0.slice(5, 10) + ':' + arg0.slice(10, 15)
    + ':' + arg0.slice(15, 20) + ':' + arg0.slice(20, 25);
  var code = "display.show(Image('" + arg0 + "'))\n";
  return code;
};

Blockly.Python['microPython_display_showImageUntil'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
  var arg1 = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || '0';

  arg0 = arg0.replace(/1/g, '9');
  arg0 = arg0.slice(0, 5) + ':' + arg0.slice(5, 10) + ':' + arg0.slice(10, 15)
    + ':' + arg0.slice(15, 20) + ':' + arg0.slice(20, 25);
  var code = "display.show(Image('" + arg0 + "'))\n" + "sleep(float(" + arg1 + ") * 1000)\n" + "display.clear()\n";
  return code;
};

Blockly.Python['microPython_display_show'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var code = "display.scroll(str(" + arg0 + "), wait=False, loop=False)\n";
  return code;
};

Blockly.Python['microPython_display_showUntilScrollDone'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var code = "display.scroll(str(" + arg0 + "), wait=True, loop=False)\n";
  return code;
};

Blockly.Python['microPython_display_clearDisplay'] = function() {
  var code = "display.clear()\n";
  return code;
};

Blockly.Python['microPython_display_lightPixelAt'] = function(block) {
  var sta = block.getFieldValue('STATE');
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_FUNCTION_CALL) || '';

  if (sta === 'off') {
    sta = 0;
  } else {
    sta = 9;
  }

  var code = "display.set_pixel(int(" + x + "), int(" + y + "), " + sta + ")\n";
  return code;
};

Blockly.Python['microPython_display_showOnPiexlbrightness'] = function(block) {
  var brt = block.getFieldValue('BRT');
  var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_FUNCTION_CALL) || '';

  var code = "display.set_pixel(int(" + x + "), int(" + y + "), " + brt + ")\n";
  return code;
};

Blockly.Python['microPython_sensor_menu_ledBrightness'] = function(block) {
  var code = block.getFieldValue('ledBrightness') || '0';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_sensor_buttonIsPressed'] = function(block) {
  var key = block.getFieldValue('KEY');

  var code = "button_" + key + ".is_pressed()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_sensor_gestureIsX'] = function(block) {
  var sta = block.getFieldValue('STA');

  var code = "accelerometer.is_gesture('" + sta + "')";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_sensor_axisAcceleration'] = function(block) {
  var axis = block.getFieldValue('AXIS');

  var code = "accelerometer.get_" + axis + "()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_sensor_compassAngle'] = function() {
  var code = "compass.heading()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_sensor_compassMagneticDensity'] = function() {
  var code = "compass.get_field_strength()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_sensor_calibrateCompass'] = function() {
  var code = "compass.calibrate()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_sensor_lightLevel'] = function() {
  var code = "display.read_light_level()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_sensor_temperature'] = function() {
  var code = "temperature()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_sensor_runningTime'] = function() {
  var code = "running_time()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_wireless_openWirelessCommunication'] = function() {
  Blockly.Python.imports_["radio"] = "import radio";
  var code = "radio.on()\n";
  return code;
};

Blockly.Python['microPython_wireless_closeWirelessCommunication'] = function() {
  Blockly.Python.imports_["radio"] = "import radio";
  var code = "radio.off()\n";
  return code;
};

Blockly.Python['microPython_wireless_resetWirelessCommunication'] = function() {
  Blockly.Python.imports_["radio"] = "import radio";
  var code = "radio.reset()\n";
  return code;
};

Blockly.Python['microPython_wireless_sendWirelessMessage'] = function(block) {
  Blockly.Python.imports_["radio"] = "import radio";

  var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
  var code = "radio.send(str(" + msg + "))\n";
  return code;
};

Blockly.Python['microPython_wireless_receiveWirelessMessage'] = function() {
  Blockly.Python.imports_["radio"] = "import radio";
  var code = "radio.receive()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_wireless_setWirelessCommunicationChannel'] = function(block) {
  Blockly.Python.imports_["radio"] = "import radio";

  var ch = block.getFieldValue('CH');
  var code = "radio.config(channel = " + ch + ")\n";
  return code;
};
//CARES
Blockly.Python['microPython_serial_multiSerialPrintMicropython'] = function(block) {
  
  var arg1 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_UNARY_POSTFIX) || '';

  var code;
  
  code = 'print(' + arg1 + ');\n';
  return code;
};

Blockly.Python['microPython_serial_multiSerialPrintMicropythonfn'] = function(block) {
  
  var arg1 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_UNARY_POSTFIX) || '';
  var arg2 = Blockly.Python.valueToCode(block, 'FUNCTION', Blockly.Python.ORDER_ATOMIC);
  if (arg2.startsWith("'") && arg2.endsWith("'") || arg2.startsWith('"') && arg2.endsWith('"')) {
    arg2 = arg2.substring(1, arg2.length - 1);
  }
  var code = 'print(' + arg1 +','+ arg2 +');\n';
  return code;
};

Blockly.Python['microPython_serial_multiSerialBegin'] = function(block) {
  var pin = block.getFieldValue('VALUE') || '9600';

  var code = 'Serial.begin(' + pin + ');\n';
  return code;
};

Blockly.Python['microPython_serial_multiSerialAvailable'] = function(block) {
  var arg0 = block.getFieldValue('NO') || '0';
  var code;
  if(arg0 === '0')
  {
    arg0 = '';
  }

  var code = 'Serial' + arg0 + '.available()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_serial_multiSerialBegin'] = function(block) {
  var pin = block.getFieldValue('VALUE') || '9600';

  var code = 'Serial.begin(' + pin + ');\n';
  return code;
};

// // //cares
// Blockly.Python['microPython_Library_IMAGES_LIBRARY'] = function(block) {
//   var text = block.getFieldValue('LIBRARY'); // Ensure fallback default
//   var code = 'import '+ text + '\n';
//   return code;
// };

Blockly.Python['microPython_Library_TIME'] = function(block) {
  var text = block.getFieldValue('LIBRARY'); // Ensure fallback default
  var code = 'import '+ text + '\n';
  return code;
};


Blockly.Python['microPython_Library_PMU_LIBRARY'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'MODE', Blockly.Python.ORDER_ATOMIC); 
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }

  var code = 'from PMU_CARES import ' + text + '\n';
  return code;
};

Blockly.Python['microPython_Library_ADD'] = function(block) {
  var order = Blockly.Python.ORDER_UNARY_PREFIX;
  var arg0 = Blockly.Python.valueToCode(block, 'LIBRARY', order) || '';
  var arg1 = Blockly.Python.valueToCode(block, 'MODE', order) || '';
  var code = '' + arg0  + ', ' + arg1 ;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['microPython_Library_submodule'] = function(block) {
  var text = block.getFieldValue('MODE') || ''; // Ensure fallback default
  return [text, Blockly.Python.ORDER_ATOMIC];  // Return as value
};

// Blockly.Python['microPython_Library_Ultrasonic'] = function(block) {
//   var text = 'from ultrasonic import HCSR04\n'; // Ensure fallback default
//   return text;  // Return as value
// };

Blockly.Python['microPython_Library_UltrasonicSensordeclaration'] = function(block) {
  var text ="from ultrasonic import HCSR04\n";
  return text;  // Return as value
};

Blockly.Python['microPython_ServoMotor_SetServomotor'] = function(block) {
  var text1 = block.getFieldValue('PIN'); // Ensure fallback default
  var code = 'servo'+ text1  + '= Servo(Pin('+ text1 + ')) \n';
  return code;
};

Blockly.Python['microPython_ServoMotor_Servomotorangle'] = function(block) {
  var text = block.getFieldValue('PIN'); // Ensure fallback default
  var angle = Blockly.Python.valueToCode(block, 'DEG', Blockly.Python.ORDER_ATOMIC) || '180'; // Retrieves input or default
  var code = 'servo'+ text +'.write_angle('+ angle + ') \n';
  return code;

};

Blockly.Python['microPython_Display_OLED'] = function(block) {
  // Retrieve the value from the input field
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }

  // Now generate the final Python code without quotes around the variable name
  var code = text + ' = OLED()\n';
  return code;
};

Blockly.Python['microPython_Display_OLEDclear'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }

  var code = text + '.clear()\n';
  return code;
};


Blockly.Python['microPython_Display_OLEDdisplayImage'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 
  var text1 = Blockly.Python.valueToCode(block, 'TEXT1', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }
  if (text1.startsWith("'") && text1.endsWith("'") || text1.startsWith('"') && text1.endsWith('"')) {
    text1 = text1.substring(1, text1.length - 1);
  }

  var code = text + '.display_image('+ text1+')';
  return code;
};


Blockly.Python['microPython_Display_OLEDdisplay'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 
  var text1 = Blockly.Python.valueToCode(block, 'TEXT1', Blockly.Python.ORDER_ATOMIC); 
  var x = Blockly.Python.valueToCode(block, 'DATA2', Blockly.Python.ORDER_ATOMIC); 
  var y = Blockly.Python.valueToCode(block, 'DATA3', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (x.startsWith("'") && x.endsWith("'") || x.startsWith('"') && x.endsWith('"')) {
    x = x.substring(1, x.length - 1);
  }
  if (y.startsWith("'") && y.endsWith("'") || y.startsWith('"') && y.endsWith('"')) {
    y = y.substring(1, y.length - 1);
  }
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }
  var code = text + '.write('+ text1 +','+ x+','+ y +')\n';
  return code;
};



Blockly.Python['microPython_Display_Imageorder'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 
  var text1 = Blockly.Python.valueToCode(block, 'TEXT1', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }

  var code = text +'='+ text1+ '\n';
  return code;
};

Blockly.Python['microPython_Display_Imagelist'] = function(block) {
  var text = block.getFieldValue('TEXT1') || ''; // Ensure fallback default

  var code = 'images.'+text + '';

  return [code, Blockly.Python.ORDER_ATOMIC];  // Return as value
};



Blockly.Python['microPython_Display_PIXEL'] = function(block) {
  // Retrieve the value from the input field
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 
  var text1 = block.getFieldValue('DATA2'); // Ensure fallback default
  var text2 = Blockly.Python.valueToCode(block, 'DATA3', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }
// Check if the value has quotes and remove them
if (text2.startsWith("'") && text2.endsWith("'") || text2.startsWith('"') && text2.endsWith('"')) {
  text2 = text2.substring(1, text2.length - 1);
}


  // Now generate the final Python code without quotes around the variable name
  var code = text + ' = CARESpixel(Pin('+text1 +'),'+ text2+')\n';
  return code;
};

Blockly.Python['microPython_Display_PIXELclear'] = function(block) {
  // Retrieve the value from the input field
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 
  
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }
  // Now generate the final Python code without quotes around the variable name
  var code = text + '.clearAll()\n';
  return code;
};


Blockly.Python['microPython_Display_PIXELdisplay'] = function(block) {
  // Retrieve the value from the input field
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 
  var text1 = Blockly.Python.valueToCode(block, 'TEXT1', Blockly.Python.ORDER_ATOMIC); 
  var x = Blockly.Python.valueToCode(block, 'DATA2', Blockly.Python.ORDER_ATOMIC); 
  var y = Blockly.Python.valueToCode(block, 'DATA3', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (x.startsWith("'") && x.endsWith("'") || x.startsWith('"') && x.endsWith('"')) {
    x = x.substring(1, x.length - 1);
  }
  if (y.startsWith("'") && y.endsWith("'") || y.startsWith('"') && y.endsWith('"')) {
    y = y.substring(1, y.length - 1);
  }
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }
  var code = text + '.matrixColor('+ text1 +','+ x+','+ y +')\n';
  return code;
};


Blockly.Python['microPython_Display_PIXELset'] = function(block) {
  // Retrieve the value from the input field
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 
  var text1 = Blockly.Python.valueToCode(block, 'TEXT1', Blockly.Python.ORDER_ATOMIC); 
  var x = Blockly.Python.valueToCode(block, 'DATA2', Blockly.Python.ORDER_ATOMIC); 
  var y = Blockly.Python.valueToCode(block, 'DATA3', Blockly.Python.ORDER_ATOMIC); 
  var z = Blockly.Python.valueToCode(block, 'DATA4', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (x.startsWith("'") && x.endsWith("'") || x.startsWith('"') && x.endsWith('"')) {
    x = x.substring(1, x.length - 1);
  }
  if (y.startsWith("'") && y.endsWith("'") || y.startsWith('"') && y.endsWith('"')) {
    y = y.substring(1, y.length - 1);
  }
  if (z.startsWith("'") && z.endsWith("'") || z.startsWith('"') && z.endsWith('"')) {
    z = z.substring(1, x.length - 1);
  }

  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }
  if (text1.startsWith("'") && text1.endsWith("'") || text1.startsWith('"') && text1.endsWith('"')) {
    text1 = text1.substring(1, text1.length - 1);
  }
  var code = text + '.setPixel['+ text1+ ']('+ x +','+ y+','+ z +')\n';
  return code;
};

Blockly.Python['microPython_Display_PIXELart'] = function(block) {
  var x = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 

  if (x.startsWith("'") && x.endsWith("'") || x.startsWith('"') && x.endsWith('"')) {
    x = x.substring(1, x.length - 1);
  }
  var code = x + '.animate()\n';
  return code;
};


Blockly.Python['microPython_Display_SevenSegment'] = function(block) {
  // Retrieve the value from the input field
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }

  // Now generate the final Python code without quotes around the variable name
  var code = text + ' = sevenSegment()\n';
  return code;
};

Blockly.Python['microPython_Display_SevenSegment_declaration'] = function(block) {
  // Retrieve the value from the input field
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 
  var text1 = Blockly.Python.valueToCode(block, 'DATA2', Blockly.Python.ORDER_ATOMIC); 
  var text2 = Blockly.Python.valueToCode(block, 'DATA3', Blockly.Python.ORDER_ATOMIC); 

  // Check if the value has quotes and remove them
  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }

  if (text1.startsWith("'") && text1.endsWith("'") || text1.startsWith('"') && text1.endsWith('"')) {
    text1 = text1.substring(1, text1.length - 1);
  }

  if (text2.startsWith("'") && text2.endsWith("'") || text2.startsWith('"') && text2.endsWith('"')) {
    text2 = text2.substring(1, text2.length - 1);
  }

  // Now generate the final Python code without quotes around the variable name
  var code = text + ' = sevenSegment(clkPin='+ text1+',dioPin='+ text2 +')\n';
  return code;
};

Blockly.Python['microPython_Display_SevenSegmentWrite'] = function(block) {
  // Retrieve the value from the input field
  var text = Blockly.Python.valueToCode(block, 'DATA1', Blockly.Python.ORDER_ATOMIC); 
  var text1= Blockly.Python.valueToCode(block, 'DATA2', Blockly.Python.ORDER_ATOMIC); 

  if (text.startsWith("'") && text.endsWith("'") || text.startsWith('"') && text.endsWith('"')) {
    text = text.substring(1, text.length - 1);
  }

  // Check if the value has quotes and remove them
  if (text1.startsWith("'") && text1.endsWith("'") || text1.startsWith('"') && text1.endsWith('"')) {
    text1 = text1.substring(1, text1.length - 1);
  }

  // Now generate the final Python code without quotes around the variable name
  var code = text + '.write_digit('+ text1 +')\n';
  return code;
};

Blockly.Python['microPython_sensor_readUltrasonicSensor'] = function(block) {
  var pin = block.getFieldValue('PIN1') || '0';
  var level = block.getFieldValue('PIN2') || 'INPUT';  
  //var text = Blockly.Python.valueToCode(block, 'N', Blockly.Python.ORDER_ATOMIC); 

  var code = 'HCSR04(trigger_pin='+ pin + ', echo_pin='+ level + ', echo_timeout_us=10000);\n';
  return [code, Blockly.Python.ORDER_ATOMIC];  // Return as value
};

Blockly.Python['microPython_sensor_readUltrasonicSensorDistance'] = function(block) {
  var text = Blockly.Python.valueToCode(block, 'N', Blockly.Python.ORDER_ATOMIC); 

  var code = text + ".distance_cm()\n";
  return [code, Blockly.Python.ORDER_ATOMIC];  // Return as value
};

Blockly.Python['microPython_sensor_readIRSensor'] = function(block) {
  var text = block.getFieldValue('PIN'); 

  var code = "pin"+text+".digitalRead()";
  return [code, Blockly.Python.ORDER_ATOMIC];  // Return as value
};

Blockly.Python['microPython_sensor_readthresholdSensor'] = function(block) {
  var text = block.getFieldValue('PIN'); 
  var code = "pin"+text+".digitalRead()";
  return [code, Blockly.Python.ORDER_ATOMIC];  // Return as value
};


Blockly.Python['microPython_sensor_readLDRSensor'] = function(block) {
  var text = block.getFieldValue('PIN'); 

  var code = "pin"+text+".analogRead()";
  return [code, Blockly.Python.ORDER_ATOMIC];  // Return as value
};

Blockly.Python['microPython_sensor_readSoundSensor'] = function(block) {
  var text = block.getFieldValue('PIN'); 

  var code = "pin"+text+".analogRead()";
  return [code, Blockly.Python.ORDER_ATOMIC];  // Return as value
};


