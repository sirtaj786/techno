const express = require("express");
const empModel = require("../Model/employee.model");
const empRouter = express.Router();

empRouter.post("/addemployee", async (req, res) => {
  const { empname, empemail, empage, empId } = req.body;
  
  const new_item = new empModel({
    empname,
    empemail,
    empage,
    empId,
  });
  await new_item.save();
  res.send({ message: "employee Created Successfully", item: new_item });
});

empRouter.get("/", async (req, res) => {
  const { empId } = req.body;
  const items = await empModel.find({ empId });
  return res.send(items);
});
module.exports = empRouter;