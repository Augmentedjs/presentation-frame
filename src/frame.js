import { DecoratorView } from "presentation-decorator";

/**
 * Application Frame
 * @memberof Presentation.Component
 * @extends Presentation.DecoratorView
 */
class Frame extends DecoratorView {
  constructor(options) {
    if (!options) {
      options = {}
    }
    if (!options.name) {
      options.name = "frame";
    }
    if (!options.style) {
      options.style = "frame";
    } else {
      options.style= `frame ${options.style}`;
    }
    super(options);
  };


  /**
   * style property - the style
   * @property style
   */
   set style(style) {
     this._style = style;
   };

   get style() {
     return this._style;
   };

  /**
   * render
   */
  render() {
    if (this.el) {
      Dom.setValue(this.el, this._template());
      this.delegateEvents();
    }
    return this;
  };

  /**
   * remove
   */
  remove() {
    this.removeTemplate(this.el, true);
    return super.remove();
  };
};

export default Frame;
