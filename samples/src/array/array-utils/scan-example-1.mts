// Example: src/array/array-utils.mts (scan)
import { expectType } from 'ts-data-forge';

import { Arr, pipe } from 'ts-data-forge';

// Basic running sum example
const numbers = [1, 2, 3, 4];
const runningSum = Arr.scan(numbers, (acc, curr) => acc + curr, 0);
// NonEmptyArray<number> -> [0, 1, 3, 6, 10]
//                           ^  ^  ^  ^  ^
//                           |  |  |  |  └─ 0+1+2+3+4 = 10
//                           |  |  |  └─ 0+1+2+3 = 6
//                           |  |  └─ 0+1+2 = 3
//                           |  └─ 0+1 = 1
//                           └─ init = 0

// Difference from reduce
const reduced = numbers.reduce((acc, curr) => acc + curr, 0); // 10 (final only)
const scanned = Arr.scan(numbers, (acc, curr) => acc + curr, 0); // [0, 1, 3, 6, 10] (all steps)

// Running product
const factorial = Arr.scan([1, 2, 3, 4, 5], (acc, curr) => acc * curr, 1);
// [1, 1, 2, 6, 24, 120] - factorial sequence

// Running maximum
const temperatures = [20, 25, 18, 30, 22];
const runningMax = Arr.scan(
  temperatures,
  (max, temp) => Math.max(max, temp),
  Number.NEGATIVE_INFINITY,
);
// [Number.NEGATIVE_INFINITY, 20, 25, 25, 30, 30]

// Building strings incrementally
const words = ['Hello', 'beautiful', 'world'];
const sentences = Arr.scan(
  words,
  (sentence, word) => sentence + ' ' + word,
  '',
);
// ['', ' Hello', ' Hello beautiful', ' Hello beautiful world']

// Array accumulation (collecting elements)
const items = ['a', 'b', 'c'];
const growing = Arr.scan(items, (acc, item) => [...acc, item], [] as string[]);
// [[], ['a'], ['a', 'b'], ['a', 'b', 'c']]

// Financial running balance
const transactions = [100, -20, 50, -30];
const balances = Arr.scan(
  transactions,
  (balance, transaction) => balance + transaction,
  1000,
);
// [1000, 1100, 1080, 1130, 1100] - account balance after each transaction

// Using index information
const letters = ['a', 'b', 'c'];
const indexed = Arr.scan(
  letters,
  (acc, letter, index) => acc + `${index}:${letter} `,
  '',
);
// ['', '0:a ', '0:a 1:b ', '0:a 1:b 2:c ']

// Edge cases
const emptyArray: number[] = [];
const emptyResult = Arr.scan(emptyArray, (acc, curr) => acc + curr, 42);
// [42] - NonEmptyArray even for empty input

const singleElement = Arr.scan([5], (acc, curr) => acc * curr, 2);
// [2, 10] - init value plus one result

// Complex object accumulation
const sales = [
  { product: 'A', amount: 100 },
  { product: 'B', amount: 200 },
  { product: 'A', amount: 150 },
];

const runningSales = Arr.scan(
  sales,
  (totals, sale) => ({
    ...totals,
    [sale.product]: (totals[sale.product] || 0) + sale.amount,
  }),
  {} as Record<string, number>,
);
// [
//   {},
//   { A: 100 },
//   { A: 100, B: 200 },
//   { A: 250, B: 200 }
// ]

// Curried usage for functional composition
const runningSumFn = Arr.scan((acc: number, curr: number) => acc + curr, 0);
const runningProductFn = Arr.scan((acc: number, curr: number) => acc * curr, 1);
const collectingFn = Arr.scan(
  (acc: string[], curr: string) => [...acc, curr],
  [] as string[],
);

const datasets = [
  [1, 2, 3],
  [4, 5],
  [6, 7, 8, 9],
];
const allSums = datasets.map(runningSumFn);
// [
//   [0, 1, 3, 6],
//   [0, 4, 9],
//   [0, 6, 13, 21, 30]
// ]

// Pipe composition for data analysis
const analysisResult = pipe([10, 20, 30, 40])
  .map(runningSumFn)
  .map((sums) => sums.slice(1)) // Remove initial value to get pure running sums
  .map((sums) => sums.map((sum, i) => ({ step: i + 1, total: sum }))).value;
// [{ step: 1, total: 10 }, { step: 2, total: 30 }, { step: 3, total: 60 }, { step: 4, total: 100 }]

// Advanced: State machine simulation
type State = 'idle' | 'loading' | 'success' | 'error';
type Event = 'start' | 'complete' | 'fail' | 'reset';

const events: Event[] = ['start', 'complete', 'reset', 'start', 'fail'];
const stateTransition = (state: State, event: Event): State => {
  switch (state) {
    case 'idle':
      return event === 'start' ? 'loading' : state;
    case 'loading':
      return event === 'complete'
        ? 'success'
        : event === 'fail'
          ? 'error'
          : state;
    case 'success':
      return event === 'reset' ? 'idle' : state;
    case 'error':
      return event === 'reset' ? 'idle' : state;
  }
};

const stateHistory = Arr.scan(events, stateTransition, 'idle' as State);
// ['idle', 'loading', 'success', 'idle', 'loading', 'error']

// Type inference examples
expectType<typeof runningSum, NonEmptyArray<number>>('=');
expectType<typeof emptyResult, NonEmptyArray<number>>('=');
expectType<
  typeof runningSumFn,
  <T extends readonly number[]>(array: T) => NonEmptyArray<number>
>('=');
expectType<typeof stateHistory, NonEmptyArray<State>>('=');

export {
  allSums,
  analysisResult,
  balances,
  collectingFn,
  datasets,
  emptyArray,
  emptyResult,
  events,
  factorial,
  growing,
  indexed,
  items,
  letters,
  numbers,
  reduced,
  runningMax,
  runningProductFn,
  runningSales,
  runningSum,
  runningSumFn,
  sales,
  scanned,
  sentences,
  singleElement,
  stateHistory,
  stateTransition,
  temperatures,
  transactions,
  words,
};
export type { Event, State };
