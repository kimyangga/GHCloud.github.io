// A shader variable
let theShader;
let cam;
let distortionVolume = 0; // Initial volume of distortion effect
let saturationValue = 1.0; // Initial saturation value
let hueValue = 0.0; // Initial hue value
let distortionValue2 = 0.0; // Initial value for second distortion slider

function preload() {
  // Load the shader
  theShader = loadShader('webcam.vert', 'webcam.frag');
}
 

function setup() {
  pixelDensity(1);
  // Set the canvas size to 800x800 pixels
  createCanvas(1200, 850, WEBGL);
  noStroke();

  // Adjust video output size
  const videoWidth = 1400; // Set the desired width of the video output
  const videoHeight = 900; // Set the desired height of the video output

  cam = createCapture(VIDEO);
  cam.size(videoWidth, videoHeight); // Set the size of the video capture element
  cam.hide();

  // Select all sliders
  const sliders = selectAll('.slider');

  // Loop through each slider
  for (let slider of sliders) {
    // Add event listener to update shader uniforms when slider value changes
    slider.input(updateShaderUniforms);
  }
}

function draw() {
  // Clear the background
  background(0);

  // Shader() sets the active shader with our shader
  shader(theShader);

  // Passing cam as a texture
  theShader.setUniform('tex0', cam);

  // Pass the distortion volume to the shader
  theShader.setUniform('distortionVolume', distortionVolume);

  // Pass the second distortion volume to the shader
  theShader.setUniform('distortionVolume2', distortionValue2);

  // Pass the saturation value to the shader
  theShader.setUniform('saturationValue', saturationValue);

  // Pass the hue value to the shader
  theShader.setUniform('hueValue', hueValue);

  // Draw a rounded rectangle to display the shader output
  const cornerRadius = 20; // Set the corner radius
  rect(-width / 2, -height / 2, width, height, cornerRadius);
}

// Function to update shader uniforms when slider value changes
function updateShaderUniforms() {
  // Update distortion volume
  distortionVolume = select('#distortionSlider').value();
  // Update second distortion volume
  distortionValue2 = select('#distortionSlider2').value();
  // Update saturation value
  saturationValue = select('#saturationSlider').value();
  // Update hue value
  hueValue = select('#hueSlider').value();
}


function windowResized() {
  resizeCanvas(1000, 800); // Resize the canvas to 800x800 pixels
}

// Function to update distortion volume when distortion slider value changes
function updateDistortionVolume() {
  distortionVolume = distortionSlider.value();
}

// Function to update second distortion volume when second distortion slider value changes
function updateDistortionVolume2() {
  distortionValue2 = distortionSlider2.value();
}

// Function to update saturation value when saturation slider value changes
function updateSaturationValue() {
  saturationValue = saturationSlider.value();
}

// Function to update hue value when hue slider value changes
function updateHueValue() {
  hueValue = hueSlider.value();
}


document.addEventListener("mousemove", function(event) {
  const tooltip = document.querySelector(".tooltip-text");
  const offsetX = 200; // Adjust as needed
  const offsetY = -350; // Adjust as needed
  tooltip.style.left = event.pageX + offsetX + "px";
  tooltip.style.top = event.pageY + offsetY + "px";
});


document.addEventListener("mousemove", function(event) {
    const tooltip = document.querySelector(".tooltip-text");
    
    // Check if the viewport width is 430px or less
    const isSmallScreen = window.innerWidth <= 430;

    // Set offset values based on screen size
    const offsetX = isSmallScreen = -300; // Smaller offset for small screens
    const offsetY = isSmallScreen =  0; // Smaller offset for small screens

    tooltip.style.left = event.pageX + offsetX + "px";
    tooltip.style.top = event.pageY + offsetY + "px";
});
