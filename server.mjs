import express from 'express';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();

const app = express()
app.use(cors())

// import apiv1Router from './APIV1/main.mjs'
// import apiv2Router from './APIV2/main.mjs'
// app.use(express.json()); 

// app.use("/api/v1", apiv1Router)
// app.use("/api/v2", apiv2Router)
// app.get('/', (req, res, next) =>{
//     res.send('Hello World')    

// })

app.use('/', express.static(path.join(__dirname, 'public')))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})