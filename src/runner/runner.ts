/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import $ from 'jquery';

class SliderRunner implements Runner {
  private $view: JQuery;
  private $runner: JQuery;
  private isRendered: boolean;
  private isSecond: boolean;

  constructor(options: Runner.InitOptions) {
    this.$view = options.$viewContainer;
    this.isRendered = false;
    this.isSecond = (options.isSecond === true);
  }

  render(data: View.RenderData, options: Runner.RenderOptions): void {
    let value: number;
    let percentage: number;
    if (Array.isArray(data.percentage) && Array.isArray(data.value)) {
      const [from, to] = data.value;
      const [fromPercentage, toPercentage] = data.percentage;

      value = this.isSecond ? to : from;
      percentage = this.isSecond ? toPercentage : fromPercentage;
    }

    if (!Array.isArray(data.percentage) && !Array.isArray(data.value)) {
      value = data.value;
      percentage = data.percentage;
    }

    this.$runner = SliderRunner.createRunner(value, options);
    this.attacheEventHandlers();

    if (options.isHorizontal) {
      this.$runner.css({ left: percentage });
    } else {
      this.$runner.css({ top: percentage });
    }

    if (this.isSecond) {
      this.$runner.addClass('runner_second');
    } else {
      this.$runner.addClass('runner_first');
    }

    if (this.isRendered && this.isSecond) {
      this.$view.find('.runner_second').replaceWith(this.$runner);
    } else if (this.isRendered) {
      this.$view.find('.runner_first').replaceWith(this.$runner);
    } else {
      this.$view.append(this.$runner);
      this.isRendered = true;
    }
  }

  destroy(): void {}

  private attacheEventHandlers(): void {
    this.$runner.on('mousedown', this.dragStartHandler.bind(this));
    this.$runner.on('dragstart', false);
  }

  private dragStartHandler(event: JQuery.MouseDownEvent): void {
    const $startEvent = $.Event('startChanging');
    this.$view.trigger($startEvent);
    const runner = event.currentTarget;
    const renderOptions = $(runner).data('options');
    this.$runner.css('cursor', 'grabbing');

    const mouseMoveHandler = this.makeMouseMoveHandler(renderOptions);
    this.$view.on('mousemove', mouseMoveHandler);
  }

  private makeMouseMoveHandler(opts: Runner.RenderOptions): JQuery.EventHandler<HTMLElement, JQuery.Event> {
    let moveCoord: number;
    let selectedVal: number;
    const view: HTMLElement = this.$view[0];
    const elemMetrics: DOMRect = view.getBoundingClientRect();

    const mouseMoveHandler = (e: JQuery.MouseMoveEvent): void => {
      if (opts.isHorizontal) {
        moveCoord = e.clientX - elemMetrics.x;
        selectedVal = (moveCoord / elemMetrics.width) * 100;
      } else {
        moveCoord = e.clientY - elemMetrics.y;
        selectedVal = (moveCoord / elemMetrics.height) * 100;
      }

      const $changeEvent = $.Event('changeValue', {
        newValue: selectedVal,
        isSecond: this.isSecond,
      });
      this.$view.trigger($changeEvent);

      document.onmouseup = (): void => {
        this.$view.off('mousemove', mouseMoveHandler);
        this.$runner.css('cursor', 'grab');

        const $finishEvent = $.Event('finish', {
          value: selectedVal,
          isSecond: this.isSecond,
        });
        this.$view.trigger($finishEvent);

        document.onmouseup = null;
      };
    };

    return mouseMoveHandler;
  }

  static createRunner(value: number, options: Runner.RenderOptions): JQuery {
    const $runner = $('<div>', {
      class: 'js-slider__runner slider__runner',
    });

    const runnerOptions = $.extend({
      isHorizontal: true,
      displayValue: false,
      prefix: '',
      postfix: '',
    }, options);

    $runner.data('options', runnerOptions);
    $runner.data('value', value);

    if (runnerOptions.isHorizontal) {
      $runner.addClass('slider__runner_horizontal');
    }

    return $runner;
  }
}

export default SliderRunner;