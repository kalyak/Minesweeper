const field = [
    [
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
        }]
    ],
    [
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
        }]
    ],
    [
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
        }]
    ]
];


const clickCheck = (event) => {
    changeState(event);
    const $clickVal = $(event.target).html();
    if ($clickVal === "B") {
        console.log("Bomb");
    } else {
        console.log($clickVal + " is selected");
    }
};

const changeState = (event) => {
    $(event.target).removeClass();
    console.log("changed state");
};

// const setUp = () => {

// };

const render = () => {
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
    // setUp();
    render();
});