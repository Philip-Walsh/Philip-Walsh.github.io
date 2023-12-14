const { JSDOM } = require('jsdom');
const GameOfLife = require('../../scripts/conways-game-of-life.js');

const mockCanvas = {
  width: 100,
  height: 100,
  getContext: () => ({
    fillRect: jest.fn(),
  }),
};

const mockDocument = new JSDOM('<!doctype html><html><body></body></html>');
global.document = mockDocument.window.document;
global.document.querySelector = jest.fn(() => ({
  addEventListener: jest.fn(),
}));

Math.random = jest.fn(() => 0.5);

describe('GameOfLife', () => {
  let gameOfLife;

  beforeEach(() => {
    gameOfLife = new GameOfLife(mockCanvas);
  });

  test('should initialize cells properly', () => {
    expect(gameOfLife.cells).toHaveLength(gameOfLife.numCols);
    expect(gameOfLife.cells[0]).toHaveLength(gameOfLife.numRows);
  });

  test('should draw cells on canvas', () => {
    gameOfLife.drawCells();
    expect(mockCanvas.getContext().fillRect).toHaveBeenCalledTimes(
      gameOfLife.numCols * gameOfLife.numRows
    );
  });

  test('should update cells correctly', () => {
    const spyDrawCell = jest.spyOn(gameOfLife, 'drawCell');
    gameOfLife.update();
    expect(spyDrawCell).toHaveBeenCalledTimes(
      gameOfLife.numCols * gameOfLife.numRows
    );
  });

});

