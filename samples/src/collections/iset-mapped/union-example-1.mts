// Sample code extracted from src/collections/iset-mapped.mts (union)
import { ISetMapped } from 'ts-data-forge';

type FeatureFlag = { flagName: string };
const flagToKey = (f: FeatureFlag): string => f.flagName;
const keyToFlag = (name: string): FeatureFlag => ({ flagName: name });

const setA = ISetMapped.create<FeatureFlag, string>(
  [{ flagName: 'newUI' }, { flagName: 'betaFeature' }],
  flagToKey,
  keyToFlag,
);
const setB = ISetMapped.create<FeatureFlag, string>(
  [{ flagName: 'betaFeature' }, { flagName: 'darkMode' }],
  flagToKey,
  keyToFlag,
);

const combinedFlags = ISetMapped.union(setA, setB);
// The order might vary as sets are unordered internally.
console.log(
  combinedFlags
    .toArray()
    .map((f) => f.flagName)
    .toSorted(),
);
// Output: ["betaFeature", "darkMode", "newUI"]
