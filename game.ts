import { createWorld, WorldConfig, getNextGenerationCoords } from './lib/world';

const tick = (config: WorldConfig): WorldConfig => {
    console.log(config.livingCellCoords);
    const world = createWorld(config);
    // Do CSS/HTML Magic
    config.livingCellCoords = getNextGenerationCoords(world);
    return config;
};

let config: WorldConfig = {
    height: 5,
    width: 5,
    livingCellCoords: [
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 3, y: 3 }
    ]
};

setInterval(() => {
    config = tick(config);
}, 1000);
