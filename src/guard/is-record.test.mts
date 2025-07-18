import { expectType } from '../expect-type.mjs';
import { isRecord } from './is-record.mjs';

describe('isRecord', () => {
  test('{ x: 1 } is a record', () => {
    const obj = { x: 1 } as const;
    const unk: unknown = obj;
    const res = isRecord(unk);

    expectType<typeof obj, UnknownRecord>('<=');
    expectType<typeof res, boolean>('=');

    if (res) {
      expectType<typeof unk, UnknownRecord>('=');
    }

    expect(res).toBe(true);
  });

  test('{} is a record', () => {
    const obj = {} as const;
    const unk: unknown = obj;
    const res = isRecord(unk);

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    expectType<typeof obj, {}>('=');
    expectType<typeof res, boolean>('=');

    if (res) {
      expectType<typeof unk, UnknownRecord>('=');
    }

    expect(res).toBe(true);
  });

  test('[] is not a record', () => {
    const obj: DeepReadonly<never[]> = [] as const;
    const unk: unknown = obj;
    const res = isRecord(unk);

    expectType<typeof obj, readonly never[]>('=');
    expectType<typeof res, boolean>('=');

    expect(res).toBe(false);
  });

  test('null is not a record', () => {
    const obj = null;
    const unk: unknown = obj;
    const res = isRecord(unk);

    expectType<typeof obj, null>('=');
    expectType<typeof res, boolean>('=');

    expect(res).toBe(false);
  });

  test('undefined is not a record', () => {
    const obj = undefined;
    const unk: unknown = obj;
    const res = isRecord(unk);

    expectType<typeof obj, undefined>('=');
    expectType<typeof res, boolean>('=');

    expect(res).toBe(false);
  });

  test('3 is not a record', () => {
    const obj = 3;
    const unk: unknown = obj;
    const res = isRecord(unk);

    expectType<typeof obj, 3>('=');
    expectType<typeof res, boolean>('=');

    expect(res).toBe(false);
  });

  test('"str" is not a record', () => {
    const obj = 'str';
    const unk: unknown = obj;
    const res = isRecord(unk);

    expectType<typeof obj, 'str'>('=');
    expectType<typeof res, boolean>('=');

    expect(res).toBe(false);
  });

  // test('Map is not a record', () => {
  //   const obj = new MutableMap();
  //   const unk: unknown = obj;
  //   const res = isRecord(unk);

  //   assertNotType<typeof obj, UnknownRecord>("<=");
  //   expectType<typeof res, boolean>("=");

  //   expect(res).toBe(false);
  // });

  // test('Set is not a record', () => {
  //   const obj = new MutableSet();
  //   const unk: unknown = obj;
  //   const res = isRecord(unk);

  //   assertNotType<typeof obj, UnknownRecord>("<=");
  //   expectType<typeof res, boolean>("=");

  //   expect(res).toBe(false);
  // });
});
