const Documents = require('../models/documents');

module.exports = app => {
  app.post('/login', (req, res) => {
    const { user, pass } = req.body;

    if (user === 'gene' && pass === '123') {
      res.cookie('auth', 'logged', { maxAge: 9000000000 }).send('ok');
    } else {
      res.status(401).send('User or password wrong');
    }
  });

  app.get('/documents', (req, res) => {
    Documents.find()
      .then(d => {
        res.send(d);
      })
      .catch(err => {
        errorHandler(err, res);
      });
  });

  app.get('/documents/:id', (req, res) => {
    Documents.findById(req.params.id)
      .then(d => {
        console.log(d);
        if (!d) {
          res.status(404).send({
            message: 'Model not found',
          });
        }
        res.send(d);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.post('/documents/:id', (req, res) => {
    const { upvote } = req.body;
    Documents.findByIdAndUpdate(req.params.id, { upvote }, { new: true })
      .then(d => {
        if (!d) {
          res.status(404).send({
            message: 'Model not found',
          });
        }
        res.send(d);
      })
      .catch(err => {
        errorHandler(err, res);
      });
  });
};
