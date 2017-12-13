//Richter Composition | Created by Briana Jones
//Maps out sound to visualize it by translating noise into words.
//using libraries p5 dom, sound, + speech

/*
Instructions:
Press any key except 1, 2, and 3 to start and stop recording:
while recording press 1, 2, and 3 to change which soundfile you're on and which to update.
Left and right arrow keys to pan soundfiles, and up and down arrow keys to control volume.
Press enter to clear all soundfiles + background and return it to "initial" mode.
Mouse clicked to map out sound.
*/

/*var soundF, recorder, mic, fft, peakDet; //create soundFile + attributes
var osc, ffft, fre, playing; //create osc wave + waveform + frequency
var dis1, dis2, dis3; //tracks soundFile to modify
var mappd = 0; //which dis you on
var mappi = 0; //whether on record or not
var mappb = 0; //start and stop button noise

var s; //the initial string

var button;//the button to accompany
var inp, button, inps; //the button to "sing"

var speekRec = new p5.SpeechRec('en-US', keyTyped); //set up Speech Recognition
speekRec.continuous = true;
speekRec.interimResults = true;

function setup(){
	createCanvas(1000, 1000);
    background(250);
	
	button = createButton('accompany'); //creates button to play osc waves
	button.position(width/2, height/2);
	button.mousePressed(soundBP);
	
	osc = new p5.TriOsc; //makes osc waves (tri)
	osc.amp(1);
	fftt = new p5.FFT();
	playing = false;
	
	inp = createInput(); //creates input to sing
    inp.position(20, 65);

    button = createButton('sing'); //button for submitting input
    button.position(inp.x + inp.width, 65);
    button.mousePressed(inpSing);
	
  speech = new p5.Speech(); //creates "song"
  speech.speak('Hey! Let us poetree with art. Press key to start recording.');
  
  dis1 = new Distort(); //keeps "track" of sounds (gives it properties)
	dis2 = new Distort();
	dis3 = new Distort();
  
  textSize(20);
	textAlign(CENTER);
  
  soundF = new p5.SoundFile(); //create soundFile and set up attributes
	fft = new p5.FFT();
  peakDet = new p5.PeakDetect();
  
	speekRec.start(); //starts speakRec
  
	mic = new p5.AudioIn(); //sets up mic to record
  mic.start();
  
  recorder = new p5.SoundRecorder(); //creates recorder
  recorder.setInput(mic); //connects recorder to mic
}

function draw(){
	fre = map(mouseX, 0, width, 20, 200); //maps out freq based on mouse position
	osc.freq(fre);
	
	var spect = fft.analyze(); //gets amplitude among freq
  var wave = fft.waveform(); //gets amplitude among time
	
	stroke('#ffee03'); //sets stroke to yellow
	if(playing == true){ //draws osc wave
    for(var i = 0; i < wave.length; i++){
      var x = map(i, 0, spect.length, 0, width);
      var h = -height + map(spect[i], 0, 400, height, 0);
   		ellipse(x*7, height, width/spect.length, h*3);
    }
  }
	
	if(mappd === 1){ //checks which dis and sends it to draw function
		dis1.draw(mappd);
	}
	else if(mappd === 2){
		dis2.draw(mappd);
	}
	else if(mappd === 3){
		dis3.draw(mappd);
	}
}

function keyTyped(){ //records based on keyTyped
  	if(mic.enabled && mappi == 0){ //checks if mic enabled and starts recording
      recorder.record(soundF); //begins recording over soundfile
	 		mappi++ //*recording
		}
		if(key === '1'){ //checks which key is pressed to know which dis it is on
				mappd = 1; //updates mappd
		}
		else if(key === '2'){ //dis2
				mappd = 2;
		}
		else if(key === '3'){ //dis3
				mappd = 3;
		}
		else{ //stops recording
			if(mappd === 1){ //checks which dis and sends it to update function
				dis1.update(soundF);
			}
			else if(mappd === 2){
				dis2.update(soundF);
			}
			else if(mappd === 3){
				dis3.update(soundF);
			}
			
			mappi = 0; //*not recording
			recorder.stop(); //stops recording
	 	}
	
	  if(speekRec.resultValue==true){ //takes speech recognition and makes it a string
			s = speekRec.resultString;
			//console.log(speekRec.resultString);
		}
}

function keyPressed(){ //tracks the arrow keys, keeps in mind which dis you on
	if (keyCode === LEFT_ARROW){ //pans soundfile to left
		if(mappd === 1){
			dis1.pan(-.2);
		}
		else if(mappd === 2){
			dis2.pan(-.2);
		}
		else if(mappd === 3){
			dis3.pan(-.2);
		}
  }
	if (keyCode === RIGHT_ARROW){ //pans soundfile to right
    if(mappd === 1){
			dis1.pan(.2);
		}
		else if(mappd === 2){
			dis2.pan(.2);
		}
		else if(mappd === 3){
			dis3.pan(.2);
		}
  }
	if (keyCode === UP_ARROW){ //increases volume
		if(mappd === 1){
			dis1.setVol(.2);
		}
		else if(mappd === 2){
			dis2.setVol(.2);
		}
		else if(mappd === 3){
			dis3.setVol(.2);
		}
  }
	if (keyCode === DOWN_ARROW){ //decreases volume
		if(mappd === 1){
			dis1.setVol(-.1);
		}
		else if(mappd === 2){
			dis2.setVol(-.1);
		}
		else if(mappd === 3){
			dis3.setVol(-.1);
		}
  }
	if (keyCode === ENTER){ //clears everything (restart)
    dis1.stop();
		dis2.stop();
		dis3.stop();
		mappd = 0;
		background(250);
  }
}

function mouseClicked(){ //plays sound
	if(mappd === 1){ //tracks which dis
		dis1.play(); //plays sound
		dis1.word(s); //send string s to be broken up
	}
	else if(mappd === 2){
		dis2.play();
		dis2.word(s);
	}
	else if(mappd === 3){
		dis3.play();
		dis3.word(s);
	}
}

function inpSing(){ //makes whatever inputed speak
	inps = inp.value();
	speech.speak(inps);
	inp.value(' ');
}

function soundBP(){ //function to play osc waves
	if(mappb === 0){
		osc.start();
		mappb++;
		playing = true;
	}
	else{
		osc.stop();
		mappb = 0;
		playing = false;
	}
}

class Distort{ //functions for soundF
  constructor(){
    this.soundF = new p5.SoundFile(); //sets the soundFile
		this.splitString = ""; //the recognized string from speech
		this.movX = 0; //position x
		this.movY = 0; //position y
		this.vol = .1; //volume level
		this.pann = 0; //panning position
		this.moX; //constrained movX
		this.moY; //constrained movY
  }

  update(soundS){
    this.soundS = new p5.SoundFile();
    this.soundF = soundS; //sets soundF to recieved soundF (soundS) from "main" class
  }
  
  play(){
    this.soundF.loop(); //loops sound
		this.movX = mouseX/200; //based on user position
		this.movY = mouseY/200; //based on user position
  }
	
	pan(p){
		if((p+this.pann) >= -1 && (p+this.pann) <= 1){ //pans
			this.pann = this.pann+p;
			this.soundF.pan(this.pann);
		}
	}

	stop(){
		this.soundF.stop(); //stops soundfile from being played
	}
	
	setVol(vo){
		this.soundF.setVolume(this.vol + vo); //sets Volume
	}
	
	word(st){
		this.splitString = split(st, " "); //splits string by word
	}
	
	draw(num){
		noStroke(); //gets rid of yellow stroke for words
		if(num === 1){ //changes the color of the text depending on which 'dis' it is
			fill(0, random(90), 0, random(90));
		}
		if(num === 2){
			fill(0, 0, random(90), random(90));
		}
		if(num === 3){
			fill(random(90), 0, 0, random(90));
		}
		
		if(this.splitString.length > 0){ //cycle through splitString
			for(var i = 0; i < this.splitString.length; i++){
				if(peakDet.isDetected) { //checks if there is a peak to increase text size
					textSize(random(30, 40));
				} 
				else{ //smaller text size
  				textSize(random(20, 30));
 				}
				
				//position code
				this.movX += mouseX/200 + random(-20, 20);
				this.movY += mouseY/200 + random(-20, 20);
				//constrains movX and movY to viewing window
				this.moX = constrain(this.movX, 0, width);
				this.moY = constrain(this.movY, 0, height);
				
				text(this.splitString[i], this.moX, this.moY); //creates text based on splitString and position
			}
		}
	}
}*/