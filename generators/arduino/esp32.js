/**
 * Visual Blocks Language
 *
 * Copyright 2020 openblock.cc.
 * https://github.com/openblockcc/openblock-blocks
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

goog.provide('Blockly.Arduino.esp32');

goog.require('Blockly.Arduino');


Blockly.Arduino['arduino_pin_esp32SetPwmOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = block.getFieldValue('CH') || '0';

  Blockly.Arduino.setups_['esp32SetPwmOutput' + arg0] = 'ledcSetup(' + arg2 + ', 490, 8);';
  Blockly.Arduino.setups_['esp32SetPwmOutput2' + arg0] = 'ledcAttachPin(' + arg0 + ', ' + arg2 + ');';

  var code = "ledcWrite(" + arg2 + ", " + arg1 + ");\n";
  return code;
};

Blockly.Arduino['arduino_pin_esp32SetDACOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var code = "analogWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};


Blockly.Arduino['arduino_pin_esp32ReadTouchPin'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var code = "touchRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_esp32SetServoOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg2 = block.getFieldValue('CH') || '0';

  Blockly.Arduino.includes_['esp32SetServoOutput'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['esp32SetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
  Blockly.Arduino.setups_['esp32SetServoOutput' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ', ' + arg2 + ');';

  var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
  return code;
};


Blockly.Arduino['arduino_sensor_readSoundSensor'] = function (block) {

  var pin = block.getFieldValue('PIN');

  Blockly.Arduino.definitions_['defintions_sound'] = '\n// Function to read the sound sensor\n' +
  'int readSoundSensor(int analogPin) {\n' +
  '  int value = analogRead(analogPin);\n' +
  '  delay(10);\n' +
  '  return value;\n' +
  '}\n';
  
  // var setupCode = 'int readSoundSensor(int analogPin)\n{\nint value = analogRead(analogPin);\ndelay(10);\nreturn value;\n}';
  // Blockly.Arduino.addSetup('sound_' + pin, setupCode, true);
  var code = 'readSoundSensor(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['arduino_sensor_readLDRSensor'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '6';
  var code = "analogRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_sensor_readIRSensor2'] = function(block) {
  var pin = block.getFieldValue('PIN');

  Blockly.Arduino.definitions_['defintions_ir'] = '\n// Function to read the IR sensor\n' +
  'int readIRSensor(int digitalPin) {\n' +
  '  int value = digitalRead(digitalPin);\n' +
  '  delay(10);\n' +
  '  return value;\n' +
  '}\n';
  
  // var setupCode = 'int readSoundSensor(int analogPin)\n{\nint value = analogRead(analogPin);\ndelay(10);\nreturn value;\n}';
  // Blockly.Arduino.addSetup('sound_' + pin, setupCode, true);
  var code = 'readIRSensor(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


//THRESHOLD module cares 2.0.5
Blockly.Arduino['arduino_sensor_readThreshold'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';
  var code = "digitalRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};



Blockly.Arduino['arduino_sensor_readUltrasonicSensor'] = function (block) {
  var pin1 = block.getFieldValue('PIN1');
  var pin2 = block.getFieldValue('PIN2');
  //var pin2 = block.getFieldValue('PIN2');

  Blockly.Arduino.definitions_['definitions_ultra'] =
    'long getDistanceCm(int trig, int echo) {\n' +
    '  long duration;\n' +
    '  int distance;\n' +
    '  pinMode(trig, OUTPUT);\n' +
    '  pinMode(echo, INPUT);\n' +
    '  digitalWrite(trig, LOW);\n' +
    '  delayMicroseconds(2);\n' +
    '  digitalWrite(trig, HIGH);\n' +
    '  delayMicroseconds(10);\n' +
    '  digitalWrite(trig, LOW);\n' +
    '  duration = pulseIn(echo, HIGH);\n' +
    '  distance = duration * 0.034 / 2;\n' +
    '  delay(10);\n' +
    '  if (distance < 2 || distance > 250) {\n' +
    '    return false;\n' +
    '  }\n' +
    '  return distance;\n' +
    '}\n';

  var code = 'getDistanceCm(' + pin1 + ', ' + pin2 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['arduino_sensor_readLDRSensor'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '6';
  var code = "analogRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_sensor_readIRSensor'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';
  var code = "analogRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//THRESHOLD module cares 2.0.5
Blockly.Arduino['arduino_sensor_readThreshold'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';
  var code = "digitalRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_esp32AttachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = block.getFieldValue('MODE') || 'RISING';

  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);

  Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
    'void IRAM_ATTR ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';

  var code = 'attachInterrupt(' + arg0 + ', ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
  return code;
};

Blockly.Arduino['arduino_pin_esp32DetachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';

  var code = 'detachInterrupt(' + arg0 + ');\n';
  return code;
};
