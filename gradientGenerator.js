const gradientBox = document.querySelector(".gradient-Box");
const colorInputs = document.querySelectorAll(".inputs input");
const selectMenu = document.querySelector(".select select");
const text = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");
const getRandomColor = () => {
  //Generating a random color in hexadecimal format . eg: #5665E9
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${randomHex.padStart(6, "0")}`;
};
const generateGradient = (isRandom) => {
  if (isRandom) {
    // If isRandom is true , update the colors of inputs value with random color
    colorInputs[0].value = getRandomColor();
    colorInputs[1].value = getRandomColor();
  }
  //creating a gradient string using the color input values
  const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value}, ${colorInputs[1].value})`;
  gradientBox.style.background = gradient;
  text.value = `background : ${gradient}`;
};
const copyCode = () => {
  // Copying textarea value and updating the copy button text
  navigator.clipboard.writeText(text.value);
  copyBtn.innerText = "Code Copied";
  copyBtn.style.backgroundColor = "#4caf50";
  setTimeout(() => {
    copyBtn.innerText = "Copy Code";
    copyBtn.style.backgroundColor = "";
  }, 1200);
};
colorInputs.forEach((input) => {
  //calling generateGradient function on each color input clicks
  input.addEventListener("input", () => generateGradient(false));
});
selectMenu.addEventListener("change", () => generateGradient(false));
refreshBtn.addEventListener("click", () => generateGradient(true));
copyBtn.addEventListener("click", copyCode);
