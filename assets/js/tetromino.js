/* Class for tetrominos */

var GridElement = require('./grid_element.js');
var random_int = require('./utils.js').random_int;

var tetromino_types = {
  'I': {
    'colour': 0x00CCCC,
    'border': 0x00AAAA,
    'shape': [[-1, 0], [1, 0], [2, 0]]},
  'O': {
    'colour': 0xCCCC00,
    'border': 0xAAAA00,
    'shape': [[0, 1], [1, 1], [0, 1]]},
  'T': {
    'colour': 0xAA00CC,
    'border': 0x8800AA,
    'shape': [[-1, 0], [1, 0], [0, 1]]},
  'S': {
    'colour': 0x00CC00,
    'border': 0x00AA00,
    'shape': [[-1, 0], [0, 1], [1, 1]]},
  'Z': {
    'colour': 0xCC0000,
    'border': 0xAA0000,
    'shape': [[-1, 1], [0, 1], [1, 0]]},
  'J': {
    'colour': 0x0000CC,
    'border': 0x0000AA,
    'shape': [[-1, 1], [-1, 0], [1, 0]]},
  'L': {
    'colour': 0xCCAA00,
    'border': 0xAA8800,
    'shape': [[-1, 0], [1, 0], [1, 1]]}
};
var type_list = Object.keys(tetromino_types);

function Tetromino(type) {
  this.type = type || type_list[random_int(type_list.length)];

  var spec = tetromino_types[this.type];

  if (!spec) {
    raise('Cannot inistantiate a Tetromino of type "' + this.type + '"');
  }

  this.rotation = 0;
  this.last_rotation = null;
  this.time_since_fall = 0;

  this.update = function Tetromino_update(timedelta) {
    if (this.parent && this.parent.time_to_fall) {
      var rotated_or_new = this.rotation !== this.last_rotation;
      var falling = this.time_since_fall > this.parent.time_to_fall;
    }
  };
}
Tetromino.prototype = new GridElement(0, 0);

module.exports = Tetromino;
