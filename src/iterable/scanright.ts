import { IterableX } from '../iterable';
import { toArray } from './toarray';

class ScanRightIterable<T, R> extends IterableX<R> {
  private _source: Iterable<T>;
  private _fn: (acc: T | R, x: T, index: number) => R;
  private _seed?: T | R;
  private _hasSeed: boolean;

  constructor(source: Iterable<T>, fn: (acc: T | R, x: T, index: number) => R, ...args: (T | R)[]) {
    super();
    this._source = source;
    this._fn = fn;
    this._hasSeed = args.length === 1;
    this._seed = args[0];
  }

  *[Symbol.iterator]() {
    let hasValue = false;
    const source = toArray(this._source);
    for (let offset = source.length - 1; offset >= 0; offset--) {
      const item = source[offset];
      if (hasValue || (hasValue = this._hasSeed)) {
        this._seed = this._fn(<R>this._seed, item, offset);
        yield this._seed;
      } else {
        this._seed = item;
        hasValue = true;
      }
    }
  }
}

export function scanRight<T>(
  source: Iterable<T>,
  accumulator: (acc: T, value: T, index: number) => T
): IterableX<T>;
export function scanRight<T, R = T>(
  source: Iterable<T>,
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R
): IterableX<R>;
export function scanRight<T, R = T>(
  source: Iterable<T>,
  accumulator: (acc: T | R, value: T, index: number) => R,
  ...args: (T | R)[]
): IterableX<T | R> {
  return new ScanRightIterable(source, accumulator, ...args);
}
