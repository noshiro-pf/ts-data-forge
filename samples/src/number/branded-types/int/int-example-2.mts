// Example: src/number/branded-types/int.mts (Int)
import { Int, asInt } from 'ts-data-forge';

Int.abs(asInt(-5)); // Int (5)
Int.abs(asInt(3)); // Int (3)
Int.abs(asInt(-0)); // Int (0)
