import { Coord } from './world';

export const drawGrid = (totalX: number, totalY: number) => {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.gridTemplateRows = `repeat(${totalY}, ${100 / totalY}%)`;
    grid.style.gridTemplateColumns = `repeat(${totalX}, ${100 / totalX}%)`;
    for (let y = 0; y < totalY; y++) {
        for (let x = 0; x < totalX; x++) {
            const div = document.createElement('div');
            div.dataset.x = `${x}`;
            div.dataset.y = `${y}`;
            div.className = 'cell';
            grid.appendChild(div);
        }
    }
    document.querySelector('.grid-wrapper').prepend(grid);
};

export const killAllCells = () => {
    Array.from(document.querySelectorAll('.alive')).forEach(cell => {
        cell.classList.remove('alive');
    });
};

export const drawLivingCells = (coords: Coord[]) => {
    coords.forEach(coord => {
        const cell = document.querySelector(`[data-x="${coord.x}"][data-y="${coord.y}"]`);
        if (cell) {
            cell.classList.add('alive');
        }
    });
};
