// Sample code extracted from src/functional/match.mts (match)
// Working with general string types:

import { match } from 'ts-data-forge';

const userInput: string = getUserInput();

const route = match(
  userInput,
  {
    home: '/',
    about: '/about',
    contact: '/contact',
  },
  '/404',
); // Default required for string type
// Type: '/' | '/about' | '/contact' | '/404'
