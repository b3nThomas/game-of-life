import { createWorld, WorldConfig, getNextGenerationCoords } from './lib/world';
import { killAllCells, drawLivingCells, drawGrid } from './lib/dom';

class Game {
    private config: WorldConfig;
    private mousedown: boolean;

    public init(): void {
        const initButton: HTMLElement = document.querySelector('#init-btn');
        initButton.addEventListener('click', () => {
            initButton.style.display = 'none';
            this.selectGrid();
        });
    }

    private selectGrid(): void {
        const gridSelection: HTMLElement = document.querySelector('.grid-selection');
        gridSelection.style.display = 'block';
        const buttons: HTMLElement[] = Array.from(gridSelection.querySelectorAll('button'));
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.config = {
                    width: parseInt(button.dataset.x, 0),
                    height: parseInt(button.dataset.y, 0)
                };
                gridSelection.style.display = 'none';
                drawGrid(this.config.width, this.config.height);
                this.selectCells();
            });
        });
    }

    private selectCells(): void {
        const cellSelection: HTMLElement = document.querySelector('.cell-selection');
        cellSelection.style.display = 'block';
        document.addEventListener('mousedown', () => {
            this.mousedown = true;
        });
        document.addEventListener('mouseup', () => {
            this.mousedown = false;
        });

        const cells: HTMLElement[] = Array.from(document.querySelectorAll('.cell'));
        cells.forEach(cell => {
            cell.classList.add('selecting');
            cell.addEventListener('mouseover', () => {
                if (this.mousedown) {
                    if (cell.classList.contains('selected')) {
                        cell.classList.remove('selected');
                    } else {
                        cell.classList.add('selected');
                    }
                }
            });
            cell.addEventListener('click', () => {
                if (cell.classList.contains('selected')) {
                    cell.classList.remove('selected');
                } else {
                    cell.classList.add('selected');
                }
            });
        });

        cellSelection.querySelector('button').addEventListener('click', () => {
            this.startGame(cells);
        });
    }

    private startGame(cells: HTMLElement[]): void {
        const resetButton: HTMLElement = document.querySelector('#reset-btn');
        resetButton.style.display = 'block';
        resetButton.addEventListener('click', () => {
            window.location = window.location;
        });
        const cellSelection: HTMLElement = document.querySelector('.cell-selection');
        cellSelection.style.display = 'none';
        const livingCellCoords = [];
        cells.forEach(cell => {
            cell.classList.remove('selecting');
            if (cell.classList.contains('selected')) {
                livingCellCoords.push({ x: cell.dataset.x, y: cell.dataset.y });
            }
        });
        this.config.livingCellCoords = livingCellCoords;
        setInterval(() => {
            this.config = this.tick(this.config);
        }, 150);
    }

    private tick(config: WorldConfig): WorldConfig {
        killAllCells();
        drawLivingCells(config.livingCellCoords);
        const world = createWorld(config);
        config.livingCellCoords = getNextGenerationCoords(world);
        return config;
    }
}

const game = new Game;
game.init();
