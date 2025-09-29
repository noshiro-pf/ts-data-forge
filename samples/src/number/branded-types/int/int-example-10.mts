// Example: src/number/branded-types/int.mts (int)
import { Int, asInt } from 'ts-data-forge';

// Positive division
Int.div(asInt(10), asInt(3)); // Int (3)
Int.div(asInt(9), asInt(3)); // Int (3)

// Negative division (rounds toward -∞)
Int.div(asInt(-10), asInt(3)); // Int (-4)
Int.div(asInt(10), asInt(-3)); // Int (-4)
Int.div(asInt(-10), asInt(-3)); // Int (3)
