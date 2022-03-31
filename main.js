song1 = "";
song2 = "";
song1_status = "";
song2_status = "";

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
	scoreRightWrist = results[0].pose.keypoints[10].score;
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();
	fill("#FF0000");
	stroke("#FF0000");
	if(scoreRightWrist > 0.2){
		circle(rightWristX,rightWristY,20);
		song2.stop();
		if(song1_status == false){
			song1.play();
		}
	}
	if(scoreLeftWrist > 0.2){
		circle(leftWristX,leftWristY,20);
		song1.stop();
		if(song2_status == false){
			song2.play();
		}
	}
}
