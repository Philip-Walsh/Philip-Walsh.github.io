/**
 * Project: Conway's Game of Life
 * Description: Implementation of Conway's Game of Life, a cellular automaton.
 *              Simulates the evolution of a grid of cells based on simple rules.
 * Design Patterns: Object-Oriented Programming principles are employed, utilizing classes for
 *                  encapsulation, inheritance, and polymorphism to achieve modular and
 *                  maintainable code.
 * Difficulty: 1/5
 * Date: 21/04/2023
 */



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
        this.deadColor = '#e4dccf';
        this.updateInterval = 500;
        this.updateTimer = null;

        const card = document.querySelector('#game');
        card.addEventListener('mouseover', () => {
            this.reset();
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

    reset() {
        this.stop();
        this.cells = this.initCells();
        this.drawCells();
    }

    start() {
        if (this.updateTimer) return;
        this.reset();
        this.drawCells();
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
