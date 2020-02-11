require('dotenv').config();
module.exports = {
  url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-rmg1e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
};
