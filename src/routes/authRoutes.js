// const router = require("express").Router();
// const {
//   checkAndAddUser,
//   checkAndLoginUser,
//   logOut,
//   checkForpassReset,
//   updateNewPassword,
// } = require("../controller/user");
// const { sendMail } = require("../controller/emailSender");
// const { cookieValidation } = require("./middlewares");

// // router.use(cookieValidation);
// router.get("/", cookieValidation, (req, res) => {
//   res.send(`you are good !`);
// });
// router.get("/profile", (req, res) => {
//   res.send(`profile`);
// });

// router.post("/register", (req, res) => {
//   // destructuring the expected
//   const { fullName, email, password, phone } = req.body;
//   // validation and insertion
//   checkAndAddUser({ fullName, email, password, phone, res });
// });

// router.post("/login", (req, res) => {
//   // destructuring the expected
//   const { email, password } = req.body;
//   // validation and login
//   checkAndLoginUser({ email, password, res });
// });

// router.get("/logout", (req, res) => {
//   logOut(req, res);
// });

// router.post("/recovery", (req, res) => {
//   // destructuring the expected
//   const { email } = req.body;
//   sendMail({ email, res, actType: "recovery" });
// });

// router.get("/recovery/:token", (req, res) => {
//   // destructuring the expected
//   const { token } = req.params;
//   checkForpassReset({ token, res });
// });

// router.post("/reset", (req, res) => {
//   // destructuring the expected
//   const { password } = req.body;
//   // validation
//   res.send(password);
//   updateNewPassword({ password, res });
// });

// router.post("/verification", (req, res) => {
//   const { email } = req.body;
//   // res.send(email);
//   sendMail({ email, res, actType: "verification" });
// });

// router.post("/verify", (req, res) => {
//   const { otp } = req.body;
//   res.send(otp);
// });

// module.exports = router;
