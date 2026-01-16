class homepage{
    home(req,res){
        return res.render('homepage/homepage',{
            script:'homepage/homepage.js',
            stylesheet:'homepage/homepage.css'
        })
    }
}

module.exports = new homepage()