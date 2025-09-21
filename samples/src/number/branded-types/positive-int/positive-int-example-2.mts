// Sample code extracted from src/number/branded-types/positive-int.mts (positive-int)
import { PositiveInt } from 'ts-data-forge';

PositiveInt.clamp(5); // PositiveInt (5)
PositiveInt.clamp(0); // PositiveInt (1) - clamped to minimum
PositiveInt.clamp(-10); // PositiveInt (1) - clamped to minimum
PositiveInt.clamp(100); // PositiveInt (100)
