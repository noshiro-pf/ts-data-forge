// Sample code extracted from src/others/tuple.mts (tp)
// Creating type-safe coordinate systems

import { tp } from 'ts-data-forge';

// 2D coordinates
const point2D = tp(10, 20);
const [x, y] = point2D; // x: 10, y: 20

// 3D coordinates
const point3D = tp(10, 20, 30);
const [x3, y3, z3] = point3D; // Exact types preserved

// Named coordinate system
const namedPoint = tp('x', 100, 'y', 200);
// Type: readonly ['x', 100, 'y', 200]
