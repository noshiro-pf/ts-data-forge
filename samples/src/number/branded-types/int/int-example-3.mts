// Sample code extracted from src/number/branded-types/int.mts (int)
import { Int, asInt } from 'ts-data-forge';

Int.min(asInt(5), asInt(3)); // Int (3)
Int.min(asInt(-10), asInt(0), asInt(10)); // Int (-10)
