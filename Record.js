var controllerOptions = {};
var hand;
var rawXMin = 0;
var rawXMax = 350;
var rawYMin = 0;
var rawYMax = 600;
var previousNumHands = 0;
var currentNumHands = 0;
var oneFrameOfData = nj.zeros([6, 5, 4]);

function RecordData() {
	background(50)
	console.log(oneFrameOfData.toString())
}

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

function HandleBone(bone, fingerIndex) {
	var x1 = bone.nextJoint[0];
	var y1 = bone.nextJoint[1];
	var z1 = bone.nextJoint[2];
		
	var x2 = bone.prevJoint[0];
	var y2 = bone.prevJoint[1];
	var z2 = bone.prevJoint[2];

	[x1, y1] = TransformCoordinates(x1, y1);
	[x2, y2] = TransformCoordinates(x2, y2);
	
	if (currentNumHands == 1) {
		switch(bone.type) {
			case 0:
				strokeWeight(10);
				stroke(0, 220, 0);
				break;
			case 1:
				strokeWeight(7);
				stroke(0, 150, 0);
				break;
			case 2:
				strokeWeight(4);
				stroke(0, 100, 0);
				break;
			case 3:
				strokeWeight(2);
				stroke(0, 50, 0);
				break;
		}
	} else {
		switch(bone.type) {
			case 0:
				strokeWeight(10);
				stroke(220, 0, 0);
				break;
			case 1:
				strokeWeight(7);
				stroke(150, 0, 0);
				break;
			case 2:
				strokeWeight(4);
				stroke(100, 0, 0);
				break;
			case 3:
				strokeWeight(2);
				stroke(50, 0, 0);
				break;
		}
	}
	
	oneFrameOfData.set(0, fingerIndex, bone.type, x2);
	oneFrameOfData.set(1, fingerIndex, bone.type, y2);
	oneFrameOfData.set(2, fingerIndex, bone.type, z2);
	
	oneFrameOfData.set(3, fingerIndex, bone.type, x1);
	oneFrameOfData.set(4, fingerIndex, bone.type, y1);
	oneFrameOfData.set(5, fingerIndex, bone.type, z1);
	
	line(x1, window.innerHeight - y1, x2, window.innerHeight - y2);
}

function HandleHand(hand) {
	fingers = hand.fingers;
	bones = fingers.bones;
	
	for (var i = 3; i != -1; i--) {
		for (var j = 0; j < 5; j++) {
			HandleBone(fingers[j].bones[i], fingers[j].type);
		}
	}
}

function HandleFrame(frame) {
	if (frame.hands.length != 0) {
		hand = frame.hands[0];
		HandleHand(hand);
	}
}

Leap.loop(controllerOptions, function(frame) {
	currentNumHands = frame.hands.length;
	clear();
	
	HandleFrame(frame);	
	
	if (currentNumHands == 1 && previousNumHands == 2) {
		RecordData();
	}
	
	previousNumHands = frame.hands.length;
}
);