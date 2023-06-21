import { catchAsync } from "../middleware.js";
import jwt from "jsonwebtoken";
let decodedData;
export const isAuthenticatedUser = catchAsync(async (req, res, next) => {
  const token =
    req.headers["x-access-token"] ||
    req.headers["authorization"] ||
    req.headers["x-token"] ||
    req.query.token;

  if (!token) {
    res.status(401).send({ message: "Please Login to access this resource" });
  }
  if (jwt.verify(token, process.env.SECRET)) {

    decodedData = jwt.verify(token, process.env.SECRET);
    next();
  }
});
