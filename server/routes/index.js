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

  app.get('/add/documents', (_, res) => {
    const title = 'What is Lorem Ipsum?';
    const content = `
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    `;
    const docs = [
      {
        author: 'Gene',
        img:
          'https://braziljs.org/wp-content/uploads/2017/03/React_illo_final_720x400.png',
        title,
        content,
        upvote: false,
      },
      {
        author: 'Juli',
        img:
          'https://cdn-images-1.medium.com/max/2400/1*FDNeKIUeUnf0XdqHmi7nsw.png',
        title,
        content,
        upvote: false,
      },
      {
        author: 'Ravi',
        img:
          'https://cdn-images-1.medium.com/max/1200/1*uwSAzkmaJGFf_0GmvTTZRQ.png',
        title,
        content,
        upvote: false,
      },
      {
        author: 'FGOD',
        img:
          'https://cdn-images-1.medium.com/max/1200/1*rxD2eVeer-CENwpg_OvqEA.png',
        title,
        content,
        upvote: false,
      },
    ];

    docs.forEach(async d => {
      const model = new Documents(d);
      await model.save();
    });

    res.send('ok');
  });
};
