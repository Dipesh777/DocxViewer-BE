// src/server.ts
import express from "express";
import cors from "cors";
import { checkFileInfo } from "./wopi/checkFileInfo.js";
import { getFile } from "./wopi/getFile.js";
import { generateToken } from "./utils/token.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// WOPI endpoints
app.get("/wopi/files/:fileId", checkFileInfo);
app.get("/wopi/files/:fileId/contents", getFile);

// API to generate Office iframe URL
app.get("/api/wopi-url", (req, res) => {
  const token = generateToken();

  const wopiSrc = encodeURIComponent(
    "https://docxviewer-be-production.up.railway.app/wopi/files/1"
  );

  const officeUrl =
    `https://word-edit.officeapps.live.com/we/wordeditorframe.aspx` +
    `?WOPISrc=${wopiSrc}` +
    `&access_token=${token}`;

  res.json({ officeUrl, token });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
