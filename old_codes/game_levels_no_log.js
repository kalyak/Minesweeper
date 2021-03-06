$(document).bind("contextmenu", function (e) { //disable right click menu pop up
    return false;
});

let message = "";
let noOfMines = 0;
const randomGrid = [];

const levels = {
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
    $('#credits').hide();
    $('#scoreboard').hide();
    $('#reset').hide();
    $('#easy').on('click', easyLevel);
    $('#medium').on('click', mediumLevel);
    $('#hard').on('click', hardLevel);
    message = "Please select your level.";

    render();
}

const easyLevel = () => {
    const noOfRows = levels["easy"][0]["noOfRows"];
    const noOfCols = levels["easy"][0]["noOfCols"];
    const noOfMines = levels["easy"][0]["noOfMines"];
    generateRandomArray(noOfRows, noOfCols, noOfMines, randomGrid);
};

const mediumLevel = () => {
    const noOfRows = levels["medium"][0]["noOfRows"];
    const noOfCols = levels["medium"][0]["noOfCols"];
    const noOfMines = levels["medium"][0]["noOfMines"];
    generateRandomArray(noOfRows, noOfCols, noOfMines, randomGrid);
};

const hardLevel = () => {
    const noOfRows = levels["hard"][0]["noOfRows"];
    const noOfCols = levels["hard"][0]["noOfCols"];
    const noOfMines = levels["hard"][0]["noOfMines"];
    generateRandomArray(noOfRows, noOfCols, noOfMines, randomGrid);
};

const generateRandomArray = (noOfRows, noOfCols, noOfMines, randomGrid) => {
    //generate empty array
    gridGeneration(noOfRows, noOfCols, randomGrid);
    // console.log(randomGrid);

    //generate coordinates for bombs
    const bombCoord = bombCoordGeneration(noOfRows, noOfCols, noOfMines);
    // console.log(bombCoord);

    //populate bomb location & add 1 to surrounding for every bomb
    bombToGrid(randomGrid, bombCoord);
    // console.log(randomGrid);

    //send array to fieldGeneration()
    fieldGeneration(randomGrid);
    //console.log array
};

const gridGeneration = (noOfRows, noOfCols, randomGrid) => {
    // const randomGrid = [];
    for (let i = 0; i < noOfRows; i++) {
        const rowArray = [];
        for (let j = 0; j < noOfCols; j++) {
            rowArray.push(0);
        };
        randomGrid.push(rowArray);
    };
    // return randomGrid;
};

const bombCoordGeneration = (noOfRows, noOfCols, noOfMines) => {
    const bombCoord = [];
    for (let k = 0; k < noOfMines; k++) {
        let newbomb = {
            row: Math.floor(Math.random() * noOfRows),
            col: Math.floor(Math.random() * noOfCols)
        }
        for (l = 0; l < k; l++) {
            if ((bombCoord[l].row === newbomb.row) && (bombCoord[l].col === newbomb.col)) {
                k--;
                // console.log(bombCoord);
                bombCoord.splice(l, 1);
            };
            // console.log(279)
        }
        // console.log(281);
        bombCoord.push(newbomb);

    };
    // console.log(285);
    // console.log(bombCoord);
    return bombCoord;
};

const bombToGrid = (randomGrid = [], bombCoord = []) => {
    for (let i = 0; i < bombCoord.length; i++) {
        bombRow = bombCoord[i].row;
        bombCol = bombCoord[i].col;
        randomGrid[bombRow][bombCol] = "B"
    }
    numberToGrid(randomGrid, bombCoord);
};

const numberToGrid = (randomGrid = [], bombCoord = []) => {
    for (let i = 0; i < bombCoord.length; i++) {
        bombRow = bombCoord[i].row;
        bombCol = bombCoord[i].col;
        if ((bombCol !== 0) && (randomGrid[bombRow][bombCol - 1] !== "B")) {//left
            randomGrid[bombRow][bombCol - 1]++;
        };

        if ((bombCol !== randomGrid[0].length - 1) && (randomGrid[bombRow][bombCol + 1] !== "B")) {//right
            randomGrid[bombRow][bombCol + 1]++;
        };

        if (bombRow !== 0) { //top row
            if ((bombCol !== 0) && (randomGrid[bombRow - 1][bombCol - 1] !== "B")) {//top left
                randomGrid[bombRow - 1][bombCol - 1]++;
            };

            if ((bombCol !== randomGrid[0].length - 1) && (randomGrid[bombRow - 1][bombCol + 1] !== "B")) {//top right
                randomGrid[bombRow - 1][bombCol + 1]++;
            };
            if (randomGrid[bombRow - 1][bombCol] !== "B") {
                randomGrid[bombRow - 1][bombCol]++; //top center
            };
        };

        if (bombRow !== randomGrid.length - 1) { //bottom row
            if ((bombCol !== 0) && (randomGrid[bombRow + 1][bombCol - 1] !== "B")) {//bottom left
                randomGrid[bombRow + 1][bombCol - 1]++;
            };

            if ((bombCol !== randomGrid[0].length - 1) && (randomGrid[bombRow + 1][bombCol + 1] !== "B")) {//bottom right
                randomGrid[bombRow + 1][bombCol + 1]++;
            };
            if (randomGrid[bombRow + 1][bombCol] !== "B") {
                randomGrid[bombRow + 1][bombCol]++; //bottom center
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
            if (currentCell === "B") {
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
    $('#reset').on('click', reset).show();
    render();
};


///////////////////////functional codes below////////////////////////

const clickCheck = (event) => {
    // console.log("clickCheck start:");
    // console.log($(event.target));
    if ($(event.target).attr('class') === "hidden") {
        const $clickVal = $(event.target).html();
        showButton(event, $clickVal);
        disableButton(event);
        if ($clickVal === "B") {
            clickedBomb(event);
            // console.log("Bomb");
        } else if ($clickVal === "0") {
        //     // console.log($clickVal + " is ")
        // } else {
            // console.log($clickVal + " is selected");
            openSurrounding(event);
        }
        checkWin();
    }
    //``````````start of click tests ```````````````//
};

const checkWin = () => {
    $noOfHidden = $('.hidden').length;
    $noOfFlags = $('.flag').length;
    $noOfSuccessfulFlags = $('.flag:contains("B")').length;
    // console.log("Flags: " + $noOfFlags);
    // console.log("Successful flags: " + $noOfSuccessfulFlags);
    // console.log("No of mines: " + noOfMines);
    // console.log("No of hidden: " + $noOfHidden);
    if ($noOfHidden === noOfMines) {
        disableField();
        message = "Congratulations! You have successfully navigated this field.";
    } else if (($noOfFlags === $noOfSuccessfulFlags) && ($noOfSuccessfulFlags === noOfMines)) {
        disableField();
        message = "Congratulations! You have flagged all the mines!"
    }
    render();
};

const convertCoords = (event) => {
    // const col = $(event.target).attr('id').split("-").pop();
    // const row = $(event.target).parent().attr('id').split("-").pop();
    // const butt = $(event.target);
    // console.log(col);
    // console.log(row);
    // console.log(butt);
    const cellCoord = {
        row: parseInt($(event.target).parent().attr('id').split("-").pop()),
        col: parseInt($(event.target).attr('id').split("-").pop())
    }
    return cellCoord;
}

const openSurrounding = (event) => {
    // console.log(randomGrid);
    const cellCoord = convertCoords(event); //get cell coord in object {row, col}
    if (cellCoord.col !== 0) { //if cell is not leftmost cell
        $(event.target).prev().click(); //left cell click
    }

    if (cellCoord.col < (randomGrid[0].length - 1)) { //if cell is not rightmost cell
        $(event.target).next().click(); //right cell click
    }

    if (cellCoord.row !== 0) { //if cell is not in top row
        if (cellCoord.col !== 0) {
            $(event.target).parent().prev().children().eq(cellCoord.col - 1).click(); //above left cell click
        }

        if (cellCoord.col < (randomGrid[0].length - 1)) {
            $(event.target).parent().prev().children().eq(cellCoord.col + 1).click(); //above right cell click
        }

        $(event.target).parent().prev().children().eq(cellCoord.col).click(); //above center cell click
    }

    if (cellCoord.row < (randomGrid.length - 1)) { //if cell is not in bottom row
        if (cellCoord.col !== 0) {
            $(event.target).parent().next().children().eq(cellCoord.col - 1).click(); //below left cell click
        }

        if (cellCoord.col < (randomGrid[0].length - 1)) {
            $(event.target).parent().next().children().eq(cellCoord.col + 1).click(); //below right cell click
        }

        $(event.target).parent().next().children().eq(cellCoord.col).click(); //below center cell click
    }

}

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
    $('button:contains("B")').addClass("bomb");
    $('.flag:not(:contains("B"))').addClass("wrong");
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
    const flagsLeft = $('.hidden:contains("B")').length - $('.flag').length + $('.wrong').length;
    $('#mines-left').html(flagsLeft);
};

const reset = () => {
    $('#field').empty();
    randomGrid.splice(0);
    // console.log(randomGrid);
    message = "Please select your level."
    noOfMines = 0;
    render();
    $('#level-select').show();
    $('#scoreboard').hide();
    $('#reset').hide();
};

// const timer = setInterval(() => {
//     $('#timer').text(game.timer);
//     if (game.timer === 0) {
//         clearInterval(timer);
//     }
//     game.timer--;
// }, 1000);

$(() => {
    levelSelection();
    // generateRandomArray();
    // setUp();
    // render();
});



//change button id to num, blank or bomb?
//render without number in html when hidden, only put in html when clicked => to prevent cheating by highlighting. // Done
//using navigations of siblings? // Done

//level selection: dropdown selection => show grid size and number of bombs
