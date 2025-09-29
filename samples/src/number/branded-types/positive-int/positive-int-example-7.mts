// Example: src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

PositiveInt.mul(asPositiveInt(4), asPositiveInt(3)); // PositiveInt (12)
