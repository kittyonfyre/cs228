var controllerOptions = {};
//var x1 = 0;
//var y1 = 0;
//var z1 = 0;
var hand;
var rawXMin = 0;
var rawXMax = 350;
var rawYMin = 0;
var rawYMax = 600;

function TransformCoordinates(x,y) {
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
	
	x = (((x - rawXMin) * (window.innerWidth)) / (rawXMax - rawXMin));
	y = (((y - rawYMin) * (window.innerHeight))/ (rawYMax - rawYMin));
	
	return [x,y];
}

function HandleBone(bone) {
	x1 = bone.nextJoint[0];
	y1 = bone.nextJoint[1];
		
	x2 = bone.prevJoint[0];
	y2 = bone.prevJoint[1];

	[x1, y1] = TransformCoordinates(x1, y1);
	[x2, y2] = TransformCoordinates(x2, y2);
	
	//jank time
	switch(bone.type) {
		case 0:
			strokeWeight(10);
			stroke(50);
			break;
		case 1:
			strokeWeight(7);
			stroke(100);
			break;
		case 2:
			strokeWeight(4);
			stroke(150);
			break;
		case 3:
			strokeWeight(2);
			stroke(200);
			break;
	}
		
	line(x1, window.innerHeight - y1, x2, window.innerHeight - y2);
}

function HandleHand(hand) {
	fingers = hand.fingers;
	bones = fingers.bones;
	
	for (var i = 3; i != -1; i--) {
		for (var j = 0; j < 5; j++) {
			HandleBone(fingers[j].bones[i]);
		}
	}
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
	
	
}
);