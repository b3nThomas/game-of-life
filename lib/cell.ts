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

export const getAliveNeighbours = (world: CellState[][], curX: number, curY: number) => {
    let total = 0 - world[curY][curX];
    for (let i = curY - 1; i <= curY + 1; i++) {
        total += (world[i][curX - 1] + world[i][curX] + world[i][curX + 1]);
    }
    return total;
};
