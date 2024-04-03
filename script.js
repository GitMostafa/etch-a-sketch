let colorPickerChoice;
let colorModeChoice;
let eraserModeChoice;
let colorUsed;
let gridSize = 16;

let pageContainer = document.querySelector(".page_container");


function buildGrid(pageContainer, size)
{
    let parentContainer = document.querySelector(".grid");
    pageContainer.removeChild(parentContainer);
    parentContainer = document.createElement("div");
    parentContainer.classList.add("grid");
    let rowHeight = 502 / size;

    for(let row = 0; row < size; row++)
    {
        let horizontalDiv = document.createElement("div");
        horizontalDiv.style.display = "flex";
        horizontalDiv.style.height = rowHeight + "px";
        for(let col = 0; col < size; col++)
        {
            let gridSquare = document.createElement("div");
            gridSquare.style.flex = "1";
            gridSquare.style.backgroundColor = "rgb(255, 255, 255)";
            gridSquare.style.borderStyle = "solid";
            gridSquare.style.borderWidth = "1px";
            gridSquare.style.borderColor = "rgb(40, 43, 43)";

            gridSquare.addEventListener("mouseover", (e) => {
                let targetSquare = e.target;
                if(!eraserModeChoice)
                {
                    if(targetSquare.style.backgroundColor != "rgb(255, 255, 255)")
                    {
                        colorUsed = targetSquare.style.backgroundColor;
                    }

                    else if(colorModeChoice)
                    {
                        colorUsed = colorPickerChoice;
                    }
                    else
                    {
                        colorUsed = "rgb(0, 0, 0)";
                    }
                }
                else
                {
                    colorUsed = "rgb(255, 255, 255)";
                }
        
                targetSquare.style.backgroundColor = colorUsed;
            });

            horizontalDiv.appendChild(gridSquare);
        }
        parentContainer.appendChild(horizontalDiv);
    }
    pageContainer.appendChild(parentContainer);
}

document.addEventListener("DOMContentLoaded", () => {
    let gridContainer = document.createElement("div");
    gridContainer.classList.add("grid");

    pageContainer.appendChild(gridContainer);

    buildGrid(pageContainer, gridSize);
});

let optionsContainer = document.querySelector(".options_bar");

let colorPicker = optionsContainer.querySelector("#color_choice");

colorPicker.addEventListener("mouseover", () => {
    colorPicker.style.scale = "1.15";
    colorPicker.style.transition = "0.2s ease";
    colorPicker.style.cursor = "pointer";
});

colorPicker.addEventListener("mouseout", () => {
    colorPicker.style.scale = "1";
    colorPicker.style.transition = "0.2s ease";
});

colorPicker.addEventListener("input", (e) => {
    colorPickerChoice = e.target.value;
});

let buttons = optionsContainer.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
        button.style.scale = "1.15";
        button.style.transition = "0.2s ease";
        button.style.cursor = "pointer";
    });

    button.addEventListener("mouseout", () => {
        button.style.scale = "1";
        button.style.transition = "0.2s ease";
    });
});

let colorButton = optionsContainer.querySelector(".color_mode");
colorButton.addEventListener("click", () => {
    eraserModeChoice = false;
    colorModeChoice = true;
});

let blackColorButton = optionsContainer.querySelector(".black_mode");
blackColorButton.addEventListener("click", () => {
    eraserModeChoice = false;
    colorModeChoice = false;
});

let eraserButton = optionsContainer.querySelector(".eraser");
eraserButton.addEventListener("click", () => {
    colorModeChoice = false;
    eraserModeChoice = true;
});

let clearButton = optionsContainer.querySelector(".clear");
clearButton.addEventListener("click", () => {
    eraserModeChoice = false;
    buildGrid(pageContainer, gridSize);
});

let sliderContainer = document.querySelector(".grid_size_slider");
let sliderLabel = sliderContainer.querySelector("label");
let slider = sliderContainer.querySelector("input");

slider.addEventListener("input", (e) => {
    let changedSlider = e.target;
    let sliderValueString = changedSlider.value + "x" + changedSlider.value;
    sliderLabel.textContent = "Grid Size: " + sliderValueString;
});

slider.addEventListener("change", (e) => {
    let changedSlider = e.target;
    gridSize = changedSlider.value;
    buildGrid(pageContainer, gridSize);
});