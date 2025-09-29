// Example: src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

// Dice roll
const d6 = PositiveInt.random(asPositiveInt(1), asPositiveInt(6));

// Random user ID
const userId = PositiveInt.random(asPositiveInt(1000), asPositiveInt(9999));

// Random page count
const pages = PositiveInt.random(asPositiveInt(50), asPositiveInt(500));

export { d6, pages, userId };
