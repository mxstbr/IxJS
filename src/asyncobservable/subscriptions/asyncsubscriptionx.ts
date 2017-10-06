import { AsyncSubscription } from '../asyncsubscription';

const NOOP_PROMISE = Promise.resolve<void>(undefined);

export class AsyncSubscriptionX {
  static create(unsubscribe: () => Promise<void>): AsyncSubscription {
    return new AnonymousSubscription(unsubscribe);
  }

  static empty() {
    return NOOP_PROMISE;
  }
}

class AnonymousSubscription implements AsyncSubscription {
  private _unsubscribe?: () => Promise<void>;

  constructor(unsubscribe: () => Promise<void>) {
    this._unsubscribe = unsubscribe;
  }

  async unsubscribe() {
    if (this._unsubscribe) {
      await this._unsubscribe();
      this._unsubscribe = undefined;
    } else {
      await NOOP_PROMISE;
    }
  }
}
