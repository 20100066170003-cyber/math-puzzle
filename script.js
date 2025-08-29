let puzzleData = [];
let level = 1;
let solution = [];

document.getElementById("easy-btn").addEventListener("click", () => {
    level = 1;
    generatePuzzle(level);
});

document.getElementById("hard-btn").addEventListener("click", () => {
    level = 2;
    generatePuzzle(level);
});

function generatePuzzle(level) {
    let numRange = level === 1 ? [1, 10] : [10, 20];
    puzzleData = [];
    solution = [];

    // Generate puzzle and solution
    for (let i = 0; i < 4; i++) {
        const randNum = Math.floor(Math.random() * (numRange[1] - numRange[0] + 1)) + numRange[0];
        puzzleData.push(randNum);
        solution.push(randNum);
    }

    // Shuffle solution numbers for the drag-and-drop container
    solution = shuffle(solution);

    // Clear previous puzzle
    document.getElementById("puzzle-board").innerHTML = '';
    document.getElementById("numbers-container").innerHTML = '';

    // Create puzzle slots (empty boxes)
    puzzleData.forEach(() => {
        const slot = document.createElement("div");
        slot.setAttribute("class", "empty-slot");
        slot.setAttribute("id", "slot");
        slot.setAttribute("ondrop", "drop(event)");
        slot.setAttribute("ondragover", "allowDrop(event)");
        document.getElementById("puzzle-board").appendChild(slot);
    });

    // Create draggable number boxes
    solution.forEach((num, idx) => {
        const numberBox = document.createElement("div");
        numberBox.setAttribute("draggable", "true");
        numberBox.setAttribute("id", `number-${num}`);
        numberBox.setAttribute("ondragstart", `drag(event, ${num})`);
        numberBox.textContent = num;
        document.getElementById("numbers-container").appendChild(numberBox);
    });

    // Reset message
    document.getElementById("message").textContent = "Drag and drop numbers to solve the puzzle!";
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, num) {
    ev.dataTransfer.setData("number", num);
}

function drop(ev) {
    ev.preventDefault();
    const num = ev.dataTransfer.getData("number");

    const targetSlot = ev.target;
    if (!targetSlot.textContent) {
        targetSlot.textContent = num;
        checkSolution();
    }
}

function checkSolution() {
    const slots = document.querySelectorAll("#puzzle-board .empty-slot");
    let filled = true;
    let isCorrect = true;

    slots.forEach((slot, index) => {
        if (slot.textContent == "") {
            filled = false;
        }
        if (parseInt(slot.textContent) !== puzzleData[index]) {
            isCorrect = false;
        }
    });

    if (filled && isCorrect) {
        document.getElementById("message").textContent = "Congratulations! You've solved the puzzle!";
    } else if (filled) {
        document.getElementById("message").textContent = "Try again! Some numbers are wrong.";
    }
}

