import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const messagesRepo = [];

app.get('/messages/:id', (req, res) => {
    console.log(req.query);

    const { id } = req.params;

    const msg = messagesRepo.find(msg => msg.id === id);

    res.json(msg).sendStatus(200);
});

app.get('/list/messages', (req, res) => {
    const { page = 1, limit = 50, order = 'asc' } = req.query;

    const queryResult = messagesRepo.filter(
        (msg, i) => i < page * limit && i >= page * limit - limit
    );

    res.json(queryResult).sendStatus(200);
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    const { message, id } = req.body;

    messagesRepo.push({ message, id });

    res.sendStatus(201);
});

app.put('/messages/:id', (req, res) => {
    const { id, message } = req.body;

    messagesRepo = [
        ...messagesRepo.map(msg => (msg.id === id ? message : msg)),
    ];

    res.sendStatus(200);
});

app.delete('/messages', (req, res) => {
    const { id } = req.body;

    messages = [...messagesRepo.filter(msg => msg.id !== id)];

    res.sendStatus(203);
});

const usersRepo = [];

app.get('/users/:id', (req, res) => {
    console.log(req.query);

    const { id } = req.params;

    const user = usersRepo.find(user => user.id === id);

    res.json(user).sendStatus(200);
});

app.get('/users/list', (req, res) => {
    console.log(req.query);

    const { page = 1, limit = 10, order = 'asc' } = req.query;

    const queryResult = usersRepo.filter(
        (user, i) => i < page * limit && i >= page * limit - limit
    );

    req.setHeader('X-Size', queryResult.length);
    res.send(JSON.stringify(queryResult)).status(200);
});

app.post('/users', (req, res) => {
    const { username, id } = req.body;

    usersRepo.push({ username, id });

    res.sendStatus(201);
});

app.put('/users/:id', (req, res) => {
    const { id, username } = req.body;

    usersRepo = [...usersRepo.map(user => (user.id === id ? username : user))];

    res.sendStatus(200);
});

app.delete('/users', (req, res) => {
    const { id } = req.body;

    users = [...usersRepo.filter(user => user.id !== id)];

    res.sendStatus(203);
});

const roomsRepo = [];

app.get('/rooms/:id', (req, res) => {
    console.log(req.query);

    const { id } = req.params;

    const room = roomsRepo.find(room => user.id === id);

    res.json(room).sendStatus(200);
});

app.get('/rooms/list', (req, res) => {
    console.log(req.query);

    const { page = 1, limit = 10, order = 'asc' } = req.query;

    const queryResult = roomsRepo.filter(
        (room, i) => i < page * limit && i >= page * limit - limit
    );

    res.setHeader('X-Size', queryResult.length)
        .json(JSON.stringify(queryResult))
        .status(200);
});

app.post('/rooms', (req, res) => {
    const { id, ...roomInfo } = req.body;

    roomsRepo.push({ id, ...roomInfo });

    res.sendStatus(201);
});

app.put('/rooms/:id', (req, res) => {
    const { id, ...info } = req.body;

    roomsRepo = [
        ...roomsRepo.map(room => (room.id === id ? { id, ...info } : room)),
    ];

    res.sendStatus(200);
});

app.delete('/rooms', (req, res) => {
    const { id } = req.body;

    rooms = [...roomsRepo.filter(room => room.id !== id)];

    res.sendStatus(203);
});

// io.on("connection", (socket) => {
//   console.log("new user connected");
// });

app.listen(3333, () => {
    console.log('listening on port 3333');
});
