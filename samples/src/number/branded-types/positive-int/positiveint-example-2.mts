// Example: src/number/branded-types/positive-int.mts (PositiveInt)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

PositiveInt.min(asPositiveInt(5), asPositiveInt(3)); // PositiveInt (3)
PositiveInt.min(asPositiveInt(10), asPositiveInt(1), asPositiveInt(7)); // PositiveInt (1)
