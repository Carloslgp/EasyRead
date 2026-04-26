import Express, {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dot } from "node:test/reporters";
import { time, timeStamp } from "node:console";

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(Express.json());


app.get("/health", (req: Request, res: Response) => {

    res.json({
        status: "ok",
        timestamp: new Date().toISOString()
    })

})


app.listen(PORT, () => {
    console.log(`Easy Read API rodando em http://localhost:${PORT}`);
})

