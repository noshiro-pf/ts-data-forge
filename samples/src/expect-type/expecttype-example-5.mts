// Example: src/expect-type.mts
import { expectType } from 'ts-data-forge';

type BrandedNumber = number & { readonly __brand: unique symbol };
const value = 1 as BrandedNumber;
expectType<typeof value, BrandedNumber>('=');

