let Input = document.querySelector("input");
let Color = Input.value;

Input.addEventListener("input", function () {
    document.querySelector(".value_hex").innerHTML = Input.value;
    document.querySelector(".value_rgb").innerHTML = hexToRGB(Input.value);
    document.querySelector("body").style.backgroundColor = Input.value;
}, false);


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
  let min = Math.min(r,g,b),
      max = Math.max(r,g,b),
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

  document.querySelector(".value_hsl").innerHTML = h + "," + s + "%," + l + "%";
}