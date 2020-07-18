import { Model } from "presentation-models";
import Schema from "../schemas/facet.js";

class Facet extends Model {
  constructor(attributes, options, ...args) {
    if (!options) {
      options = {};
    }
    options.schema = Schema;
    super(attributes, options, args);
  };

  get identifier() {
    return this.get("identifier");
  };

  get name() {
    return this.get("name");
  };

  get data() {
    return this.get("data");
  };

  get type() {
    return this.get("type");
  };
};

export default Facet;
