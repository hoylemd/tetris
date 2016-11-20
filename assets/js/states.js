var random_int = require('./utils.js').random_int;
var GameState = require('./game_state.js');
var GridElement = require('./grid_element.js');
var Block = require('./block.js');
var TextBlock = require('./textblock.js');
var Counter = require('./counter.js');

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

    // prepare spaces

    // create the playarea
    this.playarea = new Block(game.MARGIN, top,
                              game.PLAYAREA_COLUMNS,
                              game.PLAYAREA_ROWS);
    game.stage.addChild(this.playarea);
    game.game_objects.push(this.playarea);

    var backgrounds = new PIXI.Graphics();
    backgrounds.beginFill(game.PLAYAREA_COLOUR);
    backgrounds.lineStyle(2, game.PLAYAREA_BORDER_COLOUR, 1);

    // preview background
    backgrounds.drawRect(second_column * GridElement.WIDTH,
                         info_top * GridElement.HEIGHT,
                         game.PREVIEW_WIDTH * GridElement.WIDTH,
                         game.PREVIEW_HEIGHT * GridElement.HEIGHT);

    // score background
    backgrounds.drawRect(third_column * GridElement.WIDTH,
                         info_top * GridElement.HEIGHT,
                         game.SCORE_WIDTH * GridElement.WIDTH,
                         game.SCORE_HEIGHT * GridElement.HEIGHT);

    backgrounds.endFill();
    game.stage.addChild(backgrounds);

    // create the title
    var title = new TextBlock(game.TITLE_LEFT, game.MARGIN, 'TETRIS');
    game.stage.addChild(title);
    game.game_objects.push(title);

    // create the preview
    var preview_title = new TextBlock(second_column, top, 'NEXT');
    game.stage.addChild(preview_title);
    game.game_objects.push(preview_title);

    // create the score
    var score_title = new TextBlock(third_column + 1, top, 'SCORE');
    game.stage.addChild(score_title);
    game.game_objects.push(score_title);

    game.score_indicator = new Counter(third_column, info_top, 7);
    game.stage.addChild(game.score_indicator);
    game.game_objects.push(game.score_indicator);

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
