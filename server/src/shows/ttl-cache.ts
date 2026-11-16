const TTL_MS = 5 * 60 * 1000;

export class TtlCache<T> {
  private store: Record<string, T> = {};
  private timers = new Map<string, NodeJS.Timeout>();

  get(key: string): T | undefined {
    return this.store[key];
  }

  set(key: string, value: T): void {
    const existing = this.timers.get(key);
    if (existing) {
      clearTimeout(existing);
    }

    this.store[key] = value;

    const timer = setTimeout(() => {
      delete this.store[key];
      this.timers.delete(key);
    }, TTL_MS);
    timer.unref();

    this.timers.set(key, timer);
  }
}