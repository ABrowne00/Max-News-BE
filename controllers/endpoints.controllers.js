const fetchEndpoints = require('../models/endpoints.models')

exports.getEndpoints = (req, res, next) => {
    fetchEndpoints().then((result) => {
        res.status(200).send({ endpoints: result })
    })
    .catch((err) => {
        next(err)
    })
}