import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const checkFileInfo = (req: Request, res: Response): void => {
  const filePath = path.join(__dirname, "../files/sample.docx");
  console.log(`checkFileInfo: filePath=${filePath}, access_token=${req.query.access_token}`);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "File not found" });
    return;
  }

  const stats = fs.statSync(filePath);

  res.json({
    BaseFileName: "sample.docx",
    Size: stats.size,
    OwnerId: "user-1",
    UserId: "user-1",
    Version: "1.0",
    UserCanWrite: true,
    SupportsUpdate: true,
    SupportsLocks: false
  });
};
