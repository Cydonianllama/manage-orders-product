const express = require('express');
const router = express.Router();

const sendMainPage = async (req, res) => {
    res.render('pages/Main');
}

const sendLoginPage = (req, res) => {
    res.render('pages/Login');
}

const sendDashboard = (req, res) => {
    //controller.getProducts(req,res);
}

router.get('/', sendMainPage);
router.get('/login', sendLoginPage);
router.get('/dashboard', sendDashboard);

module.exports = router;