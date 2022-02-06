const fs = require("fs/promises");

exports.fetchEndpoints = async () => {
    const response = await fs.readFile('./endpoints.json', 'utf8')
    return response
}