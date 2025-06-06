const logger = (req, res, next) => {
    console.log(`${Date.now().toString()} - ${req.method} request to ${req.url}`);
    next();
}

export {logger}