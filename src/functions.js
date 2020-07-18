import { FACET_FORM_ID, DEFAULT_STYLE } from "./constants.js";

const createCheckboxes = (viewName, field, group) => {
  let html = "", i = 0;
  const l = (field.length) ? (field.length) : 0;
  for (i = 0; i < l; i++) {
    html +=
     `<label><input type="checkbox" value="${field[i].value}" data-function="facet" name="${group}" />${field[i].name}</label>`;
  }
  return html;
};

const renderNumStars = (num) => {
  let i = 0,
      stars = `<i class="material-icons">`;
      const l = Number(num);
  for(i; i < 5; i++) {
    if (i < l) {
      stars += "star ";
    } else {
      stars += "star_border ";
    }
  }
  stars += "</i>";
  return stars;
};

const createStars = (viewName, field, group) => {
  let html = "", i = 0;
  const l = (field.length) ? (field.length) : 0;
  for (i = 0; i < l; i++) {
    html +=
     `<label><input type="checkbox" value="${field[i].value}" data-function="facet" name="${group}" />${renderNumStars(field[i].name)}</label>`;
  }
  return html;
};

const createColors = (viewName, field, group) => {
  let html = "", i = 0;
  const l = (field.length) ? (field.length) : 0;
  for (i = 0; i < l; i++) {
    html +=
     `<label><input type="checkbox" value="${field[i].value}" data-function="facet" name="${group}"/><div style="background-color: ${field[i].color};" class="colorway"></div>${field[i].name}</label>`;
  }
  return html;
};

const createSizes = (viewName, field, group) => {
  let html = "", i = 0;
  const l = (field.length) ? (field.length) : 0;
  for (i = 0; i < l; i++) {
    html +=
     `<label><input type="checkbox" value="${field[i].value}" data-function="facet" name="${group}"/><div class="size">${field[i].name}</div></label>`;
  }
  return html;
};

const createImages = (viewName, field, group) => {
  let html = "", i = 0;
  const l = (field.length) ? (field.length) : 0;
  for (i = 0; i < l; i++) {
    html += `<label><input type="checkbox" value="${field[i].value}" data-function="facet" name="${group}"/><figure class="image"><img src="${field[i].image}"/></figure></label>`;
  }
  return html;
};

const createPrices = (viewName, field, group, range) => {
  let html = createCheckboxes(viewName, field, group);
  if (range) {
    html +=
     `<label class="range">Min<input type="text" name="${group}-min"/></label><label class="range">Max<input type="text" name="${group}-max"/></label>`;
  }
  return html;
};

export const createTemplate = (viewName, facets, title, button) => {
  try {
    const l = facets.length;
    let i = 0, template = `<div class="${DEFAULT_STYLE}">${(title) ? "<h1>" + title + "</h1>": ""}<form id="${FACET_FORM_ID}">`;
    for (i; i < l; i++) {
      // TODO: support 'type'
      template +=
       `<h2 data-${viewName}="${facets[i].identifier}" data-click="collapse" class="toggle collapse">${facets[i].name}</h2><div id="${facets[i].identifier}" class="toggle collapse">`;
      if (facets[i].type === "star") {
        template += createStars(viewName, facets[i].data, facets[i].identifier);
      } else if (facets[i].type === "color") {
        template += createColors(viewName, facets[i].data, facets[i].identifier);
      } else if (facets[i].type === "size") {
        template += createSizes(viewName, facets[i].data, facets[i].identifier);
      } else if (facets[i].type === "image") {
        template += createImages(viewName, facets[i].data, facets[i].identifier);
      } else if (facets[i].type === "price") {
        template += createPrices(viewName, facets[i].data, facets[i].identifier, facets[i].range);
      } else {
        template += createCheckboxes(viewName, facets[i].data, facets[i].identifier);
      }
      template += `</div>`;
    }
    if (button) {
      template += `<button type="submit" data-${viewName}="${button.toLowerCase()}" data-click="submit">${button}</button>`;
    }
    template += `</form></div>`;
    return template;
  } catch (e) {
    console.error(e);
    return null;
  }
};
