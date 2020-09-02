var controllerOptions = {};
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var hand;
Leap.loop(controllerOptions, function(frame) {
	//clear();
	//x = x + Math.floor(Math.random() * 3) - 1;
	//y = y + Math.floor(Math.random() * 3) - 1;
	//circle(x,y,50)
	
	if (frame.hands.length == 1) {
		hand = frame.hands[0];
		fingers = hand.fingers
		
		for (var i = 0; i < fingers.length; i++) {
			if (fingers[i].type == 1) {
				console.log(fingers[i])
			}
		}
	}
}
);