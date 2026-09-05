import 'dotenv/config'
import cors from 'cors'
import express from 'express'

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
        res.json({
            status:"OK",service:"Agentic-app-calendar"  
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
});

app.listen(PORT, () => {
    console.log("Agentic calendar app is running on PORT:", PORT);
})