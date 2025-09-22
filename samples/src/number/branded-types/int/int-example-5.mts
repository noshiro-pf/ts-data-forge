// Sample code extracted from src/number/branded-types/int.mts (int)
import { Int, asInt } from 'ts-data-forge';

// Dice roll
const d6 = Int.random(asInt(1), asInt(6));

// Random array index
const index = Int.random(asInt(0), asInt(array.length - 1));

// Can generate negative values
const temp = Int.random(asInt(-10), asInt(10));

export { d6, index, temp };
