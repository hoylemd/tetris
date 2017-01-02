/* Class for regions that contain tetromino blocks */

var Block = require('./block.js');
var is_numeric = require('./utils.js').is_numeric;

function BlockSpace(column, row, columns, rows, seed, time_to_fall) {
  Block.call(this, column, row, columns, rows);

  this.seed = seed;
  this.time_to_fall = time_to_fall || null;

  this.tetromino = null;
  this.block_matrix = [];
  for (var i = 0; i < columns; i += 1) {
    this.block_matrix.push(Array(rows).fill(null));
  }

  this.add_tetromino = function BlockSpace_add_tetromino(tetromino) {
    this.tetromino = tetromino;
    this.addChild(tetromino);
    tetromino.updatePosition(this.seed.column, this.seed.row);
  };

  this.add_block = function BlockSpace_add_block(block, column, row) {
    block.column = column;
    block.row = row;
    this.children.push(block);
    this.block_matrix[column][row] = block;
  };

  this.remove_block = function BlockSpace_remove_block(block_or_column, row) {
    var block = null;
    var column = null;
    if ((row || row === 0) && is_numeric(block_or_column)) {
      column = block_or_column;
      block = this.block_matrix[column][row];
    } else {
      block = block_or_column;
      column = block.column;
      row = block.row;
    }

    this.children.remove(block);
    this.block_matrix[column][row] = null;
  };
}
BlockSpace.prototype = new Block(0, 0);

module.exports = BlockSpace;
