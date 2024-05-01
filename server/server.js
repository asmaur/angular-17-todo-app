var express = require('express');
const cors = require('cors')
const users = require('./users.json');
const port = 8080;

var app = express()
app.use(cors());
app.use(express.json())

todos = [
    {
        id: 1,
        title: "first todo",
        description: "testing todo",
        status: 'OPEN',
    },
    {
        id: 2,
        title: "add services (auth, todo, token",
        description: "Add services for api",
        status: 'TESTING',
    },
    {
        id: 3,
        title: "add Guards (guest and auth",
        description: "protect app routes",
        status: 'DONE',
    },
    {
        id: 4,
        title: "more task to do",
        description: "protect app routes",
        status: 'PROGRESS',
    }
];

app.post('/api/login', async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = users.find(u => u.email === email && u.password === password);
        if(!user) return error("Email ou password inválidos");
        res.send({
            message: "Login Okay",
            token: "fake-jwt-token",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch(err){
        console.log(err)
        res.status(500).json({message: "Opa, algo deu errado."});
    }
})

app.post("/api/logout", async (req, res) => {
    res.send();
})

app.get('/api/todos', async (req, res) => {
    if(req.query.status){
        res.send(todos.filter(item => item.status == req.query.status))
    }else{
        res.send(todos)
    }
})

app.post("/api/todos", async (req, res) => {
    id = todos.slice(-1).id;
    todos = [...todos, {id: id, ...req.body}]
    res.send();
})

app.put("/api/todos/:id", async (req, res) => {
    todos = todos.map(obj => obj.id == req.params.id ? {...obj, ...req.body} : obj)
    res.send()
})

app.listen(port, () => {
    console.log("JSON server listening on port 8080");
})
