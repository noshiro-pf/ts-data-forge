// Example: src/others/if-then.mts
import { ifThen } from 'ts-data-forge';

const implicationTrue = ifThen(true, true);
const implicationFalse = ifThen(true, false);
const vacuousTruth = ifThen(false, false);

const summary = {
  implicationFalse,
  implicationTrue,
  vacuousTruth,
};

// embed-sample-code-ignore-below
export { summary };
