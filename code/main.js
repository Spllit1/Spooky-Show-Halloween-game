//
//                              ~ HALLOWEEN GAME ~
//                A dumb game made by @Spllit. Im new to Kaboom.js,
//                    thats why this code is so ugly. Anyways,
//                           What are you doing here?
//

import kaboom from "kaboom"
let game = kaboom({
  background: [194, 117, 16]
})



// load assets -----------------------------------------------------------------------
// Sprites
loadSprite("bean", "sprites/bean.png");
loadSprite("mark", "sprites/mark.png");
loadSprite("Apple", "sprites/Apple.png");
loadSprite("ghosty", "sprites/ghosty.png");
loadSprite("SpiderWeb", "sprites/SpiderWeb.png");
loadSprite("Pumpkinholder", "sprites/Pumpkinholder.png");

loadPedit("Msg", "sprites/Msg.pedit");
loadPedit("Pumpkin", "sprites/Pumpkin.pedit");
loadPedit("CandyCorn", "sprites/CandyCorn.pedit");
loadPedit("hoop", "sprites/basketball hoop.pedit");

// Sounds
loadSound("hit", "sounds/hit.mp3");
loadSound("New", "sounds/New.mp3");
loadSound("blip", "sounds/blip.mp3");
loadSound("click", "sounds/click.mp3");
loadSound("score", "sounds/score.mp3");
loadSound("Scream", "sounds/Scream.mp3");
loadSound("bgmusic", "sounds/bgmusic.mp3");
loadSound("OtherworldlyFoe", "sounds/OtherworldlyFoe.mp3");


// Animations
loadSprite("Thumbs", "sprites/Thumbs.png", {
   sliceX: 2,
   sliceY: 1,
   anims: {
   up: {
       from: 0,
       to: 0,
   },
   down: {
       from: 1,
       to: 1,
   },
  },
});

// Puplic variables --------------------------------------------------------------------
const games = ["gButton", "gGive", "gBasketball"]
const music = play("OtherworldlyFoe", {
  volume: 0.8,
  loop: true
})
const newsong = play("New", {
  volume: 0.8,
  loop: true
})
const bgmusic = play("bgmusic", {
  volume: 0.3,
  loop: true
})

firstround = true

let Version = "0.1.0"
let lives = 3
let score = 0
let gameOver = false

// Next level screen scene -------------------------------------------------------------
scene("Next", ()=>{
  bgmusic.stop()
  newsong.play()
  
  const random = Math.floor(Math.random() * games.length);

  // displaying score
  add([
    sprite("SpiderWeb"),
    pos(width()-150, 0),
    scale(4, 4)
  ])
  add([
    sprite("ghosty"),
    pos(width()/2, height()/2+200 ),
    origin("center")
  ])
  add([
    text("Score: " + score, {
      font: "sinko",
      size: 40
    }),
    origin("center"),
    pos(width()/2, height()/2-100),
    color(rgb(232, 226, 49))
  ])
  // displaying lives
  add([
    text("Lives: " + lives, {
      font: "sinko",
      size: 40
    }),
    origin("center"),
    pos(width()/2, height()/2-50),
    color(rgb(255, 0, 0))
  ])
  // adding "splash" text
  if(!firstround){
    if(lives == 2){
      add([
        text("You better play it safe!", {
          font: "sinko",
          size: 40
        }),
        origin("center"),
        pos(width()/2, height()/2+100),
        color(rgb(245, 155, 10))
      ])
    } else if(lives == 1){
        add([
          text("This might be your last round!", {
            font: "sinko",
            size: 40
          }),
          origin("center"),
          pos(width()/2, height()/2+100),
          color(rgb(245, 24, 0))
        ])
    } else if(lives == 3){
        add([
          text("Your doing... alright!", {
            font: "sinko",
            size: 40
          }),
          origin("center"),
          pos(width()/2, height()/2+100),
          color(rgb(36, 145, 47))
        ])
    }
  } else {
    if(lives == 2){
      add([
          text("It was your first round...", {
            font: "sinko",
            size: 40
          }),
          origin("center"),
          pos(width()/2, height()/2+100),
          color(rgb(36, 145, 47))
      ])
    } else{
      add([
          text("Starter luck...", {
            font: "sinko",
            size: 40
          }),
          origin("center"),
          pos(width()/2, height()/2+100),
          color(rgb(36, 145, 47))
      ])
    }
  }
  wait(8, ()=>{
    newsong.stop()
    bgmusic.play()
    go(games[random])
  })
})



// Loose live function -----------------------------------------------------------------
function looseLive(){	
  if(lives > 0){
    lives -= 1
    go("Next")
  } else{
    gameOver = true
  }
}




// Button game -------------------------------------------------------------------------
scene("gButton", ()=>{
  newsong.stop()
  let tdead = false
  let timer = 16
  music.stop()
  
  const displaytimer = add([
    text(timer,{
      font: "sinko",
      size: 70
    }),
    origin("center"),
    pos(width()/2, 40),
    color(rgb(255, 0, 0))
  ])
  let big = add([
    rect(400, 400),
    pos(width() / 2 - 2, height()/2),
    origin("center"),
    outline(4),
    area(),
    color(rgb(117, 117, 117)),
    solid(),
    "btn"
  ])
  const small = add([
    rect(250, 250),
    pos(width() / 2 + 3, height()/2),
    origin("center"),
    outline(4),
    color(rgb(255, 0, 0)),
    fixed(),
    area()
  ])
  small.onUpdate(() => {
    if (small.isHovering()) {
      const t = time() * 10
      small.color = rgb(110, 0, 20)
    } else {
      small.scale = vec2(1)
      small.color = rgb(207, 0, 38)
    }
  })
  small.onClick(()=>{
    play("click")
    play("Scream")
    tdead = true
    const mytext = add([
      text("That was the 'Loose live' button!", {
        font: "sinko",
        size: 40
      }),
      origin("center"),
      pos(width()/2, height()/2-100),
      area()
    ])
    add([
      sprite("mark"),
      scale(4, 4),
      pos(mytext.pos.x, mytext.pos.y + 100),
      area(),
      origin("center")
    ])
    wait(5, ()=>{
      looseLive()
      go("Next")
    })
  })
  for(let i = -1; i < timer; i++){
    wait(i, () => {
      displaytimer.text = timer
      timer -= 1
      shake(timer+20)
      if(i > 14 && !tdead){
        score += 100
        go("Next")
      }
    })
  }
})











// Give game game ----------------------------------------------------------------------
scene("gGive", ()=>{
  music.stop()
  let curDraggin = null
  function drag() {
  	let offset = vec2(0)
  	return {
  		id: "drag",
  		require: [ "pos", "area", ],
  		add() {
  			this.onClick(() => {
  				if (curDraggin) {
  					return
  				}
  				curDraggin = this
  				offset = mousePos().sub(this.pos)
  				readd(this)
  			})
  		},
  		update() {
  			if (curDraggin === this) {
  				this.pos = mousePos().sub(offset)
          
  			}
        
  		},
  	}
  }
  onMouseRelease(() => {
  	curDraggin = null
  })
  

  const apple = add([
    sprite("Apple"),
    area(),
    pos(width()/2-200, height()/2+300),
    scale(3, 3),
    drag(),
    origin("center"),
    "apple"
  ])
  const candy = add([
    sprite("CandyCorn"),
    area(),
    pos(width()/2+200, height()/2+300),
    scale(3, 3),
    drag(),
    origin("center"),
    "candy"
  ])
  const holder = add([
    sprite("Pumpkinholder"),
    area(),
    pos(width()/2, height()/2),
    scale(4, 4),
    origin("center"),
    "holder"
  ])
  
  

})

// Basketball game ---------------------------------------------------------------------
scene("gBasketball", () => {
  const SPEED = 600
  
  let going = "right"
  music.stop()
  let hoop = add([
    sprite("hoop"),
    scale(4, 4),
    origin("center"),
    pos(width() / 2, 200),
    area()
  ])
  add([
    sprite("SpiderWeb"),
    pos(width()-120, 20),
    scale(2, 2)
  ])

  let pumpk = add([
    pos(width()/2, 700),
    sprite("Pumpkin"),
    scale(3, 3),
    origin("center"),
    area(),
    body()
  ])
  add([
    text("Click the anywhere!",{
      font: "sinko",
      size: 30
    }),
    pos(width()/2, 20),
    area(),
    origin("center")
  ])

  onClick(()=>{
    addKaboom(mousePos())
  })
  onUpdate(()=>{
    if(hoop.pos.x > width()-500){
      going="left"
    }
    if(hoop.pos.x < 500){
      going="right"
    }
    if(going == "left"){
    	hoop.move(-SPEED, 0)
    }else{
      hoop.move(SPEED, 0)
    }
  })
})




// How to play scene -------------------------------------------------------------------
scene("howtp", () => {
  const Text123 = add([
    text("Version "+Version, {
      font: "sinko"
    }),
    pos(width()/2, 20),
    origin("center"),
    outline(4),
    area(),
    fixed(),
    scale(2,2)
  ])
  
  // Define the dialogue data
  const dialogs = [
    ["bean", "You play many minigames..."],
    ["bean", "But dont be too slow!"],
    ["bean", "or you will loose a live..."],
    ["bean", "You 'only' have 3 lives,"],
    ["bean", "when you win an minigame:"],
    ["bean", "You get points"],
    ["bean", "BUT theres one important rule:"],
    ["bean", "Have fun ;D"],
  ]
  let curDialog = 0
  const textbox = add([
    rect(width() - 200, 120, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 100),
    outline(2),
  ])
  const txt1 = add([
    text("Press SPACE to continue...", {
      size: 32,
      width: width() - 230,
      font: "sinko",
      transform: (idx, ch) => ({
        color: hsl2rgb((time() * 0.5 + idx * 0.5) % 1, 0.7, 0.8)
      })
    }),
    pos(width() / 2, height() / 2 - 220),
    origin("center")
  ])
  const txt = add([
    text("", {
      size: 32,
      width: width() - 230,
      font: "sinko"
    }),
    pos(textbox.pos),
    origin("center")
  ])
  const avatar = add([
    sprite("ghosty"),
    scale(3),
    origin("center"),
    pos(center().sub(0, 50))
  ])
  onKeyPress("space", () => {
    curDialog = (curDialog + 1)
    if (curDialog === dialogs.length) {
      go("menu")
    } else {
      updateDialog()
    }
  })
  function updateDialog() {
    const [char, dialog] = dialogs[curDialog]
    txt.text = dialog
  }
  updateDialog()
})



// Scene to enable audio --------------------------------------------------------------
scene("EnableAudio", () => {
  bgmusic.stop()
  newsong.stop()
  music.stop()
  

  const text12 = add([
    text("Click anywhere to enable spookynes!", {
      font: "sinko"
    }),
    pos(width() / 2),
    origin("center"),
    scale(3, 3)
  ])
  const Text123 = add([
    text("Version "+Version, {
      font: "sinko"
    }),
    pos(width()/2, 20),
    origin("center"),
    outline(4),
    area(),
    fixed(),
    scale(2,2)
  ])
  const ghosthere = add([
    sprite("ghosty"),
    pos(text12.pos.x, text12.pos.y + 70),
    origin("center")
  ])
  camPos(text12.pos)
  onClick(() => {
    burp()
    go("menu")
  })
  
})



// Menu scene --------------------------------------------------------------------------
scene("menu", () => {
  let done = false
  let notplaying = true
  // adding som things to the screen
  const Text123 = add([
    text("Version "+Version, {
      font: "sinko"
    }),
    pos(width()/2, 20),
    origin("center"),
    outline(4),
    area(),
    fixed(),
    scale(2,2)
  ])
  
  const text1 = add([
    text("Menu", {
      font: "sinko",
      size: 50
    }),
    color(rgb(227, 66, 85)),
    area(),
    body(),
    pos(center()),
    origin("center")
  ])
  const GhostTeller = add([
    pos(width() - 70, 4000),
    origin("center"),
    sprite("ghosty"),
    outline(4),
    area(),
    solid()
  ])
  const telmsg = add([
    pos(width() - 130, 3875),
    origin("center"),
    scale(2, 2),
    sprite("Msg"),
    outline(4),
    area(),
    solid()
  ])
  const StupidPumpkin = add([
    pos(100, 4260),
    rotate(390),
    origin("center"),
    sprite("Pumpkin"),
    outline(4),
    scale(13, 13),
    area()
  ])
  let BgRect = add([
    rect(160, 50),
    pos(width() / 2 - 2, 4170),
    origin("center"),
    outline(4),
    area(),
    color(rgb(70, 74, 189)),
    solid(),
    "btn"
  ])
  const playbtn = add([
    text("Play!", {
      font: "sinko"
    }),
    pos(width() / 2 + 3, 4170),
    origin("center"),
    outline(4),
    area(),
    color(rgb(222, 59, 27)),
    solid(),
    scale(4, 4)
  ])
  let BgRect2 = add([
    rect(400, 50),
    pos(width() / 2 - 2, 4100),
    origin("center"),
    outline(4),
    area(),
    color(rgb(15, 115, 38)),
    solid(),
    "btn"
  ])
  const howtobtn = add([
    text("How to play", {
      font: "sinko"
    }),
    pos(width() / 2 + 3, 4100),
    origin("center"),
    outline(4),
    area(),
    color(rgb(255, 202, 117)),
    solid(),
    scale(4, 4)
  ])
  BgRect2.onClick(() => {
    go("howtp")
  })
  BgRect2.onUpdate(() => {
    if (BgRect2.isHovering()) {
      const t = time() * 10
      BgRect2.color = rgb(14, 64, 15)
    } else {
      BgRect2.scale = vec2(1)
      BgRect2.color = rgb(15, 115, 38)
    }
  })
  BgRect.onUpdate(() => {
    if (BgRect.isHovering()) {
      const t = time() * 10
      BgRect.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4),
      )
    } else {
      BgRect.scale = vec2(1)
      BgRect.color = rgb(70, 74, 189)
    }
  })
  // making some things here you know...
  onUpdate(() => {
    let something = Math.floor(Math.random() * 100000);
    if (something < 150) {
      StupidPumpkin.play("Blink", {
        loop: false
      })
    }
    camPos(text1.pos)
    if (text1.pos.y > 3950 && done == false) {
      music.play()
      play("hit", {
        volume: 10,
        loop: false
      })
      shake(300)
      StupidPumpkin.play("Blink", {
        loop: false
      })
      done = true
    }
    if (done && notplaying) {
    }
  })
})




// Start the game ----------------------------------------------------------------------
go("gButton")