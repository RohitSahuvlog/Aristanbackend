const express = require("express");
const Footer = require("../model/footer");
const router = express.Router();

router.get("/data", async (req, res) => {
  try {
    const allData = await Footer.findOne();
    res.json(allData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

router.post("/data", async (req, res) => {
  try {
    let footer = await Footer.findOne();

    if (!footer) {
      footer = new Footer(req.body);
    } else {
      footer.addresses = req.body.addresses;
      footer.contactInfo = req.body.contactInfo;
    }

    await footer.save();

    res.status(200).json(footer);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating data." });
  }
});

module.exports = router;
