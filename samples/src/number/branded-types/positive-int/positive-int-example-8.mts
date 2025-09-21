// Sample code extracted from src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt, asPositiveInt } from 'ts-data-forge';

PositiveInt.div(asPositiveInt(10), asPositiveInt(3)); // PositiveInt (3)
PositiveInt.div(asPositiveInt(9), asPositiveInt(3)); // PositiveInt (3)
PositiveInt.div(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (1) - clamped
PositiveInt.div(asPositiveInt(1), asPositiveInt(5)); // PositiveInt (1) - clamped
