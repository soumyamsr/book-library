const schemas = require('../models/schema');

const supportedMethods = ['POST', 'PUT'];

module.exports = (req, res, next) => {
  const method = req.method.toUpperCase();
  if (supportedMethods.indexOf(method) !== -1) {
    const route = req.baseUrl;
    const schema = schemas[route];
    if (schema) {
      const result = schema.validate(req.body);
      if (result.error) {
        res.status(400).send({
          error: result.error,
        });
      } else {
        next();
      }
    } else {
      res.set('Content-Type', 'application/json');
      res.status(500).send('Something went wrong!');
    }
  } else {
    next();
  }
};
