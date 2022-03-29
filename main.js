song1 = "";
song2 = "";

function preload()
{
	song1 = loadSound("Dynamite.mp3");
	song2 = loadSound("Butter.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(500, 300);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

	scoreLeftWrist = results[0].pose.keypoints[9].score;

		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");
	if(scoreLeftWrist >0.2){
		circle(leftWristX,leftWristY,20);
		number = Number(leftWristY);
		removeD = floor(number);
		volume = removeD/500;
		document.getElementById("volume").innerHTML = "volume = "+ volume;
		song.setVolume(volume);
	}

}
