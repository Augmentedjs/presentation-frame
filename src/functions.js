import { FILTER_FORM_ID } from "./constants.js";

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
    const filters = view._filters;
    const l = filters.length;
    let i = 0, template = `<div class="filters">${(view._title) ? "<h1>" + view._title + "</h1>": ""}<form id="${FILTER_FORM_ID}">`;
    for (i; i < l; i++) {
      template += `
        <h2 data-${view.name}="${filters[i].id}" data-click="collapse" class="toggle collapse">${filters[i].name}</h2>
        <div id="${filters[i].id}" class="toggle collapse">
          ${createCheckboxes(filters[i].name, filters[i].collection, filters[i].id)}
        </div>
      `;
    }
    if (view._button) {
      template += `<button type="submit" data-${view.name}="submit" data-click="submit">${view._button}</button>`;
    }
    template += `</form></div>`;
    return template;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const renderMe = async (view) => {
  view.template = await createTemplate(view);
};

export const syncMe = async (view) => {
  const l = view._filters.length;
  let i = 0;
  for (i; i < l; i++) {
    await view.syncBoundElement(view._filters[i].id);
  }
};
