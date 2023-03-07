// Christian-Thomas Douglas De Guzman Johnson
// CSC 2463 Assignment 2.3
// Sound Synthesis and Sound Effects
let begin = true;
let pitch = 600;

let osc = new Tone.Oscillator("D4").start();
setInterval(() => 
{
	osc.partials = new Array(3).fill(0).map(() => Math.random());
}, 600);
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let amp = new Tone.AmplitudeEnvelope({
  attack: 0.7,
  decay: 0.5,
  sustain: 0.5,
  release: 0.3
}).connect(pan);
osc.connect(amp);

let noise = new Tone.Noise('brown').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.5,
  decay: 0.7,
  sustain: 0.5,
  release: 0.5
}).connect(gain);

let noiseFilter = new Tone.Filter(350, "lowpass").connect(noiseEnv);
noise.connect(noiseFilter);

let buttonPressed = false;
let bardImage;

let lfo = new Tone.LFO({
  type: "square ",
  min: pitch - 000,
  max: pitch + 200,
  frequency: 0.6
}).start();
lfo.connect(osc.frequency);

function preload() 
{
  bardImage = loadImage('media/Bard_Render.webp');
}

function setup() 
{
  createCanvas(600, 600);
}

function draw() 
{
  background(360);

  if ((frameCount % 60) === 0) 
  {
    pitch = 600;
  }

  if (buttonPressed) 
  {
    amp.triggerAttack();
    image(bardImage, 0, 0, width, height);
  } else 
  {
    amp.triggerRelease();
  }

  text('Press and hold any key to hear the chimes', 50, 50);
  textSize(25);
}

function keyPressed()
{
  if (keyCode === 32 && begin === true) 
  {
    console.log('key pressed');
    Tone.start();
    begin = false;
  }
  buttonPressed = true;
}

function keyReleased() 
{
  buttonPressed = false;
}