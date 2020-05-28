declare interface Model {
  getState(): Model.Options;
  updateState(state: Model.Options): void;
  addObserver(observer: Model.Observer): void;
  removeObserver(observer: Model.Observer): void;
  unlockState(props: string[] | 'all'): void;
  lockState(props: string[] | 'all'): void;
}

declare namespace Model {
  interface Options {
    maxValue?: number;
    minValue?: number;
    step?: number;
    value?: number;
    secondValue?: number;
  }

  interface Observer {
    update?(): void;
  }
}