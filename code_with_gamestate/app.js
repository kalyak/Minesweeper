$(document).bind("contextmenu", function (e) { //disable right click menu pop up
    return false;
});

const BOMB = "B";
let message = "";
let noOfMines = 0;
const randomGrid = [];

const levels = {
    tutorial: [{
        noOfRows: 10,
        noOfCols: 10,
        noOfMines: 10
    }
    ],
    easy: [{
        noOfRows: 10,
        noOfCols: 10,
        noOfMines: 10
    }
    ],
    medium: [{
        noOfRows: 13,
        noOfCols: 16,
        noOfMines: 40
    }
    ],
    hard: [{
        noOfRows: 30,
        noOfCols: 16,
        noOfMines: 99
    }
    ]
}

const levelSelection = () => {
    const $selectedLevel = $('#levels option:selected').val();
    // console.log($selectedLevel);
    const noOfRows = levels[$selectedLevel][0]["noOfRows"];
    const noOfCols = levels[$selectedLevel][0]["noOfCols"];
    const noOfMines = levels[$selectedLevel][0]["noOfMines"];
    generateRandomField(noOfRows, noOfCols, noOfMines);

    if ($selectedLevel === "tutorial") {
        tutorialLevel();
    };
};

const tutorialLevel = () => {
    const $emptyCells = $('button:contains("0")');
    const $noOfEmptyCells = $emptyCells.length;
    const $hint = $emptyCells.eq(Math.floor(Math.random() * $noOfEmptyCells))
    $hint.click();
    console.log($($hint).attr('id'))
};

const generateRandomField = (noOfRows, noOfCols, noOfMines) => {

    gridGeneration(noOfRows, noOfCols); //generate empty array
    // console.log(randomGrid);

    const bombCoord = bombCoordGeneration(noOfRows, noOfCols, noOfMines); //generate coordinates for bombs
    // console.log(bombCoord);

    bombToGrid(bombCoord); //populate bomb location & add 1 to surrounding for every bomb
    // console.log(randomGrid);

    fieldGeneration(randomGrid); //generate field onscreen
    //console.log array
};

const gridGeneration = (noOfRows, noOfCols) => {
    // const randomGrid = [];
    for (let i = 0; i < noOfRows; i++) {
        const rowArray = [];
        const currentRow = ((i < 10) ? "0" : 0) + i;
        for (let j = 0; j < noOfCols; j++) {
            const currentCol = ((j < 10) ? "0" : 0) + j;
            rowArray.push({
                id: `row-${currentRow}_col-${currentCol}`,
                value: 0,
                state: "hidden"
            });
        };
        randomGrid.push(rowArray);
    };
    // return randomGrid;
};

const bombCoordGeneration = (noOfRows, noOfCols, noOfMines) => {
    const bombCoord = [];
    for (let i = 0; i < noOfMines; i++) {
        let newbomb = {
            row: Math.floor(Math.random() * noOfRows),
            col: Math.floor(Math.random() * noOfCols)
        }

        let j = 0; //to search from first existing coord
        while ((j !== i) && !((bombCoord[j].row === newbomb.row) && (bombCoord[j].col === newbomb.col))) {
            j++; //check next in existing array
        };

        if (j === i) { //no existing coord found
            bombCoord.push(newbomb);
            // console.log(`no repeat for ${l}`)
        } else { //existing coord found
            i--; //discard current coord and reduce count of successfully logged coords.
            // console.log("same as " + l);
        };

    };
    // console.log(bombCoord);
    return bombCoord;
};

const bombToGrid = (bombCoord = []) => {
    for (let i = 0; i < bombCoord.length; i++) {
        bombRow = bombCoord[i].row;
        bombCol = bombCoord[i].col;
        randomGrid[bombRow][bombCol]["value"] = BOMB;
    };
    numberToGrid(randomGrid, bombCoord);
};

const numberToGrid = (randomGrid = [], bombCoord = []) => {
    for (let i = 0; i < bombCoord.length; i++) {
        const bombRow = bombCoord[i].row;
        bombCol = bombCoord[i].col;
        rowAbove = bombRow - 1;
        rowBelow = bombRow + 1;
        colLeft = bombCol - 1;
        colRight = bombCol + 1;

        if ((bombCol !== 0) && (randomGrid[bombRow][colLeft]["value"] !== BOMB)) {//left
            randomGrid[bombRow][colLeft]["value"]++;
        };

        if ((bombCol !== randomGrid[0].length - 1) && (randomGrid[bombRow][colRight]["value"] !== BOMB)) {//right
            randomGrid[bombRow][colRight]["value"]++;
        };

        if (bombRow !== 0) { //top row
            if ((bombCol !== 0) && (randomGrid[rowAbove][colLeft]["value"] !== BOMB)) {//top left
                randomGrid[rowAbove][colLeft]["value"]++;
            };

            if ((bombCol !== randomGrid[0].length - 1) && (randomGrid[rowAbove][colRight]["value"] !== BOMB)) {//top right
                randomGrid[rowAbove][colRight]["value"]++;
            };
            if (randomGrid[rowAbove][bombCol]["value"] !== BOMB) {
                randomGrid[rowAbove][bombCol]["value"]++; //top center
            };
        };

        if (bombRow !== randomGrid.length - 1) { //bottom row
            if ((bombCol !== 0) && (randomGrid[rowBelow][colLeft]["value"] !== BOMB)) {//bottom left
                randomGrid[rowBelow][colLeft]["value"]++;
            };

            if ((bombCol !== randomGrid[0].length - 1) && (randomGrid[rowBelow][colRight]["value"] !== BOMB)) {//bottom right
                randomGrid[rowBelow][colRight]["value"]++;
            };
            if (randomGrid[rowBelow][bombCol]["value"] !== BOMB) {
                randomGrid[rowBelow][bombCol]["value"]++; //bottom center
            };
        };
    }
};

const fieldGeneration = (randomGrid) => {
    $('#level-select').hide();
    $('#scoreboard').show();
    // noOfMines = 0;
    for (let i = 0; i < randomGrid.length; i++) {
        message = "Left click to reveal cell, Right click to toggle flag on cell.";
        const $field = $('#field');
        const $row = $('<div>');
        const currentRow = randomGrid[i];
        const rowID = (i < 10) ? ("0" + i) : i;
        for (let j = 0; j < currentRow.length; j++) {
            const colID = (j < 10) ? ("0" + j) : j;
            const currentCell = currentRow[j];
            if (currentCell["value"] === BOMB) {
                noOfMines++;
            };
            const $col = $('<button>')
                .attr({
                    // 'id': `col-${j}`,
                    'id': currentCell["id"],
                    'class': "hidden"
                })
                .html(currentCell["value"])
                .on('click', clickCheck)
                .on('contextmenu', flag);
            $row.append($col);
        };
        $field.append($row);
    };
    $('#reset-trigger').show();
    render();
};

// const id =

///////////////////////functional codes below////////////////////////

const clickCheck = (event) => {
    // console.log("clickCheck start:");
    cellID = $(event.target).attr('id');
    if ($(event.target).attr('class') === "hidden") {
        const $clickVal = $(event.target).html();
        showButton(event, $clickVal);
        if ($clickVal === BOMB) {
            clickedBomb(event);
            // console.log("Bomb");
        } else if ($clickVal === "0") {
            openSurrounding(event);
        };
        checkWin();
    }
};

const checkWin = () => {
    $noOfHidden = $('.hidden').length;
    $noOfFlags = $('.flag').length;
    $noOfSuccessfulFlags = $(`.flag:contains(${BOMB})`).length;
    // console.log("Flags: " + $noOfFlags);
    // console.log("Successful flags: " + $noOfSuccessfulFlags);
    // console.log("No of mines: " + noOfMines);
    // console.log("No of hidden: " + $noOfHidden);
    if (($noOfHidden === noOfMines) || ($noOfFlags === $noOfSuccessfulFlags) && ($noOfSuccessfulFlags === noOfMines)) {
        disableField();
        message = ($noOfHidden === noOfMines) ?
            "Congratulations! You have successfully navigated this field." : "Congratulations! You have flagged all the mines!";
    }
    render();
};

const convertCoords = (event) => {
    const cellCoord = {
        row: parseInt($(event.target).attr('id').substr(4,2)),
        col: parseInt($(event.target).attr('id').substr(11,2))
    }
    // console.log(cellCoord);
    return cellCoord;
};

const openSurrounding = (event) => {
    const cellCoord = convertCoords(event); //get cell coord in object {row, col}
    const currentCol = cellCoord.col;
    const left = currentCol- 1;
    const right = currentCol+ 1;
    const currentRow = cellCoord.row;
    const above = currentRow - 1;
    const below = currentRow + 1;

    if (currentCol !== 0) { //if cell is not leftmost cell
        $(`#${randomGrid[currentRow][left]["id"]}`).click();
    };

    if (currentCol < (randomGrid[0].length - 1)) { //if cell is not rightmost cell
        $(`#${randomGrid[currentRow][right]["id"]}`).click();
    };

    if (currentRow !== 0) { //if cell is not in top row
        if (currentCol !== 0) {
            $(`#${randomGrid[above][left]["id"]}`).click();
        }

        if (currentCol < (randomGrid[0].length - 1)) {
            $(`#${randomGrid[above][right]["id"]}`).click();
        }

        $(`#${randomGrid[above][currentCol]["id"]}`).click();
    }

    if (currentRow < (randomGrid.length - 1)) { //if cell is not in bottom row
        if (currentCol !== 0) {
            $(`#${randomGrid[below][left]["id"]}`).click();
        }

        if (currentCol < (randomGrid[0].length - 1)) {
            $(`#${randomGrid[below][right]["id"]}`).click();
        }

        $(`#${randomGrid[below][currentCol]["id"]}`).click();
    }
};

const showButton = (event, $clickVal) => {
    $(event.target).attr('class', "shown");
    if ($clickVal === "0") {
        $(event.target).addClass("zero");
    }
    // console.log("button shown");
}

const disableField = () => {
    $('.shown').addClass("disabled");
    $('.hidden').addClass("disabled");
};

const clickedBomb = (event) => {
    $(event.target).addClass("clicked");
    disableField();
    $(`button:contains(${BOMB})`).addClass("bomb");
    $(`.flag:not(:contains(${BOMB}))`).addClass("wrong");
    // console.log(`bombs displayed`);
    message = "Game Over";
    render();
};

const flag = (event) => {
    // console.log("Right-clicked!")
    $(event.target).toggleClass("flag");
    // console.log(`flag added`);
    checkWin();
}

const render = () => {
    $('#message-box').html(message);
    const flagsLeft = $(`.hidden:contains(${BOMB})`).length - $('.flag').length + $('.wrong').length;
    $('#mines-left').html(flagsLeft);
};

const reset = () => {
    $('#field').empty();
    randomGrid.splice(0);
    // console.log(randomGrid);
    message = "Please select your level."
    noOfMines = 0;
    render();
    $('#levels').val("empty");
    $('#level-select').show();
    $('#scoreboard').hide();
    // $('#reset').hide();
    $('#reset-trigger').hide();
    $('.modal').hide();
};

const setUp = () => {
    $('#credits').hide();
    $('#scoreboard').hide();
    $('#level-select-btn').on('click', levelSelection);
    $('#reset-trigger').on('click', () => { $('.modal').show() });
    $('.close').on('click', () => { $('.modal').hide() });
    $('#reset-cfm').on('click', reset);
    message = "Please select your level below.";
    render();
};

$(() => {
    // levelSelection();
    // generateRandomArray();
    setUp();
    // render();
});


//level selection: dropdown selection => show grid size and number of bombs
//have changing status of all cells be in game state and render from there => lag?

//change button id to num, blank or bomb?
//render without number in html when hidden, only put in html when clicked => to prevent cheating by highlighting. // Done
//using navigations of siblings? // Done
//change for loop in bombCoordGeneration to while loop // Done
//change array.fill for gridGeneration // Done
//tutorial/easy mode open any blank. // Done
//have a confirmation for reset // Done