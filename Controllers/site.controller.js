exports.LoginPage = function (req,res) {
    const LoginData = {
        name:'Nuttakarn'
    }
    return res.render('Login',{LoginData});
}

exports.HomePage = function (req,res) {
    return res.render("Home")
}

exports.CardataPage = function (req,res) {
    return res.render("Cardata")
}