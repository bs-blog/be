const express = require('express');

const app = express();
const port = process.env.PORT || 9009;

app.use(require('./routers/system'))
app.use(require('./routers/upload'))

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Dev Server is Listening on port ${port}`));