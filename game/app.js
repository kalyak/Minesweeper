$(document).bind("contextmenu", function (e) { //disable right click menu pop up
    return false;
});

const BOMB = "B";
let message = "";
let noOfMines = 0;
const randomGrid = [];

const levels = {
    tutorial: {
        "Tutorial": {
            noOfRows: 10,
            noOfCols: 10,
            noOfMines: 10
        }
    },
    easy: {
        "8 x 8": {
            noOfRows: 8,
            noOfCols: 8,
            noOfMines: 10
        },
        "9 x 9": {
            noOfRows: 9,
            noOfCols: 9,
            noOfMines: 10
        },
        "10 x 10": {
            noOfRows: 10,
            noOfCols: 10,
            noOfMines: 10
        }
    },
    medium: {
        "13 x 15": {
            noOfRows: 13,
            noOfCols: 15,
            noOfMines: 40
        }
        ,
        "16 x 16": {
            noOfRows: 16,
            noOfCols: 16,
            noOfMines: 40
        }
    },
    hard: {
        "30 x 16": {
            noOfRows: 30,
            noOfCols: 16,
            noOfMines: 99
        }
    }
}

const gridOptions = () => {
    const $gridDropDown = $('#grid-size');
    $gridDropDown.empty();
    const $selectLevel = $('#levels option:selected').val();
    const gridSize = levels[$selectLevel]
    const gridList = Object.keys(gridSize);
    for (key of gridList) {
        $gridDropDown.append($('<option>')
            .attr('value', key)
            .html(key));
    };

    ($selectLevel === "tutorial") ? $('#hint').hide() : $('#hint').show();

};

const levelSelection = () => {
    const $selectLevel = $('#levels option:selected').val();
    const $selectedGrid = $('#grid-size option:selected').val();
    const $selectedHint = $('#hint option:selected').val();
    // console.log($selectedLevel);
    const noOfRows = levels[$selectLevel][$selectedGrid]["noOfRows"];
    const noOfCols = levels[$selectLevel][$selectedGrid]["noOfCols"];
    const noOfMines = levels[$selectLevel][$selectedGrid]["noOfMines"];
    generateRandomField(noOfRows, noOfCols, noOfMines, randomGrid);

    if ($selectedGrid === "tutorial" || $selectedHint === "yes") {
        tutorialLevel();
    };
};

const tutorialLevel = () => {
    const $emptyCells = $('button:contains("0")');
    const $noOfEmptyCells = $emptyCells.length;
    $emptyCells.eq(Math.floor(Math.random() * $noOfEmptyCells)).click();
};

const generateRandomField = (noOfRows, noOfCols, noOfMines, randomGrid) => {

    gridGeneration(noOfRows, noOfCols, randomGrid); //generate empty array
    // console.log(randomGrid);

    const bombCoord = bombCoordGeneration(noOfRows, noOfCols, noOfMines); //generate coordinates for bombs
    // console.log(bombCoord);

    bombToGrid(randomGrid, bombCoord); //populate bomb location & add 1 to surrounding for every bomb
    // console.log(randomGrid);

    fieldGeneration(randomGrid); //generate field onscreen
    //console.log array
};

const gridGeneration = (noOfRows, noOfCols, randomGrid) => {
    for (let i = 0; i < noOfRows; i++) {
        let newRow = new Array(noOfCols).fill(0);
        randomGrid.push(newRow);
    };
    // console.log(randomGrid);
    return randomGrid;
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

const bombToGrid = (randomGrid = [], bombCoord = []) => {
    for (let i = 0; i < bombCoord.length; i++) {
        bombRow = bombCoord[i].row;
        bombCol = bombCoord[i].col;
        randomGrid[bombRow][bombCol] = BOMB;
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

        if ((bombCol !== 0) && (randomGrid[bombRow][colLeft] !== BOMB)) {//left
            randomGrid[bombRow][colLeft]++;
        };

        if ((bombCol !== randomGrid[0].length - 1) && (randomGrid[bombRow][colRight] !== BOMB)) {//right
            randomGrid[bombRow][colRight]++;
        };

        if (bombRow !== 0) { //top row
            if ((bombCol !== 0) && (randomGrid[rowAbove][colLeft] !== BOMB)) {//top left
                randomGrid[rowAbove][colLeft]++;
            };

            if ((bombCol !== randomGrid[0].length - 1) && (randomGrid[rowAbove][colRight] !== BOMB)) {//top right
                randomGrid[rowAbove][colRight]++;
            };
            if (randomGrid[rowAbove][bombCol] !== BOMB) {
                randomGrid[rowAbove][bombCol]++; //top center
            };
        };

        if (bombRow !== randomGrid.length - 1) { //bottom row
            if ((bombCol !== 0) && (randomGrid[rowBelow][colLeft] !== BOMB)) {//bottom left
                randomGrid[rowBelow][colLeft]++;
            };

            if ((bombCol !== randomGrid[0].length - 1) && (randomGrid[rowBelow][colRight] !== BOMB)) {//bottom right
                randomGrid[rowBelow][colRight]++;
            };
            if (randomGrid[rowBelow][bombCol] !== BOMB) {
                randomGrid[rowBelow][bombCol]++; //bottom center
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
        const currentRow = randomGrid[i];
        const $field = $('#field');
        const $row = $('<div>').attr('id', "row-" + i);
        for (let j = 0; j < currentRow.length; j++) {
            const currentCell = currentRow[j];
            if (currentCell === BOMB) {
                noOfMines++;
            };
            const $col = $('<button>')
                .attr({
                    'id': "col-" + j,
                    'class': "hidden"
                })
                .html(currentCell)
                .on('click', clickCheck)
                .on('contextmenu', flag);
            $row.append($col);
        };
        $field.append($row);
    };
    $('#reset-trigger').show();
    render();
};


///////////////////////functional codes below////////////////////////

const clickCheck = (event) => {
    // console.log("clickCheck start:");
    // console.log($(event.target));
    if ($(event.target).attr('class') === "hidden") {
        const $clickVal = $(event.target).html();
        showButton(event, $clickVal);
        // disableButton(event);
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
        row: parseInt($(event.target).parent().attr('id').split("-").pop()),
        col: parseInt($(event.target).attr('id').split("-").pop())
    }
    return cellCoord;
};

const openSurrounding = (event) => {
    // console.log(randomGrid);
    const cellCoord = convertCoords(event); //get cell coord in object {row, col}
    const currentCol = cellCoord.col;
    const left = currentCol - 1;
    const right = currentCol + 1;
    const currentRow = cellCoord.row;
    const above = currentRow - 1;
    const below = currentRow + 1;
    if (currentCol !== 0) { //if cell is not leftmost cell
        $(`#row-${currentRow}>#col-${left}`).click(); //left cell click
    };

    if (currentCol < (randomGrid[0].length - 1)) { //if cell is not rightmost cell
        $(`#row-${currentRow}>#col-${right}`).click(); //right cell click
    };

    if (currentRow !== 0) { //if cell is not in top row
        if (currentCol !== 0) {
            $(`#row-${above}>#col-${left}`).click(); //above left cell click
        }

        if (currentCol < (randomGrid[0].length - 1)) {
            $(`#row-${above}>#col-${right}`).click(); //above right cell click
        }

        $(`#row-${above}>#col-${currentCol}`).click(); //above center cell click
    }

    if (currentRow < (randomGrid.length - 1)) { //if cell is not in bottom row
        if (currentCol !== 0) {
            $(`#row-${below}>#col-${left}`).click(); //below left cell click
        }

        if (currentCol < (randomGrid[0].length - 1)) {
            $(`#row-${below}>#col-${right}`).click(); //below right cell click
        }

        $(`#row-${below}>#col-${currentCol}`).click(); //below center cell click
    }

};

const disableButton = (event) => {
    $(event.target).addClass("disabled");
    // console.log("button disabled");
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
};

const classicTheme = () => {
    $('body').toggleClass("classic");
    $bodyClass = $('body').attr('class');
    $('#theme-status').html($bodyClass === "classic" ? "on" : "off");
};

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
    // $('#levels').val("empty");
    $('#level-select').show();
    $('#scoreboard').hide();
    $('#reset-trigger').hide();
    $('.modal').hide();
};

const setUp = () => {
    $('#reset-trigger').on('click', () => { $('.modal').show() });
    $('.close').on('click', () => { $('.modal').hide() });
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