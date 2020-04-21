const {Router} = require('express');
const router = Router();
const Todo = require('../models/Todo')

//   index page - list of todos
router.get('/', async (request, response) => {
    const todoOrigin = await Todo.find({});

    const todoList = todoOrigin.map(data => {
        return {
            content: data.content,
            _id: data._id,
            finished: data.finished
        }
    });

    response.render(
        'index',
        {
            'page_title': 'Main Page',
            todoList
        }
    );
});

//  create page - form for new todo
router.get('/create', (request, response) => {
    response.render('create', {
        title: 'Create todo'
    })
})

//  create new todo
router.post('/create', async (request, response) => {
    const todo = new Todo({
        content: request.body.content
    })

    await todo.save()
    response.redirect('/')
})

//  mark todo as finished
router.post('/finish', async (request, response) => {
    const todo = await Todo.findById(request.body.id)
    todo.finished = !todo.finished;
    await todo.save()

    response.redirect('/')
})

//  delete todo
router.post('/delete', async (request, response) => {
    const todo = await Todo.findById(request.body.id)
    todo.delete();
    response.redirect('/')
})

module.exports = router;