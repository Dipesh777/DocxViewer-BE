import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const getFile = (req: Request, res: Response): void => {
  const filePath = path.join(__dirname, "../files/sample.docx");

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );

  fs.createReadStream(filePath).pipe(res);
};
