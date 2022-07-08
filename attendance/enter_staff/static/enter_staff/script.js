var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
window.addEventListener('resize', function(event) {
    changeScreen();
}, true);

changeScreen();

function changeScreen() {
    if (screen.width >= 768) {
        canvas.width = $('.momCanvas').width();
        canvas.height = canvas.width * 3 / 4;

        cWidth = canvas.width;
        cHeight = canvas.height;
        drawAvatarHorizontal(context, cWidth, cHeight);
    } else if (screen.width < 768 && screen.width >= 310) {
        canvas.height = screen.height / 2;
        canvas.width = screen.height / 2 * 3 / 4;

        cWidth = canvas.width;
        cHeight = canvas.height;
        drawAvatarVertical(context, cWidth, cHeight);
    } else {
        canvas.width = $('.momCanvas').width();
        canvas.height = canvas.width * 4 / 3;

        cWidth = canvas.width;
        cHeight = canvas.height;
        drawAvatarVertical(context, cWidth, cHeight);
    }

}

function drawAvatarHorizontal(context, cWidth, cHeight) {
    context.translate(cWidth / 2, cHeight / 2);
    context.beginPath();
    context.moveTo(cWidth * (120 - 320) / 640, cHeight * (640 - 250) / 480);
    context.quadraticCurveTo(cWidth * (120 - 320) / 640, cHeight * (410 - 250) / 480, cWidth * (210 - 320) / 640, cHeight * (400 - 250) / 480);
    context.quadraticCurveTo(cWidth * (280 - 320) / 640, cHeight * (390 - 250) / 480, cWidth * (280 - 320) / 640, cHeight * (360 - 250) / 480);
    context.quadraticCurveTo(cWidth * (280 - 320) / 640, cHeight * (350 - 250) / 480, cWidth * (245 - 320) / 640, cHeight * (310 - 250) / 480);
    context.quadraticCurveTo(cWidth * (200 - 320) / 640, cHeight * (245 - 250) / 480, cWidth * (240 - 320) / 640, cHeight * (165 - 250) / 480);
    context.quadraticCurveTo(cWidth * (265 - 320) / 640, cHeight * (125 - 250) / 480, cWidth * (320 - 320) / 640, cHeight * (120 - 250) / 480);
    context.quadraticCurveTo(cWidth * (375 - 320) / 640, cHeight * (125 - 250) / 480, cWidth * (400 - 320) / 640, cHeight * (165 - 250) / 480);
    context.quadraticCurveTo(cWidth * (440 - 320) / 640, cHeight * (245 - 250) / 480, cWidth * (395 - 320) / 640, cHeight * (310 - 250) / 480);
    context.quadraticCurveTo(cWidth * (360 - 320) / 640, cHeight * (350 - 250) / 480, cWidth * (360 - 320) / 640, cHeight * (360 - 250) / 480);
    context.quadraticCurveTo(cWidth * (360 - 320) / 640, cHeight * (390 - 250) / 480, cWidth * (430 - 320) / 640, cHeight * (400 - 250) / 480);
    context.quadraticCurveTo(cWidth * (520 - 320) / 640, cHeight * (410 - 250) / 480, cWidth * (520 - 320) / 640, cHeight * (640 - 250) / 480);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "red";
    context.setLineDash([0, 0]);
    context.stroke();

    context.strokeStyle = "white";
    context.lineWidth = 4;
    context.setLineDash([5, 15]);
    context.strokeRect(cWidth * -120 / 640, cHeight * -140 / 480, cWidth * 240 / 640, cHeight * 240 / 480);
}

function drawAvatarVertical(context, cWidth, cHeight) {
    context.translate(cWidth / 2, cHeight / 2);
    context.beginPath();
    context.moveTo(cWidth * (120 - 320) / 480, cHeight * (640 - 250) / 640);
    context.quadraticCurveTo(cWidth * (120 - 320) / 480, cHeight * (410 - 250) / 640, cWidth * (210 - 320) / 480, cHeight * (400 - 250) / 640);
    context.quadraticCurveTo(cWidth * (280 - 320) / 480, cHeight * (390 - 250) / 640, cWidth * (280 - 320) / 480, cHeight * (360 - 250) / 640);
    context.quadraticCurveTo(cWidth * (280 - 320) / 480, cHeight * (350 - 250) / 640, cWidth * (245 - 320) / 480, cHeight * (310 - 250) / 640);
    context.quadraticCurveTo(cWidth * (200 - 320) / 480, cHeight * (245 - 250) / 640, cWidth * (240 - 320) / 480, cHeight * (165 - 250) / 640);
    context.quadraticCurveTo(cWidth * (265 - 320) / 480, cHeight * (125 - 250) / 640, cWidth * (320 - 320) / 480, cHeight * (120 - 250) / 640);
    context.quadraticCurveTo(cWidth * (375 - 320) / 480, cHeight * (125 - 250) / 640, cWidth * (400 - 320) / 480, cHeight * (165 - 250) / 640);
    context.quadraticCurveTo(cWidth * (440 - 320) / 480, cHeight * (245 - 250) / 640, cWidth * (395 - 320) / 480, cHeight * (310 - 250) / 640);
    context.quadraticCurveTo(cWidth * (360 - 320) / 480, cHeight * (350 - 250) / 640, cWidth * (360 - 320) / 480, cHeight * (360 - 250) / 640);
    context.quadraticCurveTo(cWidth * (360 - 320) / 480, cHeight * (390 - 250) / 640, cWidth * (430 - 320) / 480, cHeight * (400 - 250) / 640);
    context.quadraticCurveTo(cWidth * (520 - 320) / 480, cHeight * (410 - 250) / 640, cWidth * (520 - 320) / 480, cHeight * (640 - 250) / 640);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "red";
    context.setLineDash([0, 0]);
    context.stroke();

    context.strokeStyle = "white";
    context.lineWidth = 4;
    context.setLineDash([5, 15]);
    context.strokeRect(cWidth * (-120) / 480, cHeight * (-140) / 640, cWidth * (240) / 480, cHeight * (240) / 640);
}