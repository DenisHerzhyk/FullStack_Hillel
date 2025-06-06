const rootAccess = (req, res, next) => {
    console.log(`[ROOT] Special root access at ${new Date()}`);
    next();
};

export { rootAccess };