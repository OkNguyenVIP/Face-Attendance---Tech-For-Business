const video = document.getElementById("video");

const loadFaceAPI = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(weights);
}

function getCameraStream(enter) {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
                video: {}
            })
            .then(stream => {
                if (enter) {
                    video.srcObject = stream;
                } else {
                    video.srcObject = stop;
                }
            });
    }
}
var avatarColor = "red";

video.addEventListener('playing', () => {
            const canvas = faceapi.createCanvasFromMedia(video);
            document.body.append(canvas);
            const displaySize = {
                width: video.videoWidth,
                height: video.videoHeight
            }

            context = canvas.getContext("2d");
            context.translate(((displaySize.width - 640) / 2), ((displaySize.height - 480) / 2));
            avatarColor = "red";

            const interval2 = setInterval(function() {
                drawAvatar(context);
            }, 10);

            var isPaused = false;

            const interval = setInterval(async () => {
                    const detects = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
                    if (detects[0]._box._x > ((displaySize.width / 2) - 130) &&
                        detects[0]._box._x + detects[0]._box._width < ((displaySize.width / 2) - 130) + 260 &&
                        detects[0]._box._y > ((displaySize.height / 2) - 130) &&
                        detects[0]._box._y + detects[0]._box._height < ((displaySize.height / 2) - 130) + 260) {
                        if (!isPaused) {
                            isPaused = true;
                            var countdown = 3;
                            var position = 0;
                            avatarColor = "green";

                            const interval1 = setInterval(async () => {
                                    const detects1 = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
                                    if (detects1[0]._box._x > ((displaySize.width / 2) - 130) &&
                                        detects1[0]._box._x + detects1[0]._box._width < ((displaySize.width / 2) - 130) + 260 &&
                                        detects1[0]._box._y > ((displaySize.height / 2) - 130) &&
                                        detects1[0]._box._y + detects1[0]._box._height < ((displaySize.height / 2) - 130) + 260) {

                                        context.clearRect(0, 0, displaySize.width, displaySize.height);

                                        var data_post = '<form id="data_uri" action="' + mark_your_attendance + '" method="POST">';

                                        if (countdown >= 0) {
                                            context.fillStyle = "yellow";
                                            context.font = "260px Arial";
                                            context.fillText("" + countdown, 250, 320);
                                            context.beginPath();
                                            context.arc(320, 230, 120, 0 * Math.PI, 2 * Math.PI);
                                            context.lineWidth = 5;
                                            context.setLineDash([5, 9]);
                                            context.strokeStyle = "orange";

                                            context.shadowBlur = 15;
                                            context.shadowColor = "white";
                                            context.stroke();

                                            context.shadowBlur = 0;
                                        } else if (countdown == -1){
                                            context.lineWidth = 20;
                                            context.setLineDash([]);
                                            context.strokeStyle = "black";
                                            context.shadowBlur = 100;
                                            context.shadowColor = "white";
	                                        context.strokeRect(0, 0, displaySize.width, displaySize.height);

                                            context.shadowBlur = 0;
                                        }

                                        if (countdown <= -2) {
                                            while (position <= 0) {
                                                    Webcam.snap(function(data_uri) {
                                                        image = new Image();
                                                        image.src = data_uri;
                                                        image.unload = () => {
                                                            context.drawImage(image, 0, 0, displaySize.width, displaySize.height);
                                                        }

                                                        console.log("data_uri: ", data_uri);

                                                        data_post += '<input type="hidden" name="data_uri_' + position + '" value="' + data_uri + '">';
                                                        position++;

//                                                        console.log("position: ", position);
                                                    });
                                                }
                                                    data_post += '</form>';
                                                    document.getElementById("form").innerHTML = data_post;

                                                    clearInterval(interval2);
                                                    context.fillStyle = "yellow";
                                                    context.fillRect(0, 0, displaySize.width, displaySize.height);
                                                    context.fillStyle = "green";
                                                    context.font = "260px Arial";
                                                    context.fillText("OK", 110, 320);

                                                    document.getElementById("data_uri").submit();

                                                    clearInterval(interval1);
                                                    clearInterval(interval);
                                            }
                                        } else {
                                            countdown = 3;
                                            clearInterval(interval1);
                                            isPaused = false;
                                        }

                                        countdown--;
                                    }, 1000);
                            }
                        } else {
                            context.clearRect(0, 0, displaySize.width, displaySize.height);
                            avatarColor = "red";
                        }
                    }, 1000);
            });

        loadFaceAPI().then(getCameraStream(true));

        Webcam.set({
            width: 640,
            height: 480,
            image_format: 'jpeg',
            jpeg_quality: 90
        });

        Webcam.attach('#video');

        function drawAvatar(context) {
            context.beginPath();
            context.moveTo(120, 640);
            context.quadraticCurveTo(120, 410, 210, 400);
            context.quadraticCurveTo(280, 390, 280, 360);
            context.quadraticCurveTo(280, 350, 245, 310);
            context.quadraticCurveTo(200, 245, 240, 165);
            context.quadraticCurveTo(265, 125, 320, 120);
            context.quadraticCurveTo(375, 125, 400, 165);
            context.quadraticCurveTo(440, 245, 395, 310);
            context.quadraticCurveTo(360, 350, 360, 360);
            context.quadraticCurveTo(360, 390, 430, 400);
            context.quadraticCurveTo(520, 410, 520, 640);
            context.closePath();
            context.lineWidth = 5;
            context.strokeStyle = avatarColor;
            context.setLineDash([0, 0]);
            context.stroke();

            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.setLineDash([5, 15]);
            context.strokeRect(640 / 2 - 120, 480 / 2 - 130, 240, 240);
        }

        function resizeImage(base64Str, maxWidth = 640, maxHeight = 480) {
            return new Promise((resolve) => {
                let img = new Image()
                img.src = base64Str
                img.onload = () => {
                    let canvas = document.createElement('canvas')
                    const MAX_WIDTH = maxWidth
                    const MAX_HEIGHT = maxHeight
                    let width = img.width
                    let height = img.height

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width
                            width = MAX_WIDTH
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height
                            height = MAX_HEIGHT
                        }
                    }
                    canvas.width = width
                    canvas.height = height
                    let ctx = canvas.getContext('2d')
                    ctx.drawImage(img, 640 / 2 - 120, 480 / 2 - 130, 640 / 2 - 120 + 40, 480 / 2 - 130 + 140, 0, 0, 480, 480)
                    resolve(canvas.toDataURL())
                }
            })
        }