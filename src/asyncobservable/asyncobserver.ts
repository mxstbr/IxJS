export interface NextAsyncObserver<T> {
  next: (value: T) => Promise<void>;
  error?: (err: any) => Promise<void>;
  complete?: () => Promise<void>;
}

export interface ErrorAsyncObserver<T> {
  next?: (value: T) => Promise<void>;
  error: (err: any) => Promise<void>;
  complete?: () => Promise<void>;
}

export interface CompletionAsyncObserver<T> {
  next?: (value: T) => Promise<void>;
  error?: (err: any) => Promise<void>;
  complete: () => Promise<void>;
}

export type PartialAsyncObserver<T> =
  NextAsyncObserver<T> |
  ErrorAsyncObserver<T> |
  CompletionAsyncObserver<T>;

export interface AsyncObserver<T> {
  next: (value: T) => Promise<void>;
  error: (err: any) => Promise<void>;
  complete: () => Promise<void>;
}
