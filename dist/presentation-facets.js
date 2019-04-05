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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

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

var _functions = __webpack_require__(/*! ./functions.js */ "./src/functions.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} //import Logger from "../logger/logger.js";
//import { FETCH_ASSETS } from "../constants/messages.js";
// collections, should not be here
//import Vendors from "../collections/vendors.js";
//import Projects from "../collections/projects.js";


const MOUNT_POINT = "#filters";
const FILTER_FORM_ID = "filterForm";
const Logger = console;

class FacetView extends _presentationDecorator.DirectiveView {
  constructor() {
    super({
      "el": MOUNT_POINT,
      "name": "filters",
      "style": "view"
    }); // data collections (should not be here)
    //this.vendors = new Vendors();
    //this.projects = new Projects();
  }

  render() {
    (0, _functions.createTemplate)(this);
    return super.render();
  }

  remove() {
    // data collections (should not be here)
    //this.vendors = null;
    //this.projects = null;
    return super.remove();
  }

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
    Logger.debug("form:" + json); //this.sendMessage(FETCH_ASSETS, json);
  }

  collapse(e) {
    const id = e.target.getAttribute(`data-${this.name}`);

    const el = _presentationDom2.default.toggleClass(`#${id}`, "collapse");

    _presentationDom2.default.toggleClass(e.target, "collapse");

    Logger.debug(`Toggle - ${el} id: ${id}`);
  }

  filter(e) {
    Logger.debug("Filter was changed - submit");
    this.submit(e);
  }

  toggle(hide) {
    alert("hide " + hide + " el " + this.el);

    if (hide) {
      const myEl = _presentationDom2.default.selector(this.el);

      if (myEl) {
        myEl.classList.add("hide");
      } else {
        Logger.warn("El did not select");
      }
    } else {
      const myEl = _presentationDom2.default.selector(this.el);

      if (myEl) {
        myEl.classList.remove("hide");
      } else {
        Logger.warn("El did not select");
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
} // this is data, should not be here


const STATUS = [{
  "name": "Ordered",
  "value": "ordered"
}, {
  "name": "Shipped",
  "value": "shipped"
}];
const FIELDS = {
  "ASSETS": {
    "name": "Assets",
    "id": "assets"
  },
  "CONTRACTS": {
    "name": "Contracts",
    "id": "contracts"
  },
  "SEARCH": {
    "name": "Search",
    "id": "search"
  },
  "VENDOR": {
    "name": "Vendors",
    "id": "vendor"
  },
  "LOCATIONS": {
    "name": "Locations",
    "id": "locations"
  },
  "PROJECT": {
    "name": "Projects",
    "id": "project"
  },
  "STATUS": {
    "name": "Status",
    "id": "status"
  }
}; // ---

const createCheckboxes = exports.createCheckboxes = (viewName, field, group) => {
  let html = "",
      i = 0;
  const l = field.length ? field.length : 0;

  for (i = 0; i < l; i++) {
    html += `<label><input type="checkbox" data-${viewName}="${field[i].name}" value="${field[i].value}" data-function="filter" name="${group}" />${field[i].name}</label>`;
  }

  return html;
};

const createTemplate = exports.createTemplate = (() => {
  var _ref = _asyncToGenerator(function* (view) {
    try {
      yield Promise.all([view.vendors.fetch(), //view.locations.fetch(),
      view.projects.fetch()]);
      const [vendors, projects] = yield Promise.all([view.vendors.toJSON(), //view.locations.toJSON(),
      view.projects.toJSON()]);
      const [venderCheck, projectCheck] = yield Promise.all([createCheckboxes(view.name, vendors, FIELDS.VENDOR.id), //createCheckboxes(view.name, locations, FIELDS.LOCATIONS.id),
      createCheckboxes(view.name, projects, FIELDS.PROJECT.id)]);
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
      yield view.injectTemplate(template);
      yield Promise.all([view.syncBoundElement(FIELDS.ASSETS.id), view.syncBoundElement(FIELDS.PROJECT.id), view.syncBoundElement(FIELDS.CONTRACTS.id), view.syncBoundElement(FIELDS.VENDOR.id), view.syncBoundElement(FIELDS.LOCATIONS.id)]);
      return true;
    } catch (e) {
      Logger.error(e);
      yield view.injectTemplate(`Failed - ${e}`);
      return e;
    }
  });

  return function createTemplate(_x) {
    return _ref.apply(this, arguments);
  };
})();

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