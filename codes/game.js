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
    // showButton(event);
    // disableButton(event);
    // const $clickVal = $(event.target).html();
    // if ($clickVal === "B") {
    //     clickedBomb();
    //     console.log("Bomb");
    // } else {
    //     console.log($clickVal + " is selected");
    // }

    //``````````start of click tests ```````````````//
    const cellCoord = convertCoords(event);
    console.log(cellCoord);
};

const convertCoords = (event) => {
    // const col = $(event.target).attr('id').split("-").pop();
    // const row = $(event.target).parent().attr('id').split("-").pop();
    // const butt = $(event.target);
    // console.log(col);
    // console.log(row);
    // console.log(butt);
    const cellCoord = {
        col: $(event.target).attr('id').split("-").pop(),
        row: $(event.target).parent().attr('id').split("-").pop()
    }
    return cellCoord;
}

const checkSurrounding = (event) => {

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