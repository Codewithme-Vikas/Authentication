const express = require("express");

const router = express.Router();


// import the handlers
const { login, singup } = require("../controller/Auth");


router.post('/singup', singup);

router.post('/login', login);


// import the authentication and  authorization middlewares
const { auth, isStudent, isAdmin } = require("../middlewares/auth");


// protected routes
router.get('/student', auth, isStudent, (req, res) => {
    res.json({ success: true, message: 'Protected route for the students.' })
});

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({ success: true, message: 'Protected route for the admin.' })
});





module.exports = router;