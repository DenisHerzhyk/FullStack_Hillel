const status400 = 'Bad Request'
const status404 = 'Not Found';

const VALID_USER_ID = '123';
const USERS = {'123': 'Denys'}

const userResponse = (app) => {
    app.get('/users', (req, res) => {
        const data = {title: 'users get', users: USERS}
        res.status(200).render('users', data);
    })

    app.post('/users', (req, res) => {
        if (!req.body.name || req.body.name.trim() === ''){
            return res.status(400).send(status400);
        }   
        
        res.status(201).send('Post users route')
    })

    app.get('/users/:userId', (req, res) => {
        const userId = req.params.userId;
        if (userId !== VALID_USER_ID) {
            return res.status(404).send(status404);
        }
        const data = {title: 'user detail', user: USERS[userId]}
        res.status(200).render('userId', data);
    })

    app.put('/users/:userId', (req, res) => {
        const userId = req.params.userId;
        if (userId !== VALID_USER_ID) {
            return res.status(404).send(status404);
        }
        if (!req.body.name || req.body.name.trim() === '') {
            return res.status(400).send(status400);
        }
        res.status(200).send(`Put user by Id route: ${userId}`);
    })

    app.delete('/users/:userId', (req, res) => {
        const userId = req.params.userId;
        if (userId !== VALID_USER_ID) {
            return res.status(404).send(status404);
        }
        res.status(204).send();
    })
}

export {userResponse}