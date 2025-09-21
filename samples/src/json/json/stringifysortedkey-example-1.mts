// Sample code extracted from src/json/json.mts (stringifySortedKey)
import { Json, Result } from 'ts-data-forge';

const unsortedObj = {
  zebra: 'animal',
  apple: 'fruit',
  banana: 'fruit',
};

const sorted = Json.stringifySortedKey(unsortedObj);
if (Result.isOk(sorted)) {
  console.log(sorted.value);
  // '{"apple":"fruit","banana":"fruit","zebra":"animal"}'
}
