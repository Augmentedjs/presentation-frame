import { DirectiveView } from "presentation-decorator";
import Dom from "presentation-dom";
import styles from "./styles/main.scss";

import { createTemplate } from "./functions.js";

const FILTER_FORM_ID = "filterForm";

const renderMe = async (view) => {
  view.template = await createTemplate(view);
};

const syncMe = async (view) => {
  const l = view._filters.length;
  let i = 0;
  for (i; i < l; i++) {
    await view.syncBoundElement(view._filters[i].id);
  }
};

class FacetView extends DirectiveView {
  constructor(options) {
    if (!options) {
      options = {};
    }
    if (options.style) {
      options.style += " filters";
    } else {
      options.style = "filters";
    }

    super(options);
    this._filters = [];
  };

  addFilter(id, name, collection) {
    this._filters.push({ "id": id, "name": name, "collection": collection });
  };

  render() {
    this.template = createTemplate(this);
    super.render();
    /*const l = this._filters.length;
    let i = 0;
    for (i; i < l; i++) {
      this.syncBoundElement(this._filters[i].id);
    }*/
    this.syncAllBoundElements();
    this.delegateEvents();
    return this;
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
    console.debug("form:" + json);
    //this.sendMessage(FETCH_ASSETS, json);
  };

  collapse(e) {
    const id = e.target.getAttribute(`data-${this.name}`);
    const el = Dom.toggleClass(`#${id}`, "collapse");
    Dom.toggleClass(e.target, "collapse");
    console.debug(`Toggle - ${el} id: ${id}`);
  };

  filter(e) {
    console.debug("Filter was changed - submit");
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
