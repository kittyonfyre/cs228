var controllerOptions = {};
var x = 0;
var y = 0;
var z = 0;
var hand;
var rawXMin = 0;
var rawXMax = 350;
var rawYMin = 0;
var rawYMax = 600;

function HandleFinger(finger) {
	for (var i = 0; i < fingers.length; i++) {
		if (fingers[i].type == 1) {
			x = fingers[i].dipPosition[0];
			y = fingers[i].dipPosition[1];
			z = fingers[i].dipPosition[2];
			
			if (x < rawXMin) {
				rawXMin = x;
			}
			if (x > rawXMax) {
				rawXMax = x;
			}
			if (y < rawYMin) {
				rawYMin = y;
			}
			if (y > rawYMax) {
				rawYMax = y;
			}
			//console.log([rawXMin, rawXMax, rawYMin, rawYMax]);
		}
	}
}

function HandleHand(hand) {
	fingers = hand.fingers;
	HandleFinger(fingers);
}

function HandleFrame(frame) {
	if (frame.hands.length == 1) {
		hand = frame.hands[0];
		HandleHand(hand);
	}
}

Leap.loop(controllerOptions, function(frame) {
	clear();
	
	HandleFrame(frame);
	
	x = (((x - rawXMin) * (window.innerWidth)) / (rawXMax - rawXMin))
	y = (((y - rawYMin) * (window.innerHeight)) / (rawYMax - rawYMin))
	circle(x,window.innerHeight - y,50);
}
);