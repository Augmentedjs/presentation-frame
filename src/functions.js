// this is data, should not be here
const STATUS = [
  { "name": "Ordered", "value": "ordered" },
  { "name": "Shipped", "value": "shipped" }
];

const FIELDS = {
  "ASSETS": { "name": "Assets", "id": "assets" },
  "CONTRACTS": { "name": "Contracts", "id": "contracts" },
  "SEARCH": { "name": "Search", "id": "search" },
  "VENDOR": { "name": "Vendors", "id": "vendor" },
  "LOCATIONS": { "name": "Locations", "id": "locations" },
  "PROJECT": { "name": "Projects", "id": "project" },
  "STATUS": { "name": "Status", "id": "status" }
};

const FILTER_FORM_ID = "filterForm";
// ---

export const createCheckboxes = (viewName, field, group) => {
  let html = "", i = 0;
  const l = (field.length) ? (field.length) : 0;
  for (i = 0; i < l; i++) {
    html += `<label><input type="checkbox" data-${viewName}="${field[i].name}" value="${field[i].value}" data-function="filter" name="${group}" />${field[i].name}</label>`;
  }
  return html;
};

export const createTemplate = (view) => {
  try {
    /*await Promise.all([
      view.vendors.fetch(),
      //view.locations.fetch(),
      view.projects.fetch()
    ]);
    const [vendors, projects] = await Promise.all([
      view.vendors.toJSON(),
      //view.locations.toJSON(),
      view.projects.toJSON()
    ]);
    */
    const filters = view._filters;
    const l = filters.length;
    let i = 0, template = `<div class="content"><h1></h1><form id="${FILTER_FORM_ID}">`;
    for (i; i < l; i++) {
      template += `
        <h2 data-${view.name}="${filters[i].id}" data-click="collapse" class="toggle collapse">${filters[i].name}</h2>
        <div id="${FIELDS.PROJECT.id}" class="toggle collapse">
          ${createCheckboxes(filters[i].name, filters[i].collection, filters[i].id)}
        </div>
      `;
    }
    template += `<button type="submit" data-${view.name}="submit" data-click="submit">Filter</button></form></div>`;
    /*
    const [venderCheck, projectCheck] = await Promise.all([
      createCheckboxes(view.name, vendors, FIELDS.VENDOR.id),
      //createCheckboxes(view.name, locations, FIELDS.LOCATIONS.id),
      createCheckboxes(view.name, projects, FIELDS.PROJECT.id)
    ]);
    */
    /*
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
    */
    return template;
  } catch (e) {
    console.error(e);
    //await view.injectTemplate(`Failed - ${e}`);
    return null;
  }
};
