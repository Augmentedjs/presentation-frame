(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("presentation-decorator"), require("presentation-dom"));
	else if(typeof define === 'function' && define.amd)
		define("presentation-facets", ["presentation-decorator", "presentation-dom"], factory);
	else if(typeof exports === 'object')
		exports["presentation-facets"] = factory(require("presentation-decorator"), require("presentation-dom"));
	else
		root["presentation-facets"] = factory(root["presentation-decorator"], root["presentation-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_presentation_decorator__, __WEBPACK_EXTERNAL_MODULE_presentation_dom__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const FACET_FORM_ID = exports.FACET_FORM_ID = "_facetForm";
const DEFAULT_STYLE = exports.DEFAULT_STYLE = "facets";

/***/ }),

/***/ "./src/facetView.js":
/*!**************************!*\
  !*** ./src/facetView.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _presentationDecorator = __webpack_require__(/*! presentation-decorator */ "presentation-decorator");

var _presentationDom = __webpack_require__(/*! presentation-dom */ "presentation-dom");

var _presentationDom2 = _interopRequireDefault(_presentationDom);

var _facet = __webpack_require__(/*! ./models/facet.js */ "./src/models/facet.js");

var _facet2 = _interopRequireDefault(_facet);

var _functions = __webpack_require__(/*! ./functions.js */ "./src/functions.js");

var _constants = __webpack_require__(/*! ./constants.js */ "./src/constants.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Simple selection facet view
 * @extends DirectiveView
 */


class FacetView extends _presentationDecorator.DirectiveView {
  constructor(options) {
    if (!options) {
      options = {};
    }

    if (options.style) {
      options.style += ` ${_constants.DEFAULT_STYLE}`;
    } else {
      options.style = _constants.DEFAULT_STYLE;
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
  }
  /**
   * Add a filter to render
   * @param {string} identifier ID of the group
   * @param {string} name Name of the group
   * @param {Array} data Array of objects { name: value } of the selections
   * @param {string} type A facet type (defaults to check)
   */


  addFacet(identifier, name, data, type) {
    if (identifier && name && data) {
      return this._facets.push(new _facet2.default({
        "identifier": identifier,
        "name": name,
        "data": data,
        "type": type
      }));
    }

    return this._facets.length;
  }
  /**
   * Raw data of the filter data passed rendered
   * @property {Array} facets
   */


  get facets() {
    return this._facets;
  }

  set facets(facets) {
    if (facets) {
      this._facets = facets;
    } else {
      this._facets = [];
    }
  }
  /**
   * Render the view
   */


  render() {
    this.template = (0, _functions.createTemplate)(this.name, this._facets, this._title, this._button);
    super.render();
    this.syncAllBoundElements();
    this.delegateEvents();
    return this;
  }
  /**
   * Remove the view
   */


  remove() {
    return super.remove();
  }
  /**
   * Submit the selections
   */


  submit(e) {
    e.preventDefault();
    return this;
  }
  /**
   * @property {Object} selections
   * @returns {Object} Returns an object of keys and values of selections from the facets
   */


  get selections() {
    let json = {};

    try {
      const formData = new FormData(_presentationDom2.default.selector(`#${_constants.FACET_FORM_ID}`));

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
        throw new Error(`Could not read facet form for id ${_constants.FACET_FORM_ID}.`);
      }
    } catch (e) {
      console.error(e);
    }

    return json;
  }

  collapse(e) {
    const id = e.target.getAttribute(`data-${this.name}`);

    const el = _presentationDom2.default.toggleClass(`#${id}`, "collapse");

    _presentationDom2.default.toggleClass(e.target, "collapse"); //console.debug(`Toggle - ${el} id: ${id}`);

  }

  facet(e) {
    //console.debug("Filter was changed - submit");
    this.submit(e);
  }

  toggle(hide) {
    //alert("hide " + hide + " el " + this.el);
    if (hide) {
      const myEl = _presentationDom2.default.selector(this.el);

      if (myEl) {
        myEl.classList.add("hide");
      } else {
        console.warn("El for facet did not select.");
      }
    } else {
      const myEl = _presentationDom2.default.selector(this.el);

      if (myEl) {
        myEl.classList.remove("hide");
      } else {
        console.warn("El for facet did not select.");
      }
    }
  }

}

;
exports.default = FacetView;

/***/ }),

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTemplate = undefined;

var _constants = __webpack_require__(/*! ./constants.js */ "./src/constants.js");

const createCheckboxes = (viewName, field, group) => {
  let html = "",
      i = 0;
  const l = field.length ? field.length : 0;

  for (i = 0; i < l; i++) {
    html += `
      <label>
        <input type="checkbox" value="${field[i].value}" data-function="facet" name="${group}" />
        ${field[i].name}
      </label>
    `;
  }

  return html;
};

const renderNumStars = num => {
  let i = 0,
      stars = `<i class="material-icons">`;
  const l = Number(num);

  for (i; i < 5; i++) {
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
  let html = "",
      i = 0;
  const l = field.length ? field.length : 0;

  for (i = 0; i < l; i++) {
    html += `
      <label>
        <input type="checkbox" value="${field[i].value}" data-function="facet" name="${group}" />
        ${renderNumStars(field[i].name)}
      </label>
    `;
  }

  return html;
};

const createColors = (viewName, field, group) => {
  let html = "",
      i = 0;
  const l = field.length ? field.length : 0;

  for (i = 0; i < l; i++) {
    html += `
      <label>
        <input type="checkbox" value="${field[i].value}" data-function="facet" name="${group}"/>
        <div style="background-color: ${field[i].color};" class="colorway"></div>
        ${field[i].name}
      </label>
    `;
  }

  return html;
};

const createTemplate = exports.createTemplate = (viewName, facets, title, button) => {
  try {
    const l = facets.length;
    let i = 0,
        template = `<div class="${_constants.DEFAULT_STYLE}">${title ? "<h1>" + title + "</h1>" : ""}<form id="${_constants.FACET_FORM_ID}">`;

    for (i; i < l; i++) {
      // TODO: support 'type'
      template += `
        <h2 data-${viewName}="${facets[i].identifier}" data-click="collapse" class="toggle collapse">${facets[i].name}</h2>
        <div id="${facets[i].identifier}" class="toggle collapse">
      `;

      if (facets[i].type === "star") {
        template += createStars(viewName, facets[i].data, facets[i].identifier);
      } else if (facets[i].type === "color") {
        template += createColors(viewName, facets[i].data, facets[i].identifier);
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _facetView = __webpack_require__(/*! ./facetView.js */ "./src/facetView.js");

var _facetView2 = _interopRequireDefault(_facetView);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _facetView2.default;

/***/ }),

/***/ "./src/models/facet.js":
/*!*****************************!*\
  !*** ./src/models/facet.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _presentationModels = __webpack_require__(/*! presentation-models */ "presentation-dom");

var _presentationModels2 = _interopRequireDefault(_presentationModels);

var _facet = __webpack_require__(/*! ../schemas/facet.js */ "./src/schemas/facet.js");

var _facet2 = _interopRequireDefault(_facet);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

class Facet extends _presentationModels2.default {
  constructor(attributes, options, ...args) {
    if (!options) {
      options = {};
    }

    options.schema = _facet2.default;
    super(attributes, options, args);
  }

  get identifier() {
    return this.get("identifier");
  }

  get name() {
    return this.get("name");
  }

  get data() {
    return this.get("data");
  }

  get type() {
    return this.get("type");
  }

}

;
exports.default = Facet;

/***/ }),

/***/ "./src/schemas/facet.js":
/*!******************************!*\
  !*** ./src/schemas/facet.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const Schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Facet",
  "description": "A Facet",
  "type": "object",
  "properties": {
    "identifier": {
      "description": "An identifier for the facet",
      "type": "string"
    },
    "name": {
      "description": "A name of the facet",
      "type": "string"
    },
    "data": {
      "description": "Sets of data",
      "type": "array",
      "minItems": 1
    },
    "type": {
      "description": "The visual style",
      "type": "string",
      "enum": ["check", "star", "color"]
    }
  }
};
exports.default = Schema;

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ }),

/***/ "presentation-decorator":
/*!**********************************************************************************************************************************************************!*\
  !*** external {"commonjs":"presentation-decorator","commonjs2":"presentation-decorator","amd":"presentation-decorator","root":"presentation-decorator"} ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_presentation_decorator__;

/***/ }),

/***/ "presentation-dom":
/*!**********************************************************************************************************************************!*\
  !*** external {"commonjs":"presentation-dom","commonjs2":"presentation-dom","amd":"presentation-dom","root":"presentation-dom"} ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_presentation_dom__;

/***/ })

/******/ });
});
//# sourceMappingURL=presentation-facets.js.map