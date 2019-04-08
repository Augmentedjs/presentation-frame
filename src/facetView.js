import { DirectiveView } from "presentation-decorator";
import Dom from "presentation-dom";
// import styles from "./styles/main.scss";

import { createTemplate, renderMe, syncMe } from "./functions.js";
import { FILTER_FORM_ID } from "./constants.js";

const DEFAULT_STYLE = "filters";

class FacetView extends DirectiveView {
  constructor(options) {
    if (!options) {
      options = {};
    }
    if (options.style) {
      options.style += ` ${DEFAULT_STYLE}`;
    } else {
      options.style = DEFAULT_STYLE;
    }

    super(options);
    if (options.filters) {
      this._filters = options.filters;
    } else {
      this._filters = [];
    }

    if (options.title) {
      this._title = options.title;
    } else {
      this._title = null;
    }

    if (options.button && options.button) {
      this._button = options.button;
    } else {
      this._button = null;
    }
  };

  addFilter(id, name, collection) {
    this._filters.push({ "id": id, "name": name, "collection": collection });
  };

  get filters() {
    return this._filters;
  };

  set filters(filters) {
    if (filters) {
      this._filters = filters;
    } else {
      this._filters = [];
    }
  };

  render() {
    this.template = createTemplate(this);
    super.render();
    this.syncAllBoundElements();
    this.delegateEvents();
    return this;
  };

  remove() {
    return super.remove();
  };

  submit(e) {
    e.preventDefault();
    return this;
  };

  get selections() {
    const formData = new FormData(document.querySelector(`#${FILTER_FORM_ID}`));
    const object = {};
    formData.forEach((value, key) => {
      if (object[key]) {
        if (Array.isArray(object[key])) {
          object[key].push(value);
        } else {
          const arr = [];
          arr.push(object[key]);
          arr.push(value);
          object[key] = arr;
        }
      } else {
        object[key] = value;
      }
    });
    const json = JSON.stringify(object);
    return json;
  };

  collapse(e) {
    const id = e.target.getAttribute(`data-${this.name}`);
    const el = Dom.toggleClass(`#${id}`, "collapse");
    Dom.toggleClass(e.target, "collapse");
    //console.debug(`Toggle - ${el} id: ${id}`);
  };

  filter(e) {
    //console.debug("Filter was changed - submit");
    this.submit(e);
  };

  toggle(hide) {
    //alert("hide " + hide + " el " + this.el);
    if (hide) {
      const myEl = Dom.selector(this.el);
      if (myEl) {
        myEl.classList.add("hide");
      } else {
        console.warn("El did not select");
      }
    } else {
      const myEl = Dom.selector(this.el);
      if (myEl) {
        myEl.classList.remove("hide");
      } else {
        console.warn("El did not select");
      }
    }
  };
};

export default FacetView;
