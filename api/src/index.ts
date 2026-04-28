import "./config.js";
import Express, {Request, Response} from "express";
import cors from "cors";
import simplifyRouter from "./routes/simplify.js";
import extractRouter from "./routes/extract.js";


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

app.use("/api", simplifyRouter);
app.use("/api", extractRouter);


app.listen(PORT, () => {
    console.log(`Easy Read API rodando em http://localhost:${PORT}`);
})


"C:\Users\danie\Downloads\MPC 2026 Somativa 01 - Apresentação de Tema de Pesquisa (1).pdf"

