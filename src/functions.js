import { FACET_FORM_ID } from "./constants.js";

const createCheckboxes = (viewName, field, group) => {
  let html = "", i = 0;
  const l = (field.length) ? (field.length) : 0;
  for (i = 0; i < l; i++) {
    html += `<label><input type="checkbox" data-${viewName}="${field[i].name}" value="${field[i].value}" data-function="filter" name="${group}" />${field[i].name}</label>`;
  }
  return html;
};

export const createTemplate = (viewName, facets, title, button) => {
  try {
    const l = facets.length;
    let i = 0, template = `<div class="filters">${(title) ? "<h1>" + title + "</h1>": ""}<form id="${FACET_FORM_ID}">`;
    for (i; i < l; i++) {
      // TODO: support 'type'
      template += `
        <h2 data-${viewName}="${facets[i].identifier}" data-click="collapse" class="toggle collapse">${facets[i].name}</h2>
        <div id="${facets[i].identifier}" class="toggle collapse">
          ${createCheckboxes(facets[i].name, facets[i].data, facets[i].identifier)}
        </div>
      `;
    }
    if (button) {
      template += `<button type="submit" data-${viewName}="submit" data-click="submit">${button}</button>`;
    }
    template += `</form></div>`;
    return template;
  } catch (e) {
    console.error(e);
    return null;
  }
};
