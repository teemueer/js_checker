const jwt = require("jsonwebtoken");
const User = require("../models/user");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  req.user = await User.findById(decodedToken.id);
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  switch (error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformed id" });
    case "ValidationError":
      return response.status(400).json({ error: error.message });
    case "JsonWebTokenError":
      return response.status(401).json({ error: "invalid token" });
    case "TokenExpiredError":
      return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler,
};
