const express = require('express');
const userRouter = require('./routes/user.routes')
const PORT = process.env.PORT || 3002

const app = express();
app.use(express.json());

app.use('/api', userRouter)


app.listen(PORT, () => console.log(`server is running on post ${PORT}`))
