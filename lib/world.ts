import { CellState } from './cell';

type CellCoord = {
    x: number;
    y: number;
};

export type WorldConfig = {
    height: number;
    width: number;
    livingCellCoords?: CellCoord[];
};

export const createWorld = (config: WorldConfig): CellState[][] => {
    const world = [];
    const row = new Array(config.width).fill(0);
    for (let y = 0; y < config.height; y++) {
        world.push(row.slice());
    }
    if (config.livingCellCoords) {
        config.livingCellCoords.forEach(coord => {
            if (world[coord.y] && typeof world[coord.y][coord.x] === 'number') {
                world[coord.y][coord.x] = 1;
            }
        });
    }
    return world;
};
