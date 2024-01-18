document.addEventListener("DOMContentLoaded", function () {
    var platno = document.getElementById("platno");
    var kontext = platno.getContext("2d");
    var stredKruhuX = 100;
    var stredKruhuY = 100;
    platno.onmousemove = function (event) {
        stredKruhuX = event.clientX;
        stredKruhuY = event.clientY;
    };
    function nakresli() {
        kontext.clearRect(0, 0, platno.width, platno.height);
        kontext.fillStyle = "blue";
        kontext.beginPath();
        kontext.arc(stredKruhuX, stredKruhuY, 50, 0, 2 * Math.PI);
        kontext.fill();
        kontext.fillStyle = "green";
        kontext.fillRect(100, 100, 100, 100);
        requestAnimationFrame(nakresli);
    }
    nakresli();
});