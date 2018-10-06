const express = require('express');
const uploadRouter = require('./routers/upload')

const app = express();
const port = process.env.PORT || 9009;

app.use(uploadRouter)

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Dev Server is Listening on port ${port}`));