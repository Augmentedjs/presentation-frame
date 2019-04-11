const Schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Facet",
  "description": "A Facet",
  "type": "object",
  "properties": {
    "identifier": {
      "description": "An identifier for the facet",
      "type" : "string"
    },
    "name": {
      "description": "A name of the facet",
      "type" : "string"
    },
    "data": {
      "description": "Sets of data",
      "type" : "array",
      "minItems": 1
    },
    "type": {
      "description": "The visual style",
      "type" : "string",
      "enum": ["check", "star", "color", "size", "image", "price"]
    },
    "range": {
      "description": "A range entry",
      "type" : "boolean"
    }
  }
};

export default Schema;
