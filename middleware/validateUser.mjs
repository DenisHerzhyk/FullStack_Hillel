const validateUser = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.body || !req.body.name || req.body.name.trim() === '') {
            return res.status(400).send('Bad Request')
        }
    }
    next()
}

export {validateUser}