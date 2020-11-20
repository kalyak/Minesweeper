const field = [
    [1, 2, 2, 1],
    [1, "B", "B", 1],
    [1, 2, 2, 1]
];


const clickCheck = (event) => {
    const $clickVal = $(event.target).html();
    if ($clickVal === "B") {
        console.log("Bomb");
    } else {
        console.log($clickVal + " is selected");
    }
};


const setUp = () => {
    for (let i = 0; i < field.length; i++) {
        const currentRow = field[i];
        const $field = $('#field');
        const $row = $('<div>').attr('id', "row-" + i);
        for (let j = 0; j < currentRow.length; j++) {
            const currentCell = currentRow[j];
            const $col = $('<button>')
                .attr('id', "col-" + j)
                .html(currentCell)
                .on('click', clickCheck);
            $row.append($col);
        }
        $field.append($row);
    }
};

const render = () => {

};



$(() => {
    setUp();
    render();
});