const http = require("http")
const fs = require("fs")
const _ = require("lodash")

const server = http.createServer((req, res) => {
    // console.log(req.url,req.method)
    console.log("request made")
    const num = _.random(0, 20)
    console.log(num)
    
    res.setHeader('Content-Type', 'text/html')
    let path = "./views/"
    if (req.url == "/") {
        path += "docs\views\index.html"
        res.statusCode = 200
    } else if (req.url == "/about") {
        path += "docs\views\about.html"
        res.statusCode = 200
    } else if (req.url == "/about-me") {
        res.statusCode = 301
        res.setHeader("Location", "/about")
        res.end()
    } else {
        path += "docs\views\404.html"
        res.statusCode = 404;
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            // res.write(data)
            res.end(data)
        }
    })

})

server.listen(3000, 'localhost', () => {
    console.log("listening for requests on port 3000")
})