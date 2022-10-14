type Listener<T> = (newValue: T) => void;

export class Signal<T> {
  private listeners: Listener<T>[] = [];

  public dispatch(newValue: T) {
    for (const l of this.listeners) {
      l(newValue);
    }
  }

  public add(listener: Listener<T>) {
    this.listeners.push(listener)
  }

  public remove(listener: Listener<T>) {
    this.listeners.filter((l) => {
      return l !== listener;
    })
  }
}