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
let message = "";

const clickCheck = (event) => {
    showButton(event);
    disableButton(event);
    const $clickVal = $(event.target).html();
    if ($clickVal === "B") {
        clickedBomb();
        console.log("Bomb");
    } else if ($clickVal > 0) {
        console.log($clickVal + " is ")
    } else {
        console.log($clickVal + " is selected");
        checkSurrounding(event);
    }

    //``````````start of click tests ```````````````//
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

const checkSurrounding = (event) => {
    const cellCoord = convertCoords(event); //get cell coord in object {row, col}
    console.log(cellCoord);
    console.log("cell val: " + field[cellCoord.row][cellCoord.col][0].value);//get cell value
    if (cellCoord.col !== 0) { //if cell is not leftmost cell
        console.log("left val: " + field[cellCoord.row][cellCoord.col - 1][0].value); //left cell value
    }

    if (cellCoord.col < (field[0].length - 1)) { //if cell is not rightmost cell
        console.log("right val: " + field[cellCoord.row][cellCoord.col + 1][0].value); //right cell value
    }

    if (cellCoord.row !== 0) { //if cell is not in top row
        if (cellCoord.col !== 0) {
            console.log("above left val: " + field[cellCoord.row - 1][cellCoord.col - 1][0].value); //above left cell value
        }

        if (cellCoord.col < (field[0].length - 1)) {
            console.log("above right val: " + field[cellCoord.row - 1][cellCoord.col + 1][0].value); //above right cell value
        }

        console.log("above center val: " + field[cellCoord.row - 1][cellCoord.col][0].value); //above center cell value


    }

    if (cellCoord.row < (field.length - 1)) { //if cell is not in bottom row
        if (cellCoord.col !== 0) {
            console.log("below left val: " + field[cellCoord.row + 1][cellCoord.col - 1][0].value); //below left cell value
        }

        if (cellCoord.col < (field[0].length - 1)) {
            console.log("below right val: " + field[cellCoord.row + 1][cellCoord.col + 1][0].value); //below right cell value
        }

        console.log("below center val: " + field[cellCoord.row + 1][cellCoord.col][0].value); //below center cell value

    }

}

const disableButton = (event) => {
    $(event.target).addClass("disabled");
    console.log("button disabled");
};

const showButton = (event) => {
    $(event.target).attr('class', "shown");
    console.log("button shown");
}

const clickedBomb = (event) => {
    $('button').addClass("disabled");
    message = "Game Over";
    render();
};


const render = () => {
    $('#message-box').html(message);
};


const setUp = () => {
    for (let i = 0; i < field.length; i++) {
        const currentRow = field[i];
        const $field = $('#field');
        const $row = $('<div>').attr('id', "row-" + i);
        for (let j = 0; j < currentRow.length; j++) {
            const currentCell = currentRow[j][0].value;
            const $col = $('<button>')
                .attr({
                    'id': "col-" + j
                    ,
                    'class': currentRow[j][0].state
                })
                .html(currentCell)
                .on('click', clickCheck);
            $row.append($col);
        }
        $field.append($row);
    }
};


$(() => {
    setUp();
    render();
});

//change button id to num, blank or bomb?
//render without number in html when hidden, only put in html when clicked => to prevent cheating by highlighting