document.addEventListener("DOMContentLoaded", () => {
  const gradientTypeSelect = document.querySelector(".gradientSelect select");
  const directionSelectBoxes = document.querySelectorAll(".selectBox");
  const inputColors = document.querySelectorAll(".inputBox .inputs input");
  const gradientBox = document.querySelector(".gradient-Box");
  const textarea = document.querySelector(".text");
  const refreshButton = document.querySelector(".refresh");
  const copyButton = document.querySelector(".copy");

  // Function to set gradient
  const setGradient = () => {
    const gradientType = gradientTypeSelect.value;

    // Find the active direction dropdown
    const activeDirectionBox = Array.from(directionSelectBoxes).find(
      (box) => !box.classList.contains("hidden")
    );
    const selectedDirection = activeDirectionBox
      ? activeDirectionBox.querySelector("select").value
      : "";

    // Get colors
    const colors = Array.from(inputColors)
      .map((input) => input.value)
      .join(", ");

    // Generate gradient CSS
    let gradientCSS = "";
    if (gradientType === "linear-gradient") {
      gradientCSS = `${gradientType}(${selectedDirection}, ${colors})`;
    } else if (gradientType === "radial-gradient") {
      gradientCSS = `${gradientType}(circle at ${selectedDirection}, ${colors})`;
    } else if (gradientType === "conic-gradient") {
      gradientCSS = `${gradientType}(from ${selectedDirection}, ${colors})`;
    }

    // Apply gradient to box
    gradientBox.style.background = gradientCSS;

    // Update textarea
    textarea.value = `background: ${gradientCSS};`;
  };

  // Refresh colors with random values
  const refreshColors = () => {
    inputColors.forEach((input) => {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      input.value = randomColor;
    });
    setGradient();
  };

  // Copy gradient CSS to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(textarea.value).then(
      () => alert("Gradient CSS copied to clipboard!"),
      () => alert("Failed to copy gradient CSS.")
    );
  };

  // Enable/disable direction options based on gradient type
  const toggleDirectionOptions = () => {
    const selectedGradientType = gradientTypeSelect.value;

    directionSelectBoxes.forEach((box) => {
      const select = box.querySelector("select");
      const directionType = box.querySelector("p").innerText;

      if (
        (selectedGradientType === "linear-gradient" &&
          directionType.includes("Linear")) ||
        (selectedGradientType === "radial-gradient" &&
          directionType.includes("Radial")) ||
        (selectedGradientType === "conic-gradient" &&
          directionType.includes("Conic"))
      ) {
        box.classList.remove("hidden");
        select.disabled = false;
      } else {
        box.classList.add("hidden");
        select.disabled = true;
      }
    });
  };

  // Event listeners
  gradientTypeSelect.addEventListener("change", () => {
    toggleDirectionOptions();
    setGradient();
  });

  directionSelectBoxes.forEach((box) => {
    const select = box.querySelector("select");
    select.addEventListener("change", setGradient);
  });

  inputColors.forEach((input) => {
    input.addEventListener("input", setGradient);
  });

  refreshButton.addEventListener("click", refreshColors);
  copyButton.addEventListener("click", copyToClipboard);

  // Initialize
  toggleDirectionOptions();
  setGradient();
});
