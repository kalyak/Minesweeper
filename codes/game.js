$(document).bind("contextmenu", function (e) { //disable right click menu pop up
    return false;
});

const field = [
    [
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }]
    ],
    [
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 1,
            state: "hidden"
        }],
        [{
            value: 2,
            state: "hidden"
        }],
        [{
            value: 2,
            state: "hidden"
        }],
        [{
            value: 1,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }]
    ],
    [
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 1,
            state: "hidden"
        }],
        [{
            value: "B",
            state: "hidden"
        }],
        [{
            value: "B",
            state: "hidden"
        }],
        [{
            value: 1,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }]
    ],
    [
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 1,
            state: "hidden"
        }],
        [{
            value: 2,
            state: "hidden"
        }],
        [{
            value: 2,
            state: "hidden"
        }],
        [{
            value: 1,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }]
    ],
    [
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }],
        [{
            value: 0,
            state: "hidden"
        }]
    ]
];

const field2 = [
    [//row 0
        [{//column 0
            value: 0,
            state: "hidden",
        }],
        [{//column 1
            value: 1,
            state: "hidden",
        }],
        [{//column 2
            value: "B",
            state: "hidden",
        }],
        [{//column 3
            value: 1,
            state: "hidden",
        }],
        [{//column 4
            value: 1,
            state: "hidden",
        }],
        [{//column 5
            value: 1,
            state: "hidden",
        }]
    ],
    [//row 1
        [{//column 0
            value: 0,
            state: "hidden",
        }],
        [{//column 1
            value: 1,
            state: "hidden",
        }],
        [{//column 2
            value: 1,
            state: "hidden",
        }],
        [{//column 3
            value: 2,
            state: "hidden",
        }],
        [{//column 4
            value: 2,
            state: "hidden",
        }],
        [{//column 5
            value: "B",
            state: "hidden",
        }]
    ],
    [//row 2
        [{//column 0
            value: 0,
            state: "hidden",
        }],
        [{//column 1
            value: 0,
            state: "hidden",
        }],
        [{//column 2
            value: 0,
            state: "hidden",
        }],
        [{//column 3
            value: 1,
            state: "hidden",
        }],
        [{//column 4
            value: "B",
            state: "hidden",
        }],
        [{//column 5
            value: 2,
            state: "hidden",
        }]
    ],
    [//row 3
        [{//column 0
            value: 0,
            state: "hidden",
        }],
        [{//column 1
            value: 0,
            state: "hidden",
        }],
        [{//column 2
            value: 0,
            state: "hidden",
        }],
        [{//column 3
            value: 1,
            state: "hidden",
        }],
        [{//column 4
            value: 1,
            state: "hidden",
        }],
        [{//column 5
            value: 1,
            state: "hidden",
        }]
    ]
];

let message = "";
let noOfMines = 0;

const generateRandomArray = () => {
    // $('#generate-field').on('click',inputRetrieval);

    const noOfRows = 4;
    const noOfCols = 6;
    const noOfMines = 3;

    //generate empty array
    const randomGrid = gridGeneration(noOfRows, noOfCols);
    console.log(randomGrid);

    //generate coordinates for bombs
    const bombCoord = bombCoordGeneration(noOfRows, noOfCols, noOfMines);
    console.log(bombCoord);

    //populate bomb location
    bombToGrid(randomGrid, bombCoord);
    console.log(randomGrid);

    //add 1 to surrounding for every bomb
    //send array to fieldGeneration()
    fieldGeneration(randomGrid);
    //console.log array
};

const gridGeneration = (noOfRows, noOfCols) => {
    const randomGrid = [];
    for (let i = 0; i < noOfRows; i++) {
        const rowArray = [];
        for (let j = 0; j < noOfCols; j++) {
            rowArray.push(0);
        };
        randomGrid.push(rowArray);
    };
    return randomGrid;
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
};

// const numberToGrid = (randomGrid = [], bombCoord = []) => {
//     bombRow = bombCoord[i].row;
//     bombCol = bombCoord[i].col;

// };

const fieldGeneration = (randomGrid) => {
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
    $('#reset').on('click', reset);
    $('#credits').hide();
};


///////////////////////functional codes below////////////////////////

const clickCheck = (event) => {
    console.log("clickCheck start:");
    // console.log($(event.target));
    if ($(event.target).attr('class') === "hidden") {
        const $clickVal = $(event.target).html();
        showButton(event, $clickVal);
        disableButton(event);
        if ($clickVal === "B") {
            clickedBomb();
            console.log("Bomb");
        } else if ($clickVal > 0) {
            console.log($clickVal + " is ")
        } else {
            console.log($clickVal + " is selected");
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
    console.log("Flags: " + $noOfFlags);
    console.log("Successful flags: " + $noOfSuccessfulFlags);
    console.log("No of mines: " + noOfMines);
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
    const cellCoord = convertCoords(event); //get cell coord in object {row, col}
    if (cellCoord.col !== 0) { //if cell is not leftmost cell
        $(event.target).prev().click(); //left cell click
    }

    if (cellCoord.col < (field2[0].length - 1)) { //if cell is not rightmost cell
        $(event.target).next().click(); //right cell click
    }

    if (cellCoord.row !== 0) { //if cell is not in top row
        if (cellCoord.col !== 0) {
            $(event.target).parent().prev().children().eq(cellCoord.col - 1).click(); //above left cell click
        }

        if (cellCoord.col < (field2[0].length - 1)) {
            $(event.target).parent().prev().children().eq(cellCoord.col + 1).click(); //above right cell click
        }

        $(event.target).parent().prev().children().eq(cellCoord.col).click(); //above center cell click
    }

    if (cellCoord.row < (field2.length - 1)) { //if cell is not in bottom row
        if (cellCoord.col !== 0) {
            $(event.target).parent().next().children().eq(cellCoord.col - 1).click(); //below left cell click
        }

        if (cellCoord.col < (field2[0].length - 1)) {
            $(event.target).parent().next().children().eq(cellCoord.col + 1).click(); //below right cell click
        }

        $(event.target).parent().next().children().eq(cellCoord.col).click(); //below center cell click
    }

}

const disableButton = (event) => {
    $(event.target).addClass("disabled");
    console.log("button disabled");
};

const showButton = (event, $clickVal) => {
    $(event.target).attr('class', "shown");
    if ($clickVal === "0") {
        $(event.target).addClass("zero");
    }
    console.log("button shown");
}

const disableField = () => {
    $('.shown').addClass("disabled");
    $('.hidden').addClass("disabled");
};

const clickedBomb = (event) => {
    disableField();
    $bombs = $('button:contains("B")').addClass("bomb");
    console.log(`bombs displayed`);
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
};

const reset = () => {
    $('#field').empty();
    setUp();
};

const setUp = () => {
    for (let i = 0; i < field2.length; i++) {
        message = "Left click to reveal cell, Right click to toggle flag on cell.";
        const currentRow = field2[i];
        const $field = $('#field');
        const $row = $('<div>').attr('id', "row-" + i);
        for (let j = 0; j < currentRow.length; j++) {
            const currentCell = currentRow[j][0].value;
            if (currentCell === "B") {
                noOfMines++;
            }
            const $col = $('<button>')
                .attr({
                    'id': "col-" + j,
                    'class': currentRow[j][0].state
                })
                .html(currentCell)
                .on('click', clickCheck)
                .on('contextmenu', flag);
            $row.append($col);
        }
        $field.append($row);
    }
    $('#reset').on('click', reset);
    $('#credits').hide();
};


$(() => {
    generateRandomArray();
    // setUp();
    // render();
});

//change button id to num, blank or bomb?
//render without number in html when hidden, only put in html when clicked => to prevent cheating by highlighting. // Done
//using navigations of siblings? // Done


// const inputRetrieval = () => {
//     $inputCol = parseInt($('#col-input').val());
//     $inputRow = parseInt($('#row-input').val());
//     $inputBomb = parseInt($('#bomb-input').val());
//     console.log(typeof $inputBomb)
//     console.log(`Rows: ${$inputRow}, Columns: ${$inputCol}, Bombs: ${$inputBomb}`)

//     if ($inputBomb >= ($inputRow * $inputCol)) {
//         message = "Please enter"
//     } 
// };