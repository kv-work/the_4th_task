import SliderValuesDisplay from '../values-display';

describe('SliderValuesDisplay', () => {
  document.body.innerHTML = `
    <div id="view_container"></div>
    <div id="view_container_horizontal"></div>
  `;

  HTMLElement.prototype.getBoundingClientRect = function getMetrics(): DOMRect {
    return {
      x: $(this).data('data') !== undefined ? $(this).data('data') - 5 : 0,
      y: $(this).data('data') !== undefined ? $(this).data('data') - 5 : 0,
      height: $(this).data('data') !== undefined ? 10 : 100,
      width: $(this).data('data') !== undefined ? 10 : 100,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      toJSON: (): void => {},
    };
  };

  const $horizontalView = $('#view_container_horizontal');
  const $verticalView = $('#view_container');

  let testValDisplay: SliderValuesDisplay;
  let vertValDisplay: SliderValuesDisplay;

  const updOpts: ValuesDisplay.RenderOptions = {
    isHorizontal: true,
    prefix: '+',
    postfix: '$',
  };
  const vertUpdOpts: ValuesDisplay.RenderOptions = {
    ...updOpts,
    isHorizontal: false,
  };

  const renderData: View.RenderData = {
    data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    percentageData: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    value: 10,
    percentage: 10,
  };
  const rangeRenderData: View.RenderData = {
    data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    percentageData: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    value: [10, 50],
    percentage: [10, 50],
  };

  beforeEach(() => {
    testValDisplay = new SliderValuesDisplay({ $viewContainer: $horizontalView });
    vertValDisplay = new SliderValuesDisplay({ $viewContainer: $verticalView });
  });

  describe('constructor', () => {
    test('should save $view in prop', () => {
      expect(testValDisplay).toHaveProperty('$view', $horizontalView);
      expect(vertValDisplay).toHaveProperty('$view', $verticalView);
    });

    test('should create $displayContainer element', () => {
      expect(testValDisplay).toHaveProperty('$displayContainer');
      expect(vertValDisplay).toHaveProperty('$displayContainer');
    });

    test('should reset isRendered flag', () => {
      expect(testValDisplay).toHaveProperty('isRendered', false);
      expect(vertValDisplay).toHaveProperty('isRendered', false);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      testValDisplay.update({ data: renderData, options: updOpts });
      vertValDisplay.update({ data: renderData, options: vertUpdOpts });
    });

    afterEach(() => {
      testValDisplay.destroy();
      vertValDisplay.destroy();
    });

    test('should add "slider__display_container_horizontal" class to $displayContainer if options.isHorizontal is true', () => {
      expect($horizontalView.find('.slider__display_container').length).toBe(1);
      expect($horizontalView.find('.slider__display_container_horizontal').length).toBe(1);
      expect($verticalView.find('.slider__display_container').length).toBe(1);
      expect($verticalView.find('.slider__display_container_horizontal').length).toBe(0);

      vertValDisplay.update({ data: renderData, options: updOpts });
      expect($verticalView.find('.slider__display_container_horizontal').length).toBe(1);
      vertValDisplay.update({ data: renderData, options: vertUpdOpts });
      expect($verticalView.find('.slider__display_container_horizontal').length).toBe(0);
    });

    test('should add "slider__display_value_horizontal" class to $secondValDisplay if options.isHorizontal is true', () => {
      vertValDisplay.update({ data: rangeRenderData, options: updOpts });
      expect($verticalView.find('.slider__display_value_horizontal').length).toBe(2);
      vertValDisplay.update({ data: rangeRenderData, options: vertUpdOpts });
      expect($verticalView.find('.slider__display_value_horizontal').length).toBe(0);

      const newData: View.RenderData = {
        data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        percentageData: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        value: 0,
        percentage: 0,
      };

      vertValDisplay.update({ data: newData, options: vertUpdOpts });
      expect($verticalView.find('.slider__display_value_horizontal').length).toBe(0);

      newData.value = 100;
      newData.percentage = 100;

      vertValDisplay.update({ data: newData, options: vertUpdOpts });
      expect($verticalView.find('.slider__display_value_horizontal').length).toBe(0);

      newData.value = [0, 100];
      newData.percentage = [0, 100];

      vertValDisplay.update({ data: newData, options: vertUpdOpts });
      expect($verticalView.find('.slider__display_value_horizontal').length).toBe(0);

      vertValDisplay.update({ data: newData, options: updOpts });
      expect($verticalView.find('.slider__display_value_horizontal').length).toBe(2);

      newData.value = 100;
      newData.percentage = 100;

      vertValDisplay.update({ data: newData, options: updOpts });
      expect($verticalView.find('.slider__display_value_horizontal').length).toBe(1);
    });

    test('should create and append $valueDisplay and $secondValueDisplay (if data.value is array) to $displayContainer', () => {
      const $horizontalDisplay = $horizontalView.find('.slider__display_container');
      const $verticalDisplay = $verticalView.find('.slider__display_container');

      expect($horizontalDisplay.find('.slider__display_value').length).toBe(1);
      expect($verticalDisplay.find('.slider__display_value').length).toBe(1);

      testValDisplay.update({ data: rangeRenderData, options: updOpts });
      vertValDisplay.update({ data: rangeRenderData, options: vertUpdOpts });
      expect($horizontalDisplay.find('.slider__display_value').length).toBe(2);
      expect($verticalDisplay.find('.slider__display_value').length).toBe(2);

      testValDisplay.update({ data: renderData, options: updOpts });
      vertValDisplay.update({ data: renderData, options: vertUpdOpts });

      expect($horizontalDisplay.find('.slider__display_value').length).toBe(1);
      expect($verticalDisplay.find('.slider__display_value').length).toBe(1);

      testValDisplay.destroy();
      vertValDisplay.destroy();

      expect($horizontalDisplay.find('.slider__display_value').length).toBe(0);
      expect($verticalDisplay.find('.slider__display_value').length).toBe(0);

      testValDisplay.update({ data: rangeRenderData, options: updOpts });
      vertValDisplay.update({ data: rangeRenderData, options: vertUpdOpts });

      expect($horizontalDisplay.find('.slider__display_value').length).toBe(2);
      expect($verticalDisplay.find('.slider__display_value').length).toBe(2);
    });

    test('should append $displayContainer to $view', () => {
      const $horizontalDisplay = $horizontalView.find('.slider__display_container');
      const $verticalDisplay = $verticalView.find('.slider__display_container');

      expect($horizontalDisplay.length).toBe(1);
      expect($verticalDisplay.length).toBe(1);
    });

    test('should set isRendered flag to true', () => {
      expect(testValDisplay).toHaveProperty('isRendered', true);
      expect(vertValDisplay).toHaveProperty('isRendered', true);
    });

    test('should add prefix and postfix to values', () => {
      const $horizontalDisplay = $horizontalView.find('.slider__display_container');
      const $verticalDisplay = $verticalView.find('.slider__display_container');

      expect($horizontalDisplay.find('.slider__display_value').html()).toBe('+10$');
      expect($verticalDisplay.find('.slider__display_value').html()).toBe('+10$');

      testValDisplay.update({ data: rangeRenderData, options: updOpts });
      vertValDisplay.update({ data: rangeRenderData, options: vertUpdOpts });

      expect($horizontalDisplay.find('.slider__display_value').eq(0).html()).toBe('+10$');
      expect($horizontalDisplay.find('.slider__display_value').eq(1).html()).toBe('+50$');
      expect($verticalDisplay.find('.slider__display_value').eq(0).html()).toBe('+10$');
      expect($verticalDisplay.find('.slider__display_value').eq(1).html()).toBe('+50$');

      const newUpdOpts = {
        ...updOpts,
        prefix: '',
        postfix: '',
      };

      testValDisplay.update({ data: rangeRenderData, options: newUpdOpts });
      expect($horizontalDisplay.find('.slider__display_value').eq(0).html()).toBe('10');
      expect($horizontalDisplay.find('.slider__display_value').eq(1).html()).toBe('50');

      testValDisplay.update({ data: renderData, options: newUpdOpts });
      expect($horizontalDisplay.find('.slider__display_value').eq(0).html()).toBe('10');
    });

    test('should save options and data in data-attrs of $displayContainer', () => {
      const $displayContainer = $horizontalView.find('.slider__display_container');
      expect($displayContainer.data()).toEqual({
        data: renderData.value,
        options: updOpts,
      });
    });
  });

  describe('destroy', () => {
    beforeEach(() => {
      testValDisplay.update({ data: renderData, options: updOpts });
      vertValDisplay.update({ data: renderData, options: vertUpdOpts });
    });

    test('should detach $displayContainer', () => {
      testValDisplay.destroy();
      vertValDisplay.destroy();

      const $horizontalDisplay = $horizontalView.find('.slider__display_container');
      const $verticalDisplay = $verticalView.find('.slider__display_container');

      expect($horizontalDisplay.length).toBe(0);
      expect($verticalDisplay.length).toBe(0);

      const newValDisplay = new SliderValuesDisplay({ $viewContainer: $horizontalView });
      newValDisplay.destroy();
      expect($horizontalView.find('.slider__display_container').length).toBe(0);
      expect($horizontalView.find('.slider__display_value').length).toBe(0);
    });

    test('should reset isRendered flag', () => {
      expect(testValDisplay).toHaveProperty('isRendered', true);
      expect(vertValDisplay).toHaveProperty('isRendered', true);
      testValDisplay.destroy();
      vertValDisplay.destroy();
      expect(testValDisplay).toHaveProperty('isRendered', false);
      expect(vertValDisplay).toHaveProperty('isRendered', false);
    });
  });
});