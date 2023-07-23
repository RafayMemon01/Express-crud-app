import express from 'express'
let router = express.Router()

import pRouter from './routes/post.mjs'

router.use(pRouter);
export default router