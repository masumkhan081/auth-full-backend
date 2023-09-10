const router = require("express").Router();
const { checkAndAddUser, checkAndLoginUser } = require("../controller/user");
const { cookieValidation } = require("./middlewares");

router.use(cookieValidation);
router.get("/", cookieValidation, (req, res) => {
  res.send(`you are good !`);
});

router.post("/register", (req, res) => {
  // destructuring the expected
  const { fullName, email, password, phone } = req.body;
  // validation and insertion
  checkAndAddUser({ fullName, email, password, phone, res });
});

router.post("/login", (req, res) => {
  // destructuring the expected
  const { email, password } = req.body; 
  // validation and login
  checkAndLoginUser({ email, password, res });
});

router.post("/recovery", (req, res) => {
  const { email } = req.body;
  sendOTPMail(email, res);
});

router.post("/reset", (req, res) => {
  // destructuring the expected
  const { password } = req.body;
  // validation
});

router.post("/verification", (req, res) => {
  const { otp } = req.body;
});

module.exports = router;
