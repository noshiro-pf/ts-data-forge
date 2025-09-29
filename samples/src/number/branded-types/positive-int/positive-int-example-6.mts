// Example: src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

PositiveInt.sub(asPositiveInt(8), asPositiveInt(3)); // PositiveInt (5)
PositiveInt.sub(asPositiveInt(3), asPositiveInt(8)); // PositiveInt (1) - clamped
PositiveInt.sub(asPositiveInt(5), asPositiveInt(5)); // PositiveInt (1) - clamped
