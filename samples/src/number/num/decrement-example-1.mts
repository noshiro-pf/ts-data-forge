// Example: src/number/num.mts (decrement)
import { Num } from 'ts-data-forge';

const three = 3 as 3;
const two = Num.decrement(three); // type is 2, value is 2

export { three, two };
