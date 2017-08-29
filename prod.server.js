var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var apiServer = express()

var router = express.Router()
router.get('/', function (req, res, next) {
  req.url = '/index.html'
  next()
})
apiServer.use(router)

var bodyParser = require('body-parser')
apiServer.use(bodyParser.urlencoded({ extended: true }))
apiServer.use(bodyParser.json())
var apiRouter = express.Router()
var fs = require('fs')
apiRouter.route('/:apiName')
  .all(function (req, res) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
      if (err) throw err
      data = JSON.parse(data)
      if (data[req.params.apiName]) {
        res.json(data[req.params.apiName])
      } else {
        res.send('no such api name')
      }
    })
  })

apiServer.use('/api', apiRouter)
apiServer.use(express.static('./dist'))
module.exports = apiServer.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + (port + 1) + '\n')
})
