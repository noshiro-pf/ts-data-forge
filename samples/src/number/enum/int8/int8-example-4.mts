// Sample code extracted from src/number/enum/int8.mts (int8)
import { Int8, asInt8 } from 'ts-data-forge';

// Random signed byte
const randomByte = Int8.random(Int8.MIN_VALUE, Int8.MAX_VALUE);

// Random small range
const dice = Int8.random(asInt8(1), asInt8(6)); // 1-6

// Random offset
const offset = Int8.random(asInt8(-10), asInt8(10)); // -10 to 10
