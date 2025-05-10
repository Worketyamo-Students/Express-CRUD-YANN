import express from "express"
import bodyParser from "body-parser"
import route from "./routes/route.js";

const app = express();
const port = 2000;
app.use(bodyParser.json());
app.use(route);

app.listen(port, (err)=>{
    if (err) throw err;
    console.log(`le serveur tourne sur le lien http://localhost:${port}`);
    
})