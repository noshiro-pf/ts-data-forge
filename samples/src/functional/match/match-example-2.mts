// Sample code extracted from src/functional/match.mts (match)
// Partial matching (default required):

import { match } from 'ts-data-forge';

type Priority = 'low' | 'medium' | 'high' | 'critical';
const priority: Priority = 'medium';

const color = match(
  priority,
  {
    high: 'red',
    critical: 'darkred',
  },
  'gray',
); // Default required for uncovered cases
// Type: 'red' | 'darkred' | 'gray'
// Result: 'gray'
