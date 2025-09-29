// Example: src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

PositiveInt.add(asPositiveInt(5), asPositiveInt(3)); // PositiveInt (8)
