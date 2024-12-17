

// adaptive screen size setter for canvas
// get the screen size from #app div, then create maximum 4:3 canvas size
// check which side is longer, then set the canvas size to 4:3 ratio
const autoSizeCanvas = () => {
    const app = document.getElementById('app');
    const appWidth = app.clientWidth;
    const appHeight = app.clientHeight;
    
    let canvasWidth, canvasHeight;
    if (appWidth / appHeight > 4 / 3) {
        canvasWidth = appHeight * 4 / 3;
        canvasHeight = appHeight;
    } else {
        canvasWidth = appWidth;
        canvasHeight = appWidth * 3 / 4;
    }

    CANVAS.width = canvasWidth;
    CANVAS.height = canvasHeight;
    
    // fill canvas with white color
    CTX.fillStyle = 'white';
    CTX.fillRect(0, 0, canvasWidth, canvasHeight);

    renderBackground();

};

// on window resize, resize the canvas
window.onresize = autoSizeCanvas;
autoSizeCanvas();

