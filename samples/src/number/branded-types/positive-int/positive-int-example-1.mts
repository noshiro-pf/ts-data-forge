// Example: src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

PositiveInt.max(asPositiveInt(5), asPositiveInt(3)); // PositiveInt (5)
PositiveInt.max(asPositiveInt(10), asPositiveInt(1), asPositiveInt(7)); // PositiveInt (10)
