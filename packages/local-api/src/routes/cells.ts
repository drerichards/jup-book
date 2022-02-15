import express from "express";
import path from "path";
import fs from "fs/promises";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json()); // body parsing middleware

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    //make sure cell storage file exists. if not, create default list
    try {
      // read file
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      // parse list of cells from file
      // send list to browser
      res.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    // serialize list of cells from req
    // write cells to file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    try {
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
    }
  });

  return router;
};
