## **Approach and Process**
1. **What in my process and approach to this project would I do differently next time?**  
- I would draw a more comprehensive map out of the elements and how they would be styled and the heirachy of styles and the interaction of elements.

1. **What in my process and approach to this project went well that I would repeat next time?**  
- Thinking through the potential problem areas and running the steps through in my head and on paper in sudo code before starting the code.
- Breaking up the code into a new function once I see that the code is getting repetitive or going into a long sub function instead of continuong it all in one long function and figuring out how to refactor it later.

---

## **Code and Code Design**  
1. **What in my code and program design in the project would I do differently next time?**
- I would have a list of styles instead of blindly coding the classes in and stacking all the CSS styling of each class in and having to manouver them on top and below to get the desired effects.
- I would want to try putting in some animation to make it more exciting.

2. **What in my code and program design in the project went well? Is there anything I would do the same next time?**
For each, please include code examples.
   1. Code snippet up to 20 lines.
   2. Code design documents or architecture drawings / diagrams.  

- Having a main function with the order of game generation and calling on sub-functions to do the different steps of game generation.
  ```Javascript
    const generateRandomField = (noOfRows, noOfCols, noOfMines, randomGrid) => {

        gridGeneration(noOfRows, noOfCols, randomGrid); //generate empty array

        const bombCoord = bombCoordGeneration(noOfRows, noOfCols, noOfMines); //generate coordinates for bombs

        bombToGrid(randomGrid, bombCoord); //populate bomb location & add 1 to surrounding for every bomb

        fieldGeneration(randomGrid); //generate field onscreen
    };
    ```

- Incrementing the value of the cells surrounding the mine.
  ```Javascript
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
    ```

- Evolving the level select from a single dropdown to a cascading dropdown and have the sub menu refreshed with only the grid size applicable to the level selected.
    ```Javascript
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
    ```

-------

## **SEI Post Mortem**  
1. **What habits did I use during this unit that helped me**?
- Actively thinking if the function is doing more than one job and refactoring on the go.
- Thinking the flow of the code through before starting the attempt to code.
- Having a sample structure of the interface at different stages coded onto the HTML file to reverse engineer it for the build by the Javascript.

2. **What habits did I have during this unit that I can improve on?**
- Not go down the rabbit hole of one specific way to code when you spot more and more problem spots coming up (i.e. Game state tracking in JS instead of HTML)
- Need to get out of my comfort zone more and attempt more animation/creative coding instead of sticking to my logic puzzles.

3. **How is the overall level of the course during this unit? (instruction, course materials, etc.)**  
9/10, Examples of diffferent mechanism that can be used for the project was shown when we asked how we might go about doing it.