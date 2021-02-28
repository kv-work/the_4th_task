class SliderModel implements Model {
  private state: Model.State;
  private observers: Set<Model.Observer>;
  private isReadyNotify: boolean;
  private isUpdated: boolean;
  private lockedValues: Set<string>;

  constructor(options?: Model.Options) {
    this.observers = new Set();
    this.lockedValues = new Set();

    this.state = this.initState(options);

    this.isReadyNotify = true;
    this.isUpdated = true;
  }

  addObserver(observer: Model.Observer): void {
    this.observers.add(observer);
  }

  removeObserver(observer: Model.Observer): void {
    this.observers.delete(observer);
  }

  getState(): Model.State {
    return this.state;
  }

  updateState(state: Model.Options): void {
    const { state: oldState } = this;

    this.isReadyNotify = false;

    if (state.unlockValues !== undefined) {
      this.unlockState(state.unlockValues);
    }

    const newState = this.createState(oldState, state);

    this.state = newState;

    this.isReadyNotify = true;
    if (!this.isUpdated) this.notify();
  }

  lockState(props: string[] | 'all'): void {
    if (Array.isArray(props)) {
      props.forEach((valueName) => {
        switch (valueName) {
          case 'minValue':
            this.lockedValues.add('minValue');
            this.isUpdated = false;
            break;
          case 'maxValue':
            this.lockedValues.add('maxValue');
            this.isUpdated = false;
            break;
          case 'step':
            this.lockedValues.add('step');
            this.isUpdated = false;
            break;
          case 'value':
            this.lockedValues.add('value');
            this.isUpdated = false;
            break;
          case 'secondValue':
            this.lockedValues.add('secondValue');
            this.isUpdated = false;
            break;
          default:
            break;
        }
      });
    }

    if (props === 'all') {
      this.lockedValues.add('maxValue');
      this.lockedValues.add('minValue');
      this.lockedValues.add('step');
      this.lockedValues.add('value');
      this.lockedValues.add('secondValue');
      this.isUpdated = false;
    }

    if (this.isReadyNotify) {
      this.state.lockedValues = Array.from(this.lockedValues);
    }

    if (!this.isUpdated) this.notify();
  }

  unlockState(props: string[] | 'all'): void {
    if (Array.isArray(props)) {
      props.forEach((valueName) => {
        switch (valueName) {
          case 'minValue':
            this.lockedValues.delete('minValue');
            this.isUpdated = false;
            break;
          case 'maxValue':
            this.lockedValues.delete('maxValue');
            this.isUpdated = false;
            break;
          case 'step':
            this.lockedValues.delete('step');
            this.isUpdated = false;
            break;
          case 'value':
            this.lockedValues.delete('value');
            this.isUpdated = false;
            break;
          case 'secondValue':
            this.lockedValues.delete('secondValue');
            this.isUpdated = false;
            break;
          default:
            break;
        }
      });
    }

    if (props === 'all') {
      this.lockedValues.clear();
      this.isUpdated = false;
    }

    if (this.isReadyNotify) {
      this.state.lockedValues = Array.from(this.lockedValues);
    }

    if (!this.isUpdated) this.notify();
  }

  private initState(options?: Model.Options): Model.State {
    const defaultState = {
      maxValue: 10,
      minValue: 0,
      step: 1,
      value: 0,
      secondValue: undefined,
      lockedValues: [],
    };

    return options ? this.createState(defaultState, options) : defaultState;
  }

  private notify(): void {
    if (this.observers.size !== 0 && this.isReadyNotify) {
      this.observers.forEach((observer: Model.Observer): void => {
        observer.update();
      });

      this.isUpdated = true;
    }
  }

  private isLocked(value: string): boolean {
    return (this.lockedValues !== undefined && this.lockedValues.has(value));
  }

  private createState(state: Model.State, newState: Model.Options): Model.State {
    const {
      maxValue: oldMax,
      minValue: oldMin,
      step: oldStep,
      value: oldVal,
      secondValue: oldSecondVal,
    } = state;

    const canChangeMax = !this.isLocked('maxValue') && Object.prototype.hasOwnProperty.call(newState, 'maxValue');
    const canChangeMin = !this.isLocked('minValue') && Object.prototype.hasOwnProperty.call(newState, 'minValue');
    const canChangeStep = !this.isLocked('step') && Object.prototype.hasOwnProperty.call(newState, 'step');
    const canChangeVal = !this.isLocked('value') && Object.prototype.hasOwnProperty.call(newState, 'value');
    const canChangeSecondVal = !this.isLocked('secondValue') && Object.prototype.hasOwnProperty.call(newState, 'secondValue');

    const tempState: Model.Options = {
      maxValue: canChangeMax ? newState.maxValue : undefined,
      minValue: canChangeMin ? newState.minValue : undefined,
      step: canChangeStep ? newState.step : undefined,
      value: canChangeVal ? newState.value : undefined,
      secondValue: canChangeSecondVal ? newState.secondValue : undefined,
    };

    const resultState: Model.State = $.extend(true, {}, state, tempState);
    const {
      maxValue: tempMax,
      minValue: tempMin,
      step: tempStep,
      value: tempVal,
      secondValue: tempSecondVal,
    } = resultState;

    const isWrongState = tempMax <= tempMin || tempStep <= 0;

    if (isWrongState) return state;

    // const resultState: Model.State = $.extend(true, {}, state, newState);
    // const {
    //   maxValue,
    //   minValue,
    //   step,
    //   value: newValue,
    // } = resultState;

    let firstValChanged = false;
    let secondValueChanged = false;

    if (this.isLocked('value')) {
      resultState.value = oldVal;
    } else {
      resultState.value = tempVal;
      firstValChanged = Object.prototype.hasOwnProperty.call(newState, 'value');
    }

    if (Object.prototype.hasOwnProperty.call(newState, 'secondValue') && !this.isLocked('secondValue')) {
      resultState.secondValue = newState.secondValue;
      secondValueChanged = true;
    } else {
      resultState.secondValue = oldSecondVal;
    }

    const { value, secondValue } = resultState;

    if (!SliderModel.isValid(value)) {
      return state;
    }

    if (secondValue === undefined) {
      resultState.value = SliderModel.getMultipleStep(value, resultState);
    } else {
      if (!SliderModel.isValid(secondValue)) {
        return state;
      }

      const resultVal = SliderModel.getMultipleStep(value, resultState);
      const resultSecondVal = SliderModel.getMultipleStep(secondValue, resultState);

      if (resultVal > resultSecondVal) {
        if (canChangeVal && canChangeSecondVal) {
          resultState.value = resultSecondVal;
          resultState.secondValue = resultVal;
        } else if (canChangeVal) {
          resultState.value = resultSecondVal;
          resultState.secondValue = resultSecondVal;
        } else {
          resultState.value = resultVal;
          resultState.secondValue = resultVal;
        }
      } else {
        resultState.value = resultVal;
        resultState.secondValue = resultSecondVal;
      }
    }

    if (newState.lockedValues !== undefined) {
      this.lockState(newState.lockedValues);
    }

    if (!SliderModel.isEqualStates(state, resultState)) {
      this.isUpdated = false;
    }

    return { ...resultState, lockedValues: Array.from(this.lockedValues) };
  }

  static getMultipleStep(value: number, state: Model.State): number {
    const {
      step,
      maxValue: max,
      minValue: min,
    } = state;
    let result: number;
    let tempResult: number;

    switch (true) {
      case (value >= max):
        result = max;
        break;
      case (value <= min):
        result = min;
        break;
      case ((((value - min) % step) / step > 0.5)):
        tempResult = (value - ((value - min) % step) + step);
        if (tempResult > max) {
          result = max;
        } else {
          result = tempResult;
        }
        break;
      default:
        tempResult = (value - ((value - min) % step));
        if ((tempResult + step) >= max && ((max + tempResult) / 2) < value) {
          result = max;
        } else {
          result = (value - ((value - min) % step));
        }
        break;
    }

    return SliderModel.fixVal(result, step);
  }

  static isEqualStates(first: Model.State, second: Model.State): boolean {
    return (first.maxValue === second.maxValue)
      && (first.minValue === second.minValue)
      && (first.step === second.step)
      && (first.value === second.value)
      && (first.secondValue === second.secondValue);
  }

  static isValid(value: number): boolean {
    return !(value === null || Number.isNaN(value) || !Number.isFinite(value));
  }

  static fixVal(value: number, baseVal: number): number {
    if (!(baseVal % 1)) {
      return Number(value.toFixed(0));
    }

    const baseString = baseVal.toString();

    if (baseString.includes('e')) {
      const base = Number(baseString.split('e-')[1]);
      const fixBase = base > 20 ? 20 : base;
      return Number(value.toFixed(fixBase));
    }
    const base = baseString.split('.')[1].length;
    const fixBase = base > 20 ? 20 : base;
    return Number(value.toFixed(fixBase));
  }
}

export default SliderModel;
