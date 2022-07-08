function enterA() {
    var isPaused = false;
    $('#exampleModalCenter').modal('show');

    const video = document.getElementById("video");

    var loadFaceAPI = async () => {
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
                    }
                    else {
                        video.srcObject = stop;
                    }
                });
        }
    }

    video.addEventListener('playing', () => {
        // Nếu "" là False, ngược lại "1" là True
        var is_mobile = "";
        if (video.videoHeight - video.videoWidth > 0) {
            is_mobile = "1";
        }

        const displaySize = {
            width: video.videoWidth,
            height: video.videoHeight
        }

        console.log("Pass 1", "OK");

        var modal_body = $('.modal-body').width();

        $('#video').css("width", (modal_body) + "px");
        $('#img').css("width", modal_body + "px");

        if (video.videoWidth - video.videoHeight > 0) {
            $('#video').css("height", (modal_body * 3 / 4) + "px");
            $('#img').css("height", (modal_body * 3 / 4) + "px");
            $('#img').attr("src", avatarRedPC);
        } else {
            $('#video').css("height", (modal_body * 4 / 3) + "px");
            $('#img').css("height", (modal_body * 4 / 3) + "px");
            $('#img').attr("src", avatarRedMobile);
        }

        var interval = setInterval(async () => {
            var position = 0;
            // var countdown = photoCountdown;
            var countdown = 0;


            console.log("Pass 2", "OK");

            const detects = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());

            // Webcam.attach('#video');

            if (detects[0] && !isPaused) {
                if (detects[0]?._box) {
                    if (detects[0]._box?._x && detects[0]._box?._y && detects[0]._box?._width && detects[0]._box?._height) {
                        if (detects[0]._box._x > ((displaySize.width / 2) - 130) &&
                            detects[0]._box._x + detects[0]._box._width < ((displaySize.width / 2) - 130) + 260 &&
                            detects[0]._box._y > ((displaySize.height / 2) - 130) &&
                            detects[0]._box._y + detects[0]._box._height < ((displaySize.height / 2) - 130) + 260) {

                            // Quan trọng
                            isPaused = true;

                            var data_post = '<form id="data_uri" action="' + savePhoto + '" method="POST">';

                            console.log("countdown:", countdown);

                            if (countdown == "3") {
                                if (video.videoWidth - video.videoHeight > 0) {
                                    $('#img').attr("src", avatarGreenPC3);
                                } else {
                                    $('#img').attr("src", avatarGreenMobile3);
                                }
                            } else if (countdown == "2") {
                                if (video.videoWidth - video.videoHeight > 0) {
                                    $('#img').attr("src", avatarGreenPC2);
                                } else {
                                    $('#img').attr("src", avatarGreenMobile2);
                                }
                            } else if (countdown == "1") {
                                if (video.videoWidth - video.videoHeight > 0) {
                                    $('#img').attr("src", avatarGreenPC1);
                                } else {
                                    $('#img').attr("src", avatarGreenMobile1);
                                }
                            } else if (countdown <= 0) {
                                while (position <= 20) {
                                    Webcam.snap(function (data_uri) {
                                        image = new Image();
                                        image.src = data_uri;

                                        console.log("Pass 3", "OK");

                                        data_post += '<input type="hidden" name="data_uri_' + position + '" value="' + data_uri + '">';

                                        console.log("position: ", position);
                                        position++;

                                        console.log("Pass 8", "OK");
                                    });
                                }

                                console.log("Pass 9", "OK");

                                data_post += '<input type="hidden" name="username" value="' + username + '">';

                                data_post += '<input type="hidden" name="is_mobile" value="' + is_mobile + '">';

                                data_post += '</form>';

                                document.getElementById("form").innerHTML = data_post;

                                document.getElementById("data_uri").submit();

                                console.log("Pass 10", "OK");

                                clearInterval(interval);
                            }

                            countdown--;
                        }
                    }
                } else {
                    countdown = photoCountdown;
                }
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
}

//#############################################################################################
//#############################################################################################
//#############################################################################################
//#############################################################################################
//#############################################################################################

function faceA() {
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
                    }
                    else {
                        video.srcObject = stop;
                    }
                });
        }
    }

    video.addEventListener('playing', () => {
        var isPaused = false;

        const displaySize = {
            width: video.videoWidth,
            height: video.videoHeight
        }

        // Nếu "" là False, ngược lại "1" là True
        var is_mobile = "";
        if (video.videoHeight - video.videoWidth > 0) {
            is_mobile = "1";
        }

        console.log("Pass 1", "OK");

        $('#img').attr("src", avatarRedPC);

        console.log("informationCountdown:", informationCountdown);

        sleepFor(informationCountdown * 1000);

        $('#fullname').val("");
        $('#number').val("");
        $('#times').val("");

        var countdown = photoCountdown * 1;
        var photoCountdownInt = photoCountdown * 1;

        var data_post = '<form id="data_uri" action="' + getPictures + '" method="POST">';

        if (photoCountdownInt == 0) {
            $('#img').attr("src", avatarYellowPC);
        }

        const interval = setInterval(async () => {
            const detects = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
            if (photoCountdownInt != 0) {
                if (detects[0] && !isPaused) {
                    if (detects[0]?._box) {
                        if (detects[0]._box?._x && detects[0]._box?._y && detects[0]._box?._width && detects[0]._box?._height) {
                            if (detects[0]._box._x > ((displaySize.width / 2) - 130) &&
                                detects[0]._box._x + detects[0]._box._width < ((displaySize.width / 2) - 130) + 260 &&
                                detects[0]._box._y > ((displaySize.height / 2) - 130) &&
                                detects[0]._box._y + detects[0]._box._height < ((displaySize.height / 2) - 130) + 260) {

                                if (countdown != 4) {
                                    console.log("countdown: ", countdown);
                                }
                                if (countdown == 3) {
                                    isPaused = true;
                                    $('#img').attr("src", avatarGreenPC3);
                                    if ($('#img').attr("src") == avatarGreenPC3) {
                                        isPaused = false;
                                    }
                                } else if (countdown == 2) {
                                    isPaused = true;
                                    $('#img').attr("src", avatarGreenPC2);
                                    if ($('#img').attr("src") == avatarGreenPC2) {
                                        isPaused = false;
                                    }
                                } else if (countdown == 1) {
                                    isPaused = true;
                                    $('#img').attr("src", avatarGreenPC1);
                                    if ($('#img').attr("src") == avatarGreenPC1) {
                                        isPaused = false;
                                    }
                                } else if (countdown <= 0) {
                                    // Quan trọng
                                    isPaused = true;
                                    
                                    $('#img').attr("src", avatarGreenPCS);

                                    console.log("Pass 3.0", "OK");

                                    Webcam.snap(function (data_uri) {
                                        image = new Image();
                                        image.src = data_uri;

                                        console.log("Pass 3", "OK");

                                        data_post += '<input type="hidden" name="data_uri" value="' + data_uri + '">';
                                    });

                                    data_post += '<input type="hidden" name="is_mobile" value="' + is_mobile + '">';
                                    data_post += '</form>';
                                    document.getElementById("form").innerHTML = data_post;

                                    document.getElementById("data_uri").submit();

                                    clearInterval(interval);
                                }
                                countdown--;
                            } else {
                                countdown = photoCountdown * 1;
                                $('#img').attr("src", avatarRedPC);
                            }
                        } else {
                            countdown = photoCountdown * 1;
                            $('#img').attr("src", avatarRedPC);
                        }
                    } else {
                        countdown = photoCountdown * 1;
                        $('#img').attr("src", avatarRedPC);
                    }
                } else {
                    countdown = photoCountdown * 1;
                    $('#img').attr("src", avatarRedPC);
                }
            } else if (!isPaused) {
                // Quan trọng
                isPaused = true;

                Webcam.snap(function (data_uri) {
                    image = new Image();
                    image.src = data_uri;

                    console.log("Pass 3", "OK");

                    data_post += '<input type="hidden" name="data_uri" value="' + data_uri + '">';
                });

                data_post += '<input type="hidden" name="is_mobile" value="' + is_mobile + '">';
                data_post += '</form>';
                document.getElementById("form").innerHTML = data_post;

                // $('#img').attr("src", avatarGreenPCS);

                document.getElementById("data_uri").submit();

                clearInterval(interval);
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

    function sleepFor(sleepDuration) {
        var now = new Date().getTime();
        while (new Date().getTime() < now + sleepDuration) {
            /* Do nothing */
        }
    }
}