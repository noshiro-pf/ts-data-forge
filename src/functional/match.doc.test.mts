import { match } from './match.mjs';

describe('match', () => {
  test('Exhaustive matching (no default needed):', () => {
    type Status = 'loading' | 'success' | 'error';
    const status: Status = 'loading';

    const message = match(status, {
      loading: 'Please wait...',
      success: 'Operation completed!',
      error: 'Something went wrong',
    } as const);
    // Type: string
    assert(message === 'Please wait...');
  });

  test('Partial matching (default required):', () => {
    type Priority = 'low' | 'medium' | 'high' | 'critical';
    const priority: Priority = 'medium';

    const color = match(
      priority,
      {
        high: 'red',
        critical: 'darkred',
      } as const,
      'gray',
    ); // Default required for uncovered cases
    // Type: 'red' | 'darkred' | 'gray'
    assert(color === 'gray');
  });

  test('Working with general string types:', () => {
    const userInput: string = 'unknown';

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
    assert(route === '/404');
  });

  test('HTTP status code handling:', () => {
    type HttpStatus = 200 | 404 | 500;
    const status: HttpStatus = 404;

    const response = match(String(status), {
      '200': { ok: true, message: 'Success' },
      '404': { ok: false, message: 'Not Found' },
      '500': { ok: false, message: 'Server Error' },
    });
    // All cases covered, no default needed
    assert.deepStrictEqual(response, { ok: false, message: 'Not Found' });
  });

  test('Complex discriminated union handling:', () => {
    type ApiResponse =
      | { status: 'loading' }
      | { status: 'success'; data: string }
      | { status: 'error'; error: string };

    const handleResponse = (response: ApiResponse): string =>
      match(response.status, {
        loading: 'Please wait...',
        success: 'Data loaded successfully!',
        error: 'Failed to load data',
      });

    const response: ApiResponse = { status: 'loading' };
    assert(handleResponse(response) === 'Please wait...');
  });

  test('Advanced usage with functional composition:', () => {
    // Creating reusable matchers
    const logLevelToColor = (level: string): string =>
      match(
        level,
        {
          debug: 'gray',
          info: 'blue',
          warn: 'yellow',
          error: 'red',
        },
        'black',
      ); // Default for unknown levels

    const logLevelToIcon = (level: string): string =>
      match(
        level,
        {
          debug: '🐛',
          info: 'ℹ️',
          warn: '⚠️',
          error: '❌',
        },
        '📝',
      );

    // Combining matchers
    const formatLogEntry = (
      level: string,
      message: string,
    ): { color: string; icon: string; text: string } => ({
      color: logLevelToColor(level),
      icon: logLevelToIcon(level),
      text: `${logLevelToIcon(level)} ${message}`,
    });

    assert(logLevelToColor('error') === 'red');
    assert(logLevelToIcon('info') === 'ℹ️');
    assert(logLevelToColor('unknown') === 'black');
    assert(formatLogEntry('error', 'Test').color === 'red');
  });
});
