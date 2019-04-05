import { DirectiveView } from "presentation-decorator";
import Dom from "presentation-dom";

import { createTemplate } from "./functions.js";

const FILTER_FORM_ID = "filterForm";
const Logger = console;

class FacetView extends DirectiveView {
  constructor(options) {
    super(options);
    this._filters = [];
  };

  addFilter(id, name, collection) {
    this._filters.push({ "id": id, "name": name, "collection": collection });
  };

  render() {
    createTemplate(this);
    return super.render();
  };

  remove() {
    return super.remove();
  };

  submit(e) {
    e.preventDefault();
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
    Logger.debug("form:" + json);
    //this.sendMessage(FETCH_ASSETS, json);
  };

  collapse(e) {
    const id = e.target.getAttribute(`data-${this.name}`);
    const el = Dom.toggleClass(`#${id}`, "collapse");
    Dom.toggleClass(e.target, "collapse");
    Logger.debug(`Toggle - ${el} id: ${id}`);
  };

  filter(e) {
    Logger.debug("Filter was changed - submit");
    this.submit(e);
  };

  toggle(hide) {
    //alert("hide " + hide + " el " + this.el);
    if (hide) {
      const myEl = Dom.selector(this.el);
      if (myEl) {
        myEl.classList.add("hide");
      } else {
        Logger.warn("El did not select");
      }
    } else {
      const myEl = Dom.selector(this.el);
      if (myEl) {
        myEl.classList.remove("hide");
      } else {
        Logger.warn("El did not select");
      }
    }
  };
};

export default FacetView;
