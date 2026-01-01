import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const getFile = (req: Request, res: Response): void => {
  console.log(`getFile: access_token=${req.query.access_token}`);
  const filePath = path.join(__dirname, "../files/sample.docx");

  if (!fs.existsSync(filePath)) {
    res.status(404).send("File not found");
    return;
  }

  const stat = fs.statSync(filePath);
  const total = stat.size;
  const range = req.headers.range;

  res.setHeader("Accept-Ranges", "bytes");

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : total - 1;

    if (start >= total || start > end) {
      res.status(416).setHeader("Content-Range", `bytes */${total}`).end();
      return;
    }

    res.status(206);
    res.setHeader("Content-Range", `bytes ${start}-${end}/${total}`);
    res.setHeader("Content-Length", (end - start + 1).toString());
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    const stream = fs.createReadStream(filePath, { start, end });
    stream.pipe(res);
  } else {
    res.setHeader("Content-Length", total.toString());
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  }
};
