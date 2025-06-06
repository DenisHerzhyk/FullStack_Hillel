const authenticate = (req,res,next) => {
    // const auth = req.headers['authorization'];
    // if (!auth) {
    //     return res.status(401).send('Access denied!')
    // }
    next()
}

export {authenticate}