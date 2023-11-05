const userService = require("../services/usersService");
const JoiSchema = require("../schemas/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.secret_key;

const register = async (req, res, next) => {
  try {
    let { login, password, email, role } = req.body;

    if (!role) {
      role = "standard";
    }

    if (email) {
      email = email.toLowerCase();
    }

    const isValid = JoiSchema.validate({ login, password, role });
    if (isValid.error) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const isLoginExist = await userService.getUserByLogin({ login });
    if (isLoginExist) {
      return res.status(409).json({ message: "Login already in use" });
    }

    if (email) {
      const isEmailExist = await userService.getUserByEmail({ email });
      if (isEmailExist) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userService.addUser({
      login,
      password: hash,
      email,
      role,
    });
    if (!user) {
      return res.status(409).json({ message: "Cannot create user" });
    }

    const payload = { id: user.id, username: user.email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    await userService.updateUserToken({ _id: user.id, body: { token } });

    res.status(201).json({
      token,
      user: { email, role },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    let { login, password } = req.body;
    const role = "standard";

    const isValid = JoiSchema.validate({ login, password });
    if (isValid.error) {
      return res.status(400).json({ message: "Invalid login or password" });
    }

    const user = await userService.getUserByLogin({ login });
    if (!user) {
      return res.status(401).json({ message: "Invalid login or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid login or password" });
    }

    const payload = { id: user.id, username: user.login };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    await userService.updateUserToken({ _id: user.id, body: { token } });

    res.json({
      token,
      user: { login, email: user.email, role },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userService.getUserById({ _id });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await userService.updateUserToken({ _id: user.id, body: { token: null } });
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await userService.getUserById({ _id });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.json({ login: user.login });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const updates = req.body;

    const user = await userService.getUserById({ _id });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (updates.password) {
      const hash = await bcrypt.hash(updates.password, 10);
      user.password = hash;
    }
    if (updates.email) {
      user.email = updates.email.toLowerCase();
    }

    const updatedUser = await userService.updateUser({ _id, body: user });

    res.json({
      message: "User updated successfully",
      user: { email: updatedUser.email },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
  update,
};
