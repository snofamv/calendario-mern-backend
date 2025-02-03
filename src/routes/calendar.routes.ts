import { Request, Response, Router } from "express";
const calendarRoutes = Router();

calendarRoutes.get("/", (req: Request, res: Response) => {
  res.send("Calendar route");
});
export default calendarRoutes;
