import { DirectiveView } from "presentation-decorator";
import Dom from "presentation-dom";
import Facet from "./models/facet.js";

import { createTemplate } from "./functions.js";
import { FACET_FORM_ID, DEFAULT_STYLE } from "./constants.js";

/**
 * Simple selection facet view
 * @extends DirectiveView
 */
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
    if (options.facets) {
      this._facets = options.facets;
    } else {
      this._facets = [];
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

  /**
   * Add a filter to render
   * @param {string} identifier ID of the group
   * @param {string} name Name of the group
   * @param {Array} data Array of objects { name: value } of the selections
   * @param {string} type A facet type (defaults to check)
   */
  addFacet(identifier, name, data, type) {
    if (identifier && name && data) {
      return this._facets.push(new Facet({ "identifier": identifier, "name": name, "data": data, "type": type }));
    }
    return this._facets.length;
  };

  /**
   * Raw data of the filter data passed rendered
   * @property {Array} facets
   */
  get facets() {
    return this._facets;
  };

  set facets(facets) {
    if (facets) {
      this._facets = facets;
    } else {
      this._facets = [];
    }
  };

  /**
   * Render the view
   */
  render() {
    this.template = createTemplate(this.name, this._facets, this._title, this._button);
    super.render();
    this.syncAllBoundElements();
    this.delegateEvents();
    return this;
  };

  /**
   * Remove the view
   */
  remove() {
    return super.remove();
  };

  /**
   * Submit the selections
   */
  submit(e) {
    e.preventDefault();
    return this;
  };

  /**
   * @property {Object} selections
   * @returns {Object} Returns an object of keys and values of selections from the facets
   */
  get selections() {
    let json = {};
    try {
      const formData = new FormData(Dom.selector(`#${FACET_FORM_ID}`));
      if (formData) {
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
        json = JSON.stringify(object);
      } else {
        throw new Error(`Could not read facet form for id ${FACET_FORM_ID}.`);
      }
    } catch(e) {
      console.error(e);
    }
    return json;
  };

  collapse(e) {
    const id = e.target.getAttribute(`data-${this.name}`);
    const el = Dom.toggleClass(`#${id}`, "collapse");
    Dom.toggleClass(e.target, "collapse");
    //console.debug(`Toggle - ${el} id: ${id}`);
  };

  facet(e) {
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
        console.warn("El for facet did not select.");
      }
    } else {
      const myEl = Dom.selector(this.el);
      if (myEl) {
        myEl.classList.remove("hide");
      } else {
        console.warn("El for facet did not select.");
      }
    }
  };
};

export default FacetView;
