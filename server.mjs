import express from 'express';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();
import apiv1Router from './apiv1/main.mjs'
const app = express()
app.use(express.json());
app.use(cors())
app.use("/api/v1", apiv1Router)

app.use('/', express.static(path.join(__dirname, 'public')))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})