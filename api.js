import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));

const api = express();

api.use(express.static(path.resolve(__dirname, "public")));

api.use("/", express.static("index.html"));

export default api;
