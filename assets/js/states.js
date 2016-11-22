var random_int = require('./utils.js').random_int;
var GameState = require('./game_state.js');
var GridElement = require('./grid_element.js');
var Block = require('./block.js');
var TextBlock = require('./textblock.js');
var Counter = require('./counter.js');
var Tetromino = require('./tetromino.js');
var BlockSpace = require('./block_space.js');

// Global list of states
var all_states = {};

function LoadingAssetsState(game) {
  GameState.call(this, game);

  this.name = 'loading_assets';

  this.event_handlers = {};

  this.loading_started = false;
  this.loading_done = false;

  this.update =  function LoadingAssets_update(timedelta) {
    if (!this.loading_started) {
      console.log('Loading assets...');

      var that = this;
      var done_loading = function () {
        that.loading_done = true;
      };

      // Define Textures and Atlases to load here
      var textures = [];
      var texture_atlases = ['/static/sprites/trono.json'];
      // Done defining Textures and Atlases

      PIXI.loader.add(textures)
                 .add(texture_atlases)
                 .load(done_loading);
      this.loading_started = true;
    } else if (this.loading_done){
      console.log('done loading assets!');
      this.game.transition('initializing');
    } else {
      console.log('still loading...');
    }
  };
}
LoadingAssetsState.prototype = Object.create(GameState.prototype);
all_states.loading_assets = LoadingAssetsState;

function InitializingState(game) {
  GameState.call(this, game);

  this.name = 'initializing';

  this.event_handlers = {};

  this.update = function InitializingState_update(timedelta) {

    // calculate shorthand positions
    var top = game.MARGIN + game.TITLE_HEIGHT + game.MARGIN;
    var second_column = game.MARGIN + game.PLAYAREA_COLUMNS + game.MARGIN;
    var third_column = second_column + game.PREVIEW_WIDTH + game.MARGIN;
    var info_top = top + game.MARGIN + game.SCORE_TITLE_HEIGHT;

    // create the playarea
    var playarea = new BlockSpace(game.MARGIN, top,
                                  game.PLAYAREA_COLUMNS,
                                  game.PLAYAREA_ROWS,
                                  {column: 4, row: -1},
                                  game.INITIAL_TIME_TO_FALL);
    game.add_object(playarea);
    game.playarea = playarea;

    // preview area
    var preview_area = new BlockSpace(second_column, info_top,
                                      game.PREVIEW_WIDTH,
                                      game.PREVIEW_HEIGHT,
                                      {column: 1, row: 2});
    game.add_object(preview_area);
    game.preview_area = preview_area;

    // create the title
    var title = new TextBlock(game.TITLE_LEFT, game.MARGIN, 'TETRIS');
    game.add_object(title);

    // create the preview
    var preview_title = new TextBlock(second_column, top, 'NEXT');
    game.add_object(preview_title);

    // create the score
    var score_title = new TextBlock(third_column + 1, top, 'SCORE');
    game.add_object(score_title);

    game.score_indicator = new Counter(third_column, info_top, 7);
    game.add_object(game.score_indicator);

    // create the first 2 tetrominos
    var tetromino = new Tetromino();
    playarea.add_tetromino(tetromino);
    game.tetromino = tetromino;

    var next_tetromino = new Tetromino();
    preview_area.add_tetromino(next_tetromino);
    game.next_tetromino = next_tetromino;

    // start!
    game.log('Welcome to Tetris');
    game.transition('main');
  };
}
InitializingState.prototype = Object.create(GameState.prototype);
all_states.initializing = InitializingState;

function MainState(game) {
  GameState.call(this, game);

  this.name = 'main';

  function handle_log(object, args) {
    game.log(args.message);
  }

  this.event_handlers = {
    'log': handle_log,
  };

  this.update = function MainState_update(timedelta) {
    this.since += timedelta;
    if (game.score !== game.last_score) {
      game.score_indicator.value = game.score;
      game.last_score = game.score;
    }
  };
}
MainState.prototype = Object.create(GameState.prototype);
all_states.main = MainState;

function GameOverState(game) {
  GameState.call(this, game);

  this.name = 'game_over';

  game.log('You lost.');

  function handle_reset(object) {
    game.reset();
    game.transition('initializing');
  }

  this.event_handlers = {
    'reset': handle_reset
  };
}
GameOverState.prototype = Object.create(GameState.prototype);
all_states.game_over = GameOverState;
all_states.__initial__ = 'loading_assets';

module.exports = all_states;
