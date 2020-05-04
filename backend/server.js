let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./db/db');

const articleRoute = require('./routes/article.route');

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log('MongoDB connection');
    },
    (error) => {
      console.log('Error connection: ' + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use('/articles', articleRoute);

const port = process.env.PORT || 5000;
//const server =
app.listen(port, () => {
  console.log('Connected. Port: ' + port);
});

// app.use((req, res, next) => {
//     res.status(404).send("404");
// });

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
});


