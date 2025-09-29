// Example: src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

PositiveInt.pow(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (8)
