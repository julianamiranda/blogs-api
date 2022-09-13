const loginService = require('../services/loginService');
const jwtService = require('../services/jwtService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService.verifyUser(email, password);

    if (!result) return res.status(400).json({ message: 'Invalid fields' });

    const token = jwtService.createToken(email);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500);
  }
};
module.exports = {
  login,
};