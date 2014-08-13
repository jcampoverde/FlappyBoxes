//Intialize Phaser. Create a 400x490px game
var game = new Phaser.Game(400,490,Phaser.AUTO,'gameDiv');

//Create our 'main' state that will contain the game.
//This is the body of the game itself. It contains all relevant code.

var mainState = {

  preload: function(){
    //This function will execute at the beginning of the game
    //Here we'll load all of our assets (art, music, etd)
    
    game.stage.backgroundColor= "#71c5cf";
    
    game.load.image('bird','assets/bird.png');
    
    game.load.image('pipe','assets/pipe.png');
    
  },
  
  create: function(){
    //The create function is called right after the preload f(x)
    //This is where we'll set up the game assets from scratch
    
    //Starts our Physics Engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.bird=this.game.add.sprite(100,245,'bird');
   
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;
    
    //add Pipes to the game
    this.pipes = game.add.group();
    
    //Add the body to the game
    this.pipes.enableBody = true;
    
    //Create 20 pipes to hold in the group
    this.pipes.createMultiple(20, 'pipe');
    
    //Add in pipes over 1.5 seconds in the group
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    
    //When spacebar is pressed, make the bird jumo!
    var spacekey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);  
    
  },

  update: function() {
    //This function is called 60 times a second
    //This contains the games logic and all time related actions
    
    if(this.bird.inWorld === false) {
        this.restartGame();  
    }
    },

    jump.function() {
    //Let's add vertical velocity to the bird when the spacebar is pressed down
      this.bird.body.velocity.y = -350;
    },
    
     addOnePipe: function(x,y) {
    
    //Get the first dead pipe
  var pipe= this.pipes.getfirstDead();
  
  //Set x and y values of the pipe
  pipe.reset(x,y);
  
  //Move the pipes to the left of the screen
  pipe.body.velocity.x = -200;
  
  //Kill the pipe if it's off the screen at any point
  pipe.checkWorldBounds =  true; 
  pipe.outOfBoundsKill = true;
},
    
    
    addRowOfPipes: function() {
    var hole = Math.floor(Math.random() * 5 ) + 1;
    
    for(var i=0; i<8, i++)
    
    if(i !=hole && i != hole +1) {
      this.addOnePipe(400, i*60+10);
    }
    },
    
  
  restartGame: function() {
  game.state.start('main');
  }

};


//Add and start the gameState

game.state.add('main', mainState);
game.state.start('main');



