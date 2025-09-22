// Sample code extracted from src/number/num.mts (isUintInRangeInclusive)
import { Num } from 'ts-data-forge';

const isValidScore = Num.isUintInRangeInclusive(0, 100);
const score: number = getTestScore();
if (isValidScore(score)) {
  // score is typed as 0 | 1 | 2 | ... | 100
  const grade = calculateGrade(score);
}

export { isValidScore, score };
