import { PartialAsyncObserver } from './asyncobserver';
import { AsyncSubscription } from './asyncsubscription';

export interface AsyncObservable<T> {
  susbcribe: (observer: PartialAsyncObserver<T>) => AsyncSubscription;
}
