const express = require('express');

const app = express();

app.use(require('cors')()); //跨域
app.use(express.json()); //json

require('./plugins/db')(app);
require('./routes/admin')(app);

app.listen(3000, () => {
    console.log('开始监听：http://localhost:3000');
});