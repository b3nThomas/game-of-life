import test from 'ava';
import { CellState, getNextCellState, getAliveNeighbours } from '../lib/Cell';

test('getNextCellState returns the correct state', t => {
    const scenarios: { alive: CellState, aliveNeighbours: number, expected: CellState }[] = [
        { alive: 1, aliveNeighbours: 0, expected: 0 },
        { alive: 1, aliveNeighbours: 1, expected: 0 },
        { alive: 1, aliveNeighbours: 2, expected: 1 },
        { alive: 1, aliveNeighbours: 3, expected: 1 },
        { alive: 1, aliveNeighbours: 4, expected: 0 },
        { alive: 1, aliveNeighbours: 5, expected: 0 },
        { alive: 0, aliveNeighbours: 2, expected: 0 },
        { alive: 0, aliveNeighbours: 3, expected: 1 },
        { alive: 0, aliveNeighbours: 4, expected: 0 }
    ];

    scenarios.forEach((s, i) => {
        const result = getNextCellState(s.alive, s.aliveNeighbours);
        t.deepEqual({ result, scenario: i }, { result: s.expected, scenario: i });
    });
});

test('getAliveNeighbours returns the number of living neighbours', t => {
    const scenarios: { expected: number, curX: number, curY: number, world: CellState[][] }[] = [
        { expected: 0, curX: 1, curY: 1, world: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] },
        { expected: 1, curX: 1, curY: 1, world: [[1, 0, 0], [0, 0, 0], [0, 0, 0]] },
        { expected: 2, curX: 1, curY: 1, world: [[1, 1, 0], [0, 1, 0], [0, 0, 0]] },
        { expected: 3, curX: 1, curY: 1, world: [[1, 1, 1], [0, 0, 0], [0, 0, 0]] },
        { expected: 4, curX: 1, curY: 1, world: [[1, 1, 1], [1, 1, 0], [0, 0, 0]] },
        { expected: 5, curX: 1, curY: 1, world: [[1, 1, 1], [1, 0, 1], [0, 0, 0]] },
        { expected: 6, curX: 1, curY: 1, world: [[1, 1, 1], [1, 1, 1], [1, 0, 0]] },
        { expected: 7, curX: 1, curY: 1, world: [[1, 1, 1], [1, 0, 1], [1, 1, 0]] },
        { expected: 8, curX: 1, curY: 1, world: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] }
    ];
    scenarios.forEach(s => {
        const result = getAliveNeighbours(s.world, s.curX, s.curY);
        t.is(result, s.expected);
    });
});
