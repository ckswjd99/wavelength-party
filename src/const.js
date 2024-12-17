IMG_PATHS = {
    "background": "imgs/background_margined.png",
    "button_up": "imgs/button_up.png",
    "button_down": "imgs/button_down.png",
    "star00": "imgs/star00.png",
    "star01": "imgs/star01.png",
    "star02": "imgs/star02.png",
    "scale_reveal": "imgs/scale_reveal.png",
    "scale_hidden": "imgs/scale_hidden.png",
    "answer_range": "imgs/answer_range.png",
    "pointer": "imgs/pointer.png",
    "bulb_blue": "imgs/bulb_blue.png",
    "bulb_green1": "imgs/bulb_green1.png",
    "bulb_green2": "imgs/bulb_green2.png",
    "bulb_green3": "imgs/bulb_green3.png",
    "bulb_purple": "imgs/bulb_purple.png",
    "bulb_nothing": "imgs/bulb_nothing.png",
}

IMGS = {};

// make image objects
for (const key in IMG_PATHS) {
    const img = new Image();
    img.src = IMG_PATHS[key];
    IMGS[key] = img;
}

CANVAS = document.getElementById('canvas');
CTX = CANVAS.getContext('2d');
CTX.imageSmoothingEnabled = false;

RULE_CANV_WIDTH = 800;
RULE_CANV_HEIGHT = 600;

CARDS = [
    ["명작", "망작"],
    ["차가운", "뜨거운"],
    ["먹을 수 없는", "먹을 수 있는"],
    ["커다란", "작은"],
    ["무서운", "무섭지 않은"],
    ["상식", "전문지식"],
    ["사랑하는", "좋아하는"],
    ["좋은 데이트 장소", "나쁜 데이트 장소"],
    ["해가 있을 때 하는 것", "해가 없을 때 하는 것"],
    ["저속한", "고상한"],
    ["누구나 갖고 있는", "이걸 왜 갖고 있어?"],
    ["염소보다 센", "염소보다 약한"],
]

CODE_SALTS = [105, 365, 129, 847, 638, 485, 923, 293, 572, 748]

const ruleToPixel = (rule) => {
    // if rule is gien as 800, then return full width of canvas
    // if rule is given as 0, then return 0
    // if rule is given as 600, then return half width of canvas
    return rule / RULE_CANV_WIDTH * CANVAS.width;
}

const pixelToRule = (pixel) => {
    return pixel / CANVAS.width * RULE_CANV_WIDTH;
}