// Sample code extracted from src/number/branded-types/int.mts (int)
import { Int, asInt } from 'ts-data-forge';

Int.max(asInt(5), asInt(3)); // Int (5)
Int.max(asInt(-10), asInt(0), asInt(10)); // Int (10)
