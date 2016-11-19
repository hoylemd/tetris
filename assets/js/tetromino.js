/* Class for tetrominos */

var Block = require('./block.js');

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
}

function Tetromino(column, row, type) {

}
Tetromino.prototype = Block(0, 0);

module.exports = Tetromino;
