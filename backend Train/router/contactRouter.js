const router = require("express").Router();
const { createContact, getAllContacts } = require("../controller/contactCon");

router.post("/contact", createContact);
router.get("/getContact", getAllContacts);

module.exports = router;
