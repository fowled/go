import express from "express";
import http from "http";

import * as logger from "./utils/logger.js";

const app = express();
const port = 80;

registerServer();

app.use(express.urlencoded({ extended: true }));

const urls = {
    twitter: "https://twitter.com/playboifowled",
    github: "https://github.com/fowled",
    mango: "https://discord.com/api/oauth2/authorize?client_id=497443144632238090&permissions=268758135&scope=bot%20applications.commands",
    self: "https://github.com/fowled/go"
};

app.get("/", async (req, res) => {
    return res.redirect(urls.self);
});

app.get("/:url/", async (req, res) => {
    if (urls[req.params.url]) {
        return res.redirect(urls[req.params.url]);
    } else {
        return res.redirect(urls.self);
    }
});

function registerServer() {
    http.createServer(app).listen(port).on("listening", () => {
        logger.log("HTTP server listening");
    });
}
