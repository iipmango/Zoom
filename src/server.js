import http from "http";
import express from "express";
import path from "path";
import WebSocket, {WebSocketServer} from "ws";

const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log('Listening on http://localhost:3000');

const server = http.createServer(app);
const  wss = new WebSocketServer({server});

wss.on("connection", (socket) => {
    socket.send("hello");
});

server.listen(3000, handleListen);