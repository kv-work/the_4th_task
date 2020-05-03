interface Observer {
  update(value?: number): void
}

interface Presenter {
  renderView(view: View, renderData: ViewData): void,
  unmountView(view: View): void,
  updateModel(model: Model, updateData: OptionsModel): void
}

interface OptionsModel {
  maxValue: number,
  minValue: number,
  value: number,
  step: number
}


interface Model {
  getState(): OptionsModel,
  updateState(state: OptionsModel | {option: number}): void,
  setValue(value: number): void,
  addObserver(observer: Observer): void,
  removeObserver(observer: Observer): void
}

interface ViewData {
  value: number,
  step: number,
  interval: [number, number]
}

interface View {
  render(viewData: ViewData): void,
  update(viewData: ViewData): void,
  unmount(): void,
  addObserver(observer: Observer): void,
  removeObserver(observer: Observer): void
}

export {
  OptionsModel,
  Model,
  Observer,
  ViewData,
  View
}