// Example: src/number/branded-types/int.mts (int)
import { Int, asInt } from 'ts-data-forge';

Int.sub(asInt(8), asInt(3)); // Int (5)
