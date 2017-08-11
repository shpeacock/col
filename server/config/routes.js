let path = require('path');
let Users = require('../controllers/users');
let Questions = require ('../controllers/questions');
let Answers = require('../controllers/answers');


module.exports = function(app){
    app.post('/users', Users.create);

    app.get('/sessions', Users.session);
    app.delete('/sessions/:id', Users.logout);

    app.get('/questions', Questions.index);
    app.post('/questions', Questions.create);
    app.get('/questions/:id', Questions.show);
    app.delete('/questions/:id', Questions.destroy);
    
    app.post('/answers', Answers.create);
    app.put('/answers/:id', Answers.increaseLikes);
    app.delete('/answers/:id', Answers.destroy);

    app.all('*', (req, res, next) => {
      res.sendFile(path.resolve('./public/dist/index.html'));
  })
}