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
loadSound("bing", "sounds/bing.mp3");
loadSound("blip", "sounds/blip.mp3");
loadSound("click", "sounds/click.mp3");
loadSound("score", "sounds/score.mp3");
loadSound("Scream", "sounds/Scream.mp3");
loadSound("buzzer", "sounds/buzzer.mp3");
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
const games = ["gButton", "gGive", "gClick", "gBasketball"]
const music = play("OtherworldlyFoe", {
  volume: 0.8,
  loop: true
})
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

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


// Game over screen --------------------------------------------------------------------
scene("gameOver", ()=>{
  bgmusic.stop()
  newsong.stop()
  music.stop()
  play("Scream")
  add([
    text("Game Over!", {
      font: "sinko",
      size: 40
    }),
    pos(width()/2,height()/2-100),
    origin("center"),
    color(255, 0, 0)
  ])
  add([
    text("Score: "+score, {
      font: "sinko",
      size: 40
    }),
    pos(width()/2,height()/2),
    origin("center"),
    color(255,255,0)
  ])
  const texte = add([
    text("Back to menu", {
      font: "sinko",
      size: 40
    }),
    pos(width()/2,height()/2+150),
    origin("center"),
    color(255, 0, 0),
    area()
  ])
  texte.onUpdate(() => {
		if (texte.isHovering()) {
			const t = time() * 10
			texte.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			texte.scale = vec2(1.2)
		} else {
			texte.scale = vec2(1)
			texte.color = rgb()
		}
    texte.onClick(() => {
      score = 0
      lives = 3
      gameOver = false
      bgmusic.stop()
      newsong.stop()
      music.stop()
      go("menu")
    })
	})
})

// Next level screen scene -------------------------------------------------------------
scene("Next", ()=>{
  if(lives < 1){
    go("gameOver")
  }
  bgmusic.stop()
  newsong.play()
  const random = Math.floor(Math.random() * games.length);
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
  add([
    text("Lives: " + lives, {
      font: "sinko",
      size: 40
    }),
    origin("center"),
    pos(width()/2, height()/2-50),
    color(rgb(255, 0, 0))
  ])
  if(firstround){
    if(lives == 3){
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
  if (!firstround){
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
  }
  firstround = false
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

const FLOOR_HEIGHT = 48
const JUMP_FORCE = 800
const SPEED = 480


// Runner game
scene("gRunner", () => {
  newsong.stop()
  music.stop()
  let timer = 6
  let done = false
  const displaytimer = add([
    text(timer,{
      font: "sinko",
      size: 70
    }),
    origin("center"),
    pos(width()/2, height()-134),
    color(rgb(255, 0, 0))
  ])
	gravity(1900)
	const player = add([
		sprite("Pumpkin"),
		pos(80, 40),
		area(),
		body(),
    scale(1.5, 1.5)
	])
	add([
		rect(width(), FLOOR_HEIGHT),
		outline(4),
		pos(0, height()),
		origin("botleft"),
		area(),
		solid(),
		color(127, 200, 255),
	])
  for(let i = 0; i < timer+1; i++){
    wait(i, () => {
      displaytimer.text = timer
      timer -= 1
    })
  }

	function jump() {
    play("score")
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
		}
	}
	onKeyPress(jump)
	onClick(jump)
	function spawnTree() {
		add([
			rect(48, rand(32, 96)),
			area(),
			outline(4),
			pos(width(), height() - FLOOR_HEIGHT),
			origin("botleft"),
			color(255, 180, 255),
			move(LEFT, SPEED),
			cleanup(),
			"tree",
		])
		wait(rand(0.5, 1.5), spawnTree)
	}
	spawnTree()
	player.onCollide("tree", () => {
    if(!done){
      burp()
      looseLive()
	  	go("Next")
    }
	})
  onUpdate(()=>{
    if(!done && timer < 0){
      add([
        text("You win!", {
          font: "sinko",
          size: 40
        }),
        color(rgb(0, 255, 0)),
        pos(width()/2, 20),
        origin("center")
      ])
      done = true
      play("bing")
      score += 100
      wait(3, ()=>{
        go("Next")
      })
    }
  })
})





// click game --------------------------------------------------------------------------
scene("gClick", ()=>{
  let timer = 10
  newsong.stop()
  music.stop()
  let index = 0
  
  for(let c = 0; c<25; c++){
    const hello1 = getRandom(150, width()-150)
    const hello2 = getRandom(150, height()-150)
    index++
    const pum = add([
      sprite("Pumpkin"),
      scale(3, 3),
      area(),
      pos(hello1, hello2)
    ])
    pum.onClick(()=>{
      index--
      destroy(pum)
      burp()
      debug.log(index)
    })
  }
  const displaytimer = add([
    text(timer,{
      font: "sinko",
      size: 70
    }),
    origin("center"),
    pos(width()/2, height()-134),
    color(rgb(255, 0, 0))
  ])
  
  const texttt = add([
    text("Click all pumpkins!", {
      font: "sinko",
      size: 40
    }),
    pos(width()/2, 60),
    origin("center")
  ])
  for(let i = 0; i < timer+1; i++){
    wait(i, () => {
      displaytimer.text = timer
      timer -= 1
      shake(timer+20)
    })
  }
  let done = false
  onUpdate(()=>{
    if(index == 0 && !done){
      texttt.text = "You win!"
      texttt.color = rgb(0, 255, 0)
      play("bing")
      done = true
      wait(3, ()=>{
        score += 110
        go("Next")
      })
    }
    if(timer < 0 && !done){
      texttt.text = "You loose!"
      texttt.color = rgb(255, 0, 0)
      play("Scream")
      done = true
      wait(3, ()=>{
        looseLive()
        go("Next")
      })
    }
  })
})




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
  add([
    text("*Big red button*", {
      font: "sinko",
      size: 20
    }),
    pos(width() / 2, height()/2+450),
    color(rgb(255, 0, 0)),
    origin("center")
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
  let disabled = false
  newsong.stop()
  music.stop()
  let timer = 5
  const displaytimer = add([
    text(timer,{
      font: "sinko",
      size: 70
    }),
    origin("center"),
    pos(width()/2, 40),
    color(rgb(255, 0, 0))
  ])
  add([
    text("drag and drop!", {
      font: "sinko",
      size: 30
    }),
    pos(width()/2, height()-50),
    origin("center")
  ])
  for(let i = 0; i < timer+1; i++){
    wait(i, () => {
      if(!disabled){
        displaytimer.text = timer
        timer -= 1
        shake(timer+20)
        if(i>4){
          looseLive()
          go("Next")
        }
      }
    })
  }
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
  			})
  		},
  		update() {
  			if (curDraggin === this) {
	  			cursor("move")
	  			this.moveTo(mousePos().sub(offset), 999)
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
    "apple",
    
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
    "holder",
    solid()
  ])
  const text21312 = add([
    text("What do you give em?", {
      font: "sinko",
      size: 30
    }),
    pos(width()/2, height()/2-250 - 80),
    origin("center")
  ])


  holder.onCollide("apple", ()=>{
    if(!disabled){
      play("buzzer")
      disabled = true
      const hi = add([
        sprite("Thumbs"),
        pos(width()/2, height()/2-250),
        area(),
        scale(1.2,1.2),
        origin("center")
      ])
      wait(3, ()=>{
        looseLive()
        go("Next")
      })
      text21312.text = "Apple?! Ehw!"
      
      hi.play("down")
    }
  })
  holder.onCollide("candy", ()=>{
    if(!disabled){
      play("bing")
      disabled = true
      const hi = add([
        sprite("Thumbs"),
        pos(width()/2, height()/2-250),
        area(),
        scale(1.2,1.2),
        origin("center")
      ])
      wait(3, ()=>{
        score += 100
        go("Next")
      })
      text21312.text = "Yummy!"
      
      hi.play("up")
    }
  })
  
  onUpdate(() => cursor("default"))
})

// Basketball game ---------------------------------------------------------------------
scene("gBasketball", () => {
  let timer2 = 5
  newsong.stop()
  const SPEED = 600
  const displaytimer = add([
    text(timer2,{
      font: "sinko",
      size: 70
    }),
    origin("center"),
    pos(width()/2, height()-75),
    color(rgb(255, 0, 0))
  ])
  let going = "right"
  music.stop()
  let hoop = add([
    sprite("hoop"),
    scale(4, 4),
    origin("center"),
    pos(width() / 2, 200),
    area(),
    "hoop"
  ])
  add([
    sprite("SpiderWeb"),
    pos(width()-120, 0),
    scale(2, 2)
  ])

  let pumpk = add([
    pos(width()/2, height()/2+50),
    sprite("Pumpkin"),
    scale(2, 2),
    origin("center"),
    area(),
    body()
  ])
  let rect123 = add([
    pos(width()/2, height()/2+150),
    rect(200, 40, {
      radius: 5
    }),
    origin("center"),
    area(),
    solid(),
    color(rgb(128, 87, 22))
  ])
  const textf = add([
    text("Click the anywhere!",{
      font: "sinko",
      size: 40
    }),
    pos(width()/2, 80),
    area(),
    origin("center")
  ])

  onClick(()=>{
    if(pumpk.isGrounded()){
      pumpk.jump(1300)
    }
  })
  onUpdate(()=>{
    if(timer2 < 1 && !done){
      done = true
      play("Scream")
      textf.text = "Try harder next time!"
      textf.color = (rgb(250, 0, 0))
      play("bing")
      done = true
      wait(5, ()=>{
        go("Next")
      })
    }
    if(hoop.pos.x > width()-200){
      going="left"
    }
    if(hoop.pos.x < 200){
      going="right"
    }
    if(going == "left"){
    	hoop.move(-SPEED, 0)
    }else{
      hoop.move(SPEED, 0)
    }
  })
  let done = false
  pumpk.onCollide("hoop", ()=>{
    textf.text = "You did it!"
    textf.color = (rgb(0, 255, 0))
    play("bing")
    done = true
    wait(5, ()=>{
      go("Next")
    })
  })

  for(let i = 0; i < timer2; i++){
    wait(i, () => {
      displaytimer.text = timer2
      timer2 -= 1
    })
    
  }
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
  // \n geht net 
  if (window.innerWidth < 850) {
    const text12 = add([
      text("Stop right there!\nYou need to play this game\nin a new tab!", {
        font: "sinko"
      }),
      pos(width() / 2, height()/2),
      origin("center"),
      scale(3, 3)
    ])
  } else {
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
  }
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
  BgRect.onClick(()=>{
    go("Next")
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
go("EnableAudio")