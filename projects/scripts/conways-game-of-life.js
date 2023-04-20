class GameOfLife {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.cellSize = 10;
        this.numCols = Math.floor(this.canvas.width / this.cellSize);
        this.numRows = Math.floor(this.canvas.height / this.cellSize);
        this.cells = this.initCells();
        this.aliveColor = '#426c9b';
        this.dyingColor = '#7194c6';
        this.deadColor = '#fee5c5';
        this.updateInterval = 500;
        this.updateTimer = null;
        // Add an event listener for the mouseover event on the card element
        const card = document.querySelector('#game');
        card.addEventListener('mouseover', () => {
            this.reset(); // Reset the game when the card is rotated
            this.start();
        });
    }

    initCells() {
        const cells = new Array(this.numCols);
        for (let i = 0; i < this.numCols; i++) {
            cells[i] = new Array(this.numRows);
            for (let j = 0; j < this.numRows; j++) {
                cells[i][j] = Math.round(Math.random());
            }
        }
        return cells;
    }

    drawCell(x, y, color) {
        let actualColor = this.deadColor;
        if (color === 1) {
            actualColor = this.aliveColor;
        } else if (color === 2) {
            actualColor = this.dyingColor;
        }
        this.context.fillStyle = actualColor;
        this.context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

    drawCells() {
        for (let i = 0; i < this.numCols; i++) {
            for (let j = 0; j < this.numRows; j++) {
                this.drawCell(i, j, this.cells[i][j] === 1 ? this.aliveColor : this.deadColor);
            }
        }
    }

    update() {
        const newCells = new Array(this.numCols);
        for (let i = 0; i < this.numCols; i++) {
            newCells[i] = new Array(this.numRows);
        }

        for (let i = 0; i < this.numCols; i++) {
            for (let j = 0; j < this.numRows; j++) {
                let numAliveNeighbors = 0;
                for (let ii = -1; ii <= 1; ii++) {
                    for (let jj = -1; jj <= 1; jj++) {
                        if (i + ii >= 0 && i + ii < this.numCols && j + jj >= 0 && j + jj < this.numRows) {
                            if (ii !== 0 || jj !== 0) {
                                numAliveNeighbors += this.cells[i + ii][j + jj];
                            }
                        }
                    }
                }

                if (this.cells[i][j] === 1) {
                    if (numAliveNeighbors < 2 || numAliveNeighbors > 3) {
                        newCells[i][j] = 2; // cell is dying
                    } else {
                        newCells[i][j] = 1; // cell is alive
                    }
                } else {
                    if (numAliveNeighbors === 3) {
                        newCells[i][j] = 1; // cell is alive
                    } else {
                        newCells[i][j] = 0; // cell is dead
                    }
                }
            }
        }

        for (let i = 0; i < this.numCols; i++) {
            for (let j = 0; j < this.numRows; j++) {
                if (this.cells[i][j] !== newCells[i][j]) {
                    this.drawCell(i, j, newCells[i][j]);
                }
            }
        }

        this.cells = newCells;
    }
    // Define a reset function in the GameOfLife class
    reset() {
        this.stop(); // Stop the game if it's currently running
        this.cells = this.initCells(); // Reset the cells to their initial state
        this.drawCells(); // Draw the reset state of the game
        console.log('reset')
    }
    start() {
        if (this.updateTimer) return;
        this.reset(); // Reset the game before starting it
        this.drawCells(); // Draw the initial state of the game
        this.updateTimer = setInterval(() => {
            this.update();
        }, this.updateInterval);
    }


    stop() {
        if (!this.updateTimer) return;
        clearInterval(this.updateTimer);
        this.updateTimer = null;
    }
}

const canvas = document.querySelector('canvas');
const gameOfLife = new GameOfLife(canvas);
gameOfLife.drawCells();
gameOfLife.start();
