const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

users = [
    {id: 1, email: 'test@test.fr', password: '1234', nickname: 'Admin' , role: 'admin'},
    {id: 2, email: 'test1@test.fr', password: '1234', nickname: 'User' , role: 'user'}
];

const secret = '125ezesqe48sd56q8ze2d58sqd1z5exd485gfh8t5dq5sDJEUAGD45AZDAF';
const jwt = require('jsonwebtoken');

const getAllJobs = () => {
    return [... addedJobs, ...initialJobs];
}


app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const api = express.Router();
const auth = express.Router();

//Login

auth.post('/login', (req, res) => {
    if(req.body) {
        const email = req.body.email.toLowerCase();
        const pw = req.body.password.toLowerCase();
        const index = users.findIndex(user => user.email === email);

        if(index > -1 && users[index].password === pw) {
            let user = users[index];
            let token = '';
            if(user.email === 'test@test.fr') {
                token = jwt.sign({iss: 'http://localhost:4201', role: 'admin', nickname: user.nickname, email: req.body.email }, secret);
            } else {
                token = jwt.sign({iss: 'http://localhost:4201', role: 'user', nickname: user.nickname, email:req.body.email }, secret);
            }
            res.json({success: true, token});
        } else {
            res.status(401).json({success:false, message: 'wrong id'});
        }
    } else {
        res.status(500).json({success: false, message: 'données manquantes'});
    }
});

//Register

auth.post('/register', (req, res) => {
    console.log('req.body resgister', req.body);
    if(req.body) {
        const email = req.body.email.toLowerCase().trim();
        const pw = req.body.password.toLowerCase().trim();
        const nName = req.body.nickname.trim();
        users = [{id:Date.now(), email: email, password: pw, nickname: nName},...users];
        res.json({success: true, users}) ;
    } else {
        res.json({success: false, message:'Unable to register'});
    }
});


//Data
api.get('/jobs', (request, response) => {
    response.json(getAllJobs());
});

api.get('/jobs/:email', (req, res) => {
    const email = req.params.email;
    console.log(email);
    const jobs = getAllJobs().filter(job => (job.email === email));
    res.json({success: true, jobs});
});

//Middleware control server

const checkUserToken = (req, res, next) => {
    if(!req.header('Authorization')) {
        return res.status(401).json({success: false, message:"Header Auhtorization Missing"});
    } 

    const authorizationParts = req.header('authorization').split(' ');
    let token = authorizationParts[1];

    const decodedToken = jwt.verify(token, secret);
    next();
};

api.post('/jobs', checkUserToken, (request, response) => {
    const job = request.body;
    addedJobs = [job, ...addedJobs];
    response.json(job);
});

api.get('/search/:term/:place?', (req, res) => {
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;
    let jobs = getAllJobs().filter(job => (job.description.toLowerCase().includes(term) || job.title.toLowerCase().includes(term) ));
    if(place) {
        place = place.toLowerCase().trim();
        jobs = jobs.filter(job => (job.city.toLowerCase().includes(place)));
    }
    res.json({success: true, jobs});
});

api.get('/jobs/:id', (request, response) => {
    const id = parseInt(request.params.id, 10);
    const job = getAllJobs().filter(j => j.id === id);
    if(job.length === 1) {
        response.json({success: true, job: job[0]});
    } else {
        response.json({success: false, message: 'Aucun id correspondant'});
    }
});




app.use('/api', api);
app.use('/auth', auth);

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});