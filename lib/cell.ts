import { World } from './world';

export type CellState = 0 | 1;

export const getNextCellState = (alive: CellState, aliveNeighbours: number): CellState => {
    if (!alive) {
        if (aliveNeighbours === 3) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (aliveNeighbours < 2 || aliveNeighbours > 3) {
            return 0;
        } else {
            return 1;
        }
    }
};

export const getAliveNeighbours = (world: World, curX: number, curY: number) => {
    let total = 0 - world[curY][curX];
    for (let y = curY - 1; y <= curY + 1; y++) {
        if (world[y]) {
            [curX - 1, curX, curX + 1].forEach(x => {
                if (typeof world[y][x] === 'number') {
                    total += world[y][x];
                }
            });
        }
    }
    return total;
};
