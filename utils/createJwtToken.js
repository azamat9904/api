const jwt = require('jsonwebtoken');

const createJwtToken = (payload) => {
    return jwt.sign({ payload }, process.env.SECRET || "", { algorithm: "HS256", });
};

module.exports = createJwtToken;
