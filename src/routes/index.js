const router = require("express").Router()

router.post("/signup", (req, res) => {
    const { fullName, email, password, phone } = req.body;
    console.log(fullName, email, password, phone)
})

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
})

router.post("/reset", (req, res) => {
    const { password } = req.body;

})
router.post("/forgetting-sarah-marshall", (req, res) => {
    const { email } = req.body;
})

router.post("/verification", (req, res) => {
    const { otp } = req.body;
})


module.exports = router;