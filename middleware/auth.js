const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // await User.findById(decoded.id);
    req.userId = decoded.id

    next();
});


exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    const { seller_token } = req.cookies;
    if (!seller_token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.admin = await User.findById(decoded.id);

    next();
});


exports.isAdmin = (...roles) => {

    return (req, res, next) => {
        console.log(req.user.role, roles)
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
        };
        next();
    }
}