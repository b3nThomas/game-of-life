import test from 'ava';
import { createWorld, WorldConfig } from '../lib/world';

test('createWorld returns a 2D array of the correct height and width', t => {
    const scenarios: WorldConfig[] = [
        { height: 1, width: 1 },
        { height: 3, width: 3 },
        { height: 5, width: 5 },
        { height: 10, width: 10 },
        { height: 25, width: 50 }
    ];

    scenarios.forEach(s => {
        const world = createWorld(s);
        t.is(world.length, s.height);
        world.forEach(row => t.is(row.length, s.width));
    });
});

test('createWorld populates the configured living cells', t => {
    const scenarios: WorldConfig[] = [
        { height: 3, width: 3, livingCellCoords: [{ x: 0, y: 0 }] },
        { height: 3, width: 3, livingCellCoords: [{ x: 0, y: 0 }, { x: 1, y: 1 }] },
        { height: 3, width: 3, livingCellCoords: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }] }
    ];

    const expected = [
        [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[1, 0, 0], [0, 1, 0], [0, 0, 0]],
        [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    ];

    scenarios.forEach((s, i) => {
        const world = createWorld(s);
        t.deepEqual(world, expected[i]);
    });
});

test('createWorld ignores living cells that are out of range', t => {
    const scenarios: WorldConfig[] = [
        { height: 3, width: 3, livingCellCoords: [{ x: 0, y: 0 }, { x: 4, y: 0 }] },
        { height: 3, width: 3, livingCellCoords: [{ x: 0, y: 0 }, { x: 0, y: 4 }] }
    ];

    const expected = [[1, 0, 0], [0, 0, 0], [0, 0, 0]];

    scenarios.forEach(s => {
        const world = createWorld(s);
        t.deepEqual(world, expected);
    });
});
