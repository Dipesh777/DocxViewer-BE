import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const checkFileInfo = (req: Request, res: Response): void => {
  console.log('checkfileinfo called')
  const filePath = path.join(__dirname, "../files/sample.docx");
  const stats = fs.statSync(filePath);
  console.log('check filepath')

  res.json({
    BaseFileName: "sample.docx",
    Size: stats.size,
    OwnerId: "user-1",
    Version: "1.0",
    UserCanWrite: true,
    SupportsUpdate: false
  });
};
