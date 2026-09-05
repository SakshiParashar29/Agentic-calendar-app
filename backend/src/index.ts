import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { getPool } from './db/pool.js';

const app = express();
const PORT = Number(process.env.PORT) || 4000
const appOrigin = process.env.APP_URL || "http://localhost:3000"

app.use(
    cors({
        origin: appOrigin,
        credentials: true
    })
)

app.use(express.json())

app.get('/health', async(_req, res) => {
    try {
        await getPool().query("SELECT 1");
        res.json({
            status:"OK",service:"Agentic-app-calendar" ,
            database: "Up"
        })
    } catch (error) {
        res.status(503).json({
            status: "error",
            service: "Agentic-app-calendar",
            database: "Down",
            message: "Internal server error"
        })
    }
});

app.listen(PORT, () => {
    console.log("Agentic calendar app is running on PORT:", PORT);
})