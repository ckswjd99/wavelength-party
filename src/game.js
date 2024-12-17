class Game {
    constructor() {
        this.wavelength = 0; // range from 0 to 1000
        this.pointer = 500; // range from 0 to 1000
        this.hidden = true;
        this.rbutton_down = false;
        this.lbutton_down = false;
        this.cardIdx = Math.floor(Math.random() * CARDS.length);
        this.card = CARDS[this.cardIdx];
        this.saltIdx = Math.floor(Math.random() * CODE_SALTS.length);
        this.salt = CODE_SALTS[this.saltIdx];

        this.reset();
    }

    reset() {
        this.randomizeWavelength();
        this.resetPointer();
        this.hidden = true;
        this.rbutton_down = false;
        this.lbutton_down = false;
        this.cardIdx = Math.floor(Math.random() * CARDS.length);
        this.card = CARDS[this.cardIdx];
        this.saltIdx = Math.floor(Math.random() * CODE_SALTS.length);
        this.salt = CODE_SALTS[this.saltIdx];
    }

    randomizeWavelength() {
        this.wavelength = Math.floor(Math.random() * 1000);
    }

    resetPointer() {
        this.pointer = 500;
    }

}

const encodeHint = () => {
    const cardIdx = GAME.cardIdx;
    const wavelength = GAME.wavelength;
    const saltIdx = GAME.saltIdx;
    const salt = GAME.salt;
    
    const hint = `${saltIdx}${(cardIdx + wavelength * 10) * salt}`;
    
    return hint;
}

const decodeHint = (hintNumber) => {
    // hint number is a number
    // hint number is not a string

    const hintString = hintNumber.toString();
    const saltIdx = parseInt(hintString[0]);
    const salt = CODE_SALTS[saltIdx];
    const hint = parseInt(hintString.slice(1));
    const cardIdx = Math.floor(hint / salt) % 10;
    const wavelength = Math.floor(Math.floor(hint / salt) / 10);

    console.log(`saltIdx: ${saltIdx}, salt: ${salt}, cardIdx: ${cardIdx}, wavelength: ${wavelength}`);

    GAME.card = CARDS[cardIdx];
    GAME.wavelength = wavelength;
    GAME.salt = salt;
    GAME.saltIdx = saltIdx;
}

const GAME = new Game();

let isShaking = false;
let shakeX = 0;
let shakeY = 0;


// event listeners: when key is pressed, change the state of the game
// right arrow key: increase pointer and rbutton_down
// left arrow key: decrease pointer and lbutton_down
// key 'r': reset the game

const keydown = (e) => {
    if (e.key === 'ArrowRight') {
        GAME.pointer = Math.min(1000, GAME.pointer + 1);
        GAME.rbutton_down = true;
    } else if (e.key === 'ArrowLeft') {
        GAME.pointer = Math.max(0, GAME.pointer - 1);
        GAME.lbutton_down = true;
    } else if (e.key === 'ArrowUp') {
        GAME.pointer = Math.min(1000, GAME.pointer + 10);
        GAME.rbutton_down = true;
    } else if (e.key === 'ArrowDown') {
        GAME.pointer = Math.max(0, GAME.pointer - 10);
        GAME.lbutton_down = true;
    } else if (e.key === 'r') {
        GAME.reset();
        isShaking = true;
    } else if (e.key === 'h') {
        GAME.hidden = false;
    }

}

const keyup = (e) => {
    if (e.key === 'ArrowRight') {
        GAME.rbutton_down = false;
    } else if (e.key === 'ArrowLeft') {
        GAME.lbutton_down = false;
    } else if (e.key === 'ArrowUp') {
        GAME.rbutton_down = false;
    } else if (e.key === 'ArrowDown') {
        GAME.lbutton_down = false;
    } else if (e.key === 'r') {
        isShaking = false;
    } else if (e.key === 'h') {
        GAME.hidden = true;
    }
}

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
