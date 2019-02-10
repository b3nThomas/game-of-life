import { CellState, getAliveNeighbours, getNextCellState } from './cell';

type Coord = {
    x: number;
    y: number;
};

export type World = CellState[][];

export type WorldConfig = {
    height: number;
    width: number;
    livingCellCoords?: Coord[];
};

export const createWorld = (config: WorldConfig): World => {
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

export const getNextGenerationCoords = (world: World): Coord[] => {
    const coords = [];
    world.forEach((row, y) => {
        row.forEach((state, x) => {
            const aliveNeighbours = getAliveNeighbours(world, x, y);
            const nextState = getNextCellState(state, aliveNeighbours);
            if (nextState === 1) {
                coords.push({ x, y });
            }
        });
    });
    return coords;
};
