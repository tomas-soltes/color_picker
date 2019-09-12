const select = document.querySelector("select");
const body = document.querySelector("body");
const color_boxes = document.querySelectorAll(".color_boxes > div");
let harmony = "analogous";
let Input = document.querySelector("input");
let Option = document.querySelector("option");
let Color = Input.value;

createColors();

select.onchange = function () {
    harmony = select.value;
    hexToRGB(Input.value);
    document.querySelector("body").style.backgroundColor = Input.value;
}

Input.addEventListener("input", createColors, false);

function createColors() {
    hexToRGB(Input.value);
    document.querySelector("body").style.backgroundColor = Input.value;
}

function hexToRGB(h) {
    let r = 0,
        g = 0,
        b = 0;

    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];

    RGBToHSL(r, g, b);
    return +r + "," + +g + "," + +b;
}


function RGBToHSL(r, g, b) {

    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
    // Find greatest and smallest channel values
    let min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        h = 0,
        s = 0,
        l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (max == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (max == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (max + min) / 2;
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    harmonyDecider(h, s, l);
}

function harmonyDecider(h, s, l) {
    hBase = h;
    sBase = s;
    lBase = l;
    let x = 0;

    for (i = -2; i < 3; i++) {
        if (harmony == "analogous") {
            h = hBase + (20 * i);
        }
        if (harmony == "monochromatic") {
            l = lBase + 15 * i;
            l = Math.round(l * 100) / 100;
        }
        if (harmony == "triad") {
            h = hBase + (30 * i);
        }
        if (harmony == "complementary") {
            h = hBase + (60 * i);
        }
        if (harmony == "compound") {
            if (i < 0) {
                h = hBase + (60 * i);
            }
            if (i > 0) {
                h = hBase + (20 * i);
            }
        }
        if (harmony == "shades") {
            s = lBase + 20 * i;
        }

        console.log(color_boxes);
        color_boxes[x].style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
        color_boxes[2].style.backgroundColor = `hsl(${hBase},${sBase}%,${lBase}%)`;
        color_boxes[x].firstElementChild.lastElementChild.innerHTML = `${h},${s}%,${l}%`;
        let rgb = color_boxes[x].style.backgroundColor;
        color_boxes[x].firstElementChild.children[3].innerHTML = RGBNumbers(rgb);
        color_boxes[x].firstElementChild.children[1].innerHTML = RGBToHex(RGBNumbers(rgb));
        x++;
    }
}

function RGBNumbers(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
    return rgb;
}

function RGBToHex(rgb) {
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}