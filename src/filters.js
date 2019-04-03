import { DirectiveView } from "presentation-decorator";
import Application from "../application/application.js";
import Logger from "../logger/logger.js";
import Dom from "presentation-dom";
import { FETCH_ASSETS } from "../constants/messages.js";
// collections
import Vendors from "../collections/vendors.js";
//import DataCenters from "../collections/dataCenters.js";
//import Locations from "../collections/locations.js";
import Projects from "../collections/projects.js";

const STATUS = [
  { "name": "Ordered", "value": "ordered" },
  { "name": "Shipped", "value": "shipped" }
];

const MOUNT_POINT = "#filters";
const FILTER_FORM_ID = "filterForm";
const FIELDS = {
  "ASSETS": { "name": "Assets", "id": "assets" },
  "CONTRACTS": { "name": "Contracts", "id": "contracts" },
  "SEARCH": { "name": "Search", "id": "search" },
  "VENDOR": { "name": "Vendors", "id": "vendor" },
  "LOCATIONS": { "name": "Locations", "id": "locations" },
  "PROJECT": { "name": "Projects", "id": "project" },
  "STATUS": { "name": "Status", "id": "status" }
};

const createCheckboxes = (viewName, field, group) => {
  let html = "", i = 0;
  const l = (field.length) ? (field.length) : 0;
  for (i = 0; i < l; i++) {
    html += `<label><input type="checkbox" data-${viewName}="${field[i].name}" value="${field[i].value}" data-function="filter" name="${group}" />${field[i].name}</label>`;
  }
  return html;
};

const createTemplate = async (view) => {
  try {
    await Promise.all([
      view.vendors.fetch(),
      //view.locations.fetch(),
      view.projects.fetch()
    ]);

    const [vendors, projects] = await Promise.all([
      view.vendors.toJSON(),
      //view.locations.toJSON(),
      view.projects.toJSON()
    ]);

    const [venderCheck, projectCheck] = await Promise.all([
      createCheckboxes(view.name, vendors, FIELDS.VENDOR.id),
      //createCheckboxes(view.name, locations, FIELDS.LOCATIONS.id),
      createCheckboxes(view.name, projects, FIELDS.PROJECT.id)
    ]);

    const template = `
      <div class="content">
        <h1></h1>
        <form id="${FILTER_FORM_ID}">
          <h2 data-${view.name}="${FIELDS.ASSETS.id}" data-click="collapse" class="toggle collapse">${FIELDS.ASSETS.name}</h2>
          <div id="${FIELDS.ASSETS.id}" class="toggle collapse">
            -
          </div>
          <hr/>
          <h2 data-${view.name}="${FIELDS.PROJECT.id}" data-click="collapse" class="toggle collapse">${FIELDS.PROJECT.name}</h2>
          <div id="${FIELDS.PROJECT.id}" class="toggle collapse">
            ${projectCheck}
          </div>
          <hr/>
          <h2 data-${view.name}="${FIELDS.CONTRACTS.id}" data-click="collapse" class="toggle collapse">${FIELDS.CONTRACTS.name}</h2>
          <div id="${FIELDS.CONTRACTS.id}" class="toggle collapse">
            -
          </div>
          <hr/>
          <h2 data-${view.name}="${FIELDS.VENDOR.id}" data-click="collapse" class="toggle collapse">${FIELDS.VENDOR.name}</h2>
          <div id="${FIELDS.VENDOR.id}" class="toggle collapse">
            ${venderCheck}
          </div>
          <hr/>
          <h2 data-${view.name}="${FIELDS.LOCATIONS.id}" data-click="collapse" class="toggle collapse">${FIELDS.LOCATIONS.name}</h2>
          <div id="${FIELDS.LOCATIONS.id}" class="toggle collapse">
            -
          </div>
          <button type="submit" data-${view.name}="submit" data-click="submit">Filter</button>
        </form>
      </div>
    `;

    await view.injectTemplate(template);

    await Promise.all([
      view.syncBoundElement(FIELDS.ASSETS.id),
      view.syncBoundElement(FIELDS.PROJECT.id),
      view.syncBoundElement(FIELDS.CONTRACTS.id),
      view.syncBoundElement(FIELDS.VENDOR.id),
      view.syncBoundElement(FIELDS.LOCATIONS.id)
    ]);

    return true;
  } catch (e) {
    Logger.error(e);
    await view.injectTemplate(`Failed - ${e}`);
    return e;
  }
};

class Filters extends DirectiveView {
  constructor() {
    super({
      "el": MOUNT_POINT,
      "name": "filters",
      "style": "view"
    });
    this.vendors = new Vendors();
    //this.locations = new Locations();
    this.projects = new Projects();
  };

  render() {
    createTemplate(this);
    return super.render();
  };

  remove() {
    //console.debug("removing filters", this.el);
    this.vendors = null;
    //this.locations = null;
    this.projects = null;

    //this.removeTemplate(this.el, true);
    //const el = Dom.selector(this.el);
    //el.innerHTML = "";
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
    this.sendMessage(FETCH_ASSETS, json);
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
    alert("hide " + hide + " el " + this.el);
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

export default Filters;
