const renderBackground = () => {
    const img_background = IMGS["background"];
    CTX.drawImage(img_background, ruleToPixel(-10+shakeX), ruleToPixel(-10+shakeY), ruleToPixel(820), ruleToPixel(620));
}

const renderButton = () => {
    const img_button_up = IMGS["button_up"];
    const img_button_down = IMGS["button_down"];

    // draw rbutton
    const rbutton_img = GAME.rbutton_down ? img_button_down : img_button_up;
    CTX.drawImage(rbutton_img, ruleToPixel(470+shakeX), ruleToPixel(350+shakeY), ruleToPixel(200), ruleToPixel(150));


    // draw lbutton
    const lbutton_img = GAME.lbutton_down ? img_button_down : img_button_up;
    CTX.save();
    CTX.scale(-1, 1);
    CTX.drawImage(lbutton_img, -ruleToPixel(330+shakeX), ruleToPixel(350+shakeY), ruleToPixel(200), ruleToPixel(150));
    CTX.restore();
}

const renderScale = () => {
    const img_scale_reveal = IMGS["scale_reveal"];
    const img_scale_hidden = IMGS["scale_hidden"];
    const img_answer_range = IMGS["answer_range"];

    const [scale_min_x, scale_max_x] = [125, 673-69];
    // if wavelength is 0, then the pointer should drawn at the scale_min_x - 35
    // if wavelength is 100, then the pointer should drawn at the scale_max_x - 35 - 70

    if (GAME.hidden) {
        CTX.drawImage(img_scale_hidden, ruleToPixel(120+shakeX), ruleToPixel(125+shakeY), ruleToPixel(560), ruleToPixel(168));
    } else {
        const answer_range_x = scale_min_x + (scale_max_x - scale_min_x) * GAME.wavelength / 1000;
        CTX.drawImage(img_answer_range, ruleToPixel(answer_range_x+shakeX), ruleToPixel(125+shakeY), ruleToPixel(70), ruleToPixel(168));
        CTX.drawImage(img_scale_reveal, ruleToPixel(120+shakeX), ruleToPixel(125+shakeY), ruleToPixel(560), ruleToPixel(168));
    }
}

const renderPointer = () => {
    const img_pointer = IMGS["pointer"];
    
    const [pointer_min_x, pointer_max_x] = [160-20, 679-40-20];
    const pointer_x = pointer_min_x + (pointer_max_x - pointer_min_x) * GAME.pointer / 1000;

    CTX.drawImage(img_pointer, ruleToPixel(pointer_x+shakeX), ruleToPixel(125+shakeY), ruleToPixel(40), ruleToPixel(168));
}

const renderBulb = () => {
    const img_bulb_blue = IMGS["bulb_blue"];
    const img_bulb_green1 = IMGS["bulb_green1"];
    const img_bulb_green2 = IMGS["bulb_green2"];
    const img_bulb_green3 = IMGS["bulb_green3"];
    const img_bulb_purple = IMGS["bulb_purple"];
    const img_bulb_nothing = IMGS["bulb_nothing"];

    range = 21;

    if (GAME.hidden) {
        CTX.drawImage(img_bulb_blue, ruleToPixel(350+shakeX), ruleToPixel(325+shakeY), ruleToPixel(100), ruleToPixel(60));
    } else {
        if (Math.abs(GAME.pointer - GAME.wavelength) < range/2) {
            CTX.drawImage(img_bulb_green1, ruleToPixel(350+shakeX), ruleToPixel(325+shakeY), ruleToPixel(100), ruleToPixel(60));
        } else if (Math.abs(GAME.pointer - GAME.wavelength) < range * 3/2) {
            CTX.drawImage(img_bulb_green2, ruleToPixel(350+shakeX), ruleToPixel(325+shakeY), ruleToPixel(100), ruleToPixel(60));
        } else if (Math.abs(GAME.pointer - GAME.wavelength) < range * 5/2) {
            CTX.drawImage(img_bulb_green3, ruleToPixel(350+shakeX), ruleToPixel(325+shakeY), ruleToPixel(100), ruleToPixel(60));
        } else if (Math.abs(GAME.pointer - GAME.wavelength) < range * 7/2) {
            CTX.drawImage(img_bulb_purple, ruleToPixel(350+shakeX), ruleToPixel(325+shakeY), ruleToPixel(100), ruleToPixel(60));
        } else {
            CTX.drawImage(img_bulb_nothing, ruleToPixel(350+shakeX), ruleToPixel(325+shakeY), ruleToPixel(100), ruleToPixel(60));
        }

    }
}

const renderCard = () => {
    const cardTextA = GAME.card[0];
    const cardTextB = GAME.card[1];
    // center the text, bold 30px white
    CTX.font = 'bold 30px Arial';
    CTX.textAlign = 'center';
    CTX.fillStyle = 'white';

    CTX.fillText(cardTextA, ruleToPixel(150), ruleToPixel(60));
    CTX.fillText(cardTextB, ruleToPixel(650), ruleToPixel(60));

}

const renderHint = () => {
    const hint = encodeHint();
    
    CTX.font = 'bold 20px Arial';
    CTX.fillStyle = 'black';
    CTX.fillText(hint, ruleToPixel(30), ruleToPixel(10));
}

const render = () => {
    // clear
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    if (isShaking) {
        shakeX = Math.random() * 10 + 5;
        shakeY = Math.random() * 10 + 5;
    } else {
        shakeX = 0;
        shakeY = 0;
    }
    renderBackground();
    renderButton();
    renderScale();
    renderPointer();
    renderBulb();

    if (!isShaking) {
        renderCard();
        renderHint();
    }

}

const loop = () => {
    render();
}

// for every 1/60 second, call loop function
setInterval(loop, 1000 / 60);