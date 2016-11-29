/* Class for regions that contain tetromino blocks */

var Block = require('./block.js');

function BlockSpace(column, row, columns, rows, seed, time_to_fall) {
  Block.call(this, column, row, columns, rows);

  this.seed = seed;
  this.time_to_fall = time_to_fall || null;

  this.blocks = [];
  this.block_matrix = [];
  for (var i = 0; i < columns; i += 1) {
    this.block_matrix.push([]);
    this.block_matrix[i][rows] = null;
  }

  this.add_tetromino = function BlockSpace_add_tetromino(tetromino) {
    this.addChild(tetromino);
    tetromino.updatePosition(this.seed.column, this.seed.row);
  };
}
BlockSpace.prototype = new Block(0, 0);

module.exports = BlockSpace;
