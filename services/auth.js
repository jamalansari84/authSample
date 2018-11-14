const jwt = require('jsonwebtoken');

class AuthService {
    static validateToken(token) {
        const { SUPER_SECRET_KEY } = process.env;
        if (!token || !SUPER_SECRET_KEY) return false;
        return jwt.verify(token, SUPER_SECRET_KEY, err => !err);
    }

    static login(user, pass) {
        // in a real app the user and pass would be store in a DB.
        const { SUPER_SECRET_USER, SUPER_SECRET_PASS } = process.env;
        return user && pass && SUPER_SECRET_USER === user && SUPER_SECRET_PASS === pass;
    }

    static sign(id) {
        const { SUPER_SECRET_KEY } = process.env;
        return jwt.sign({ id }, SUPER_SECRET_KEY)
    }
}

/**
 * All the `process.env` should be loaded at beginning.
 */
module.exports = AuthService;
