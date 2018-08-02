const path = require('path')
const fs = require('fs')

const koa = require('koa')
const router = require('koa-router')
const serve = require('koa-static')
const http = require('http')
const socket = require('socket.io')
const chokidar = require('chokidar')
const parser = require('body-parser')
const request = require('request-promise')
const markdownIt = require('markdown-it')
const markdownItTaskCheckbox = require('markdown-it-task-checkbox')
const markdownItEmoji = require('markdown-it-emoji')
const markdownItGitHubHeadings = require('markdown-it-github-headings')

const utils = require('./Utils')

class Server {
  constructor(opts) {
    this.md = markdownIt({
      html: true,
      linkify: true
    })
    this.md.use(markdownItTaskCheckbox)
    this.md.use(markdownItEmoji)
    this.md.use(markdownItGitHubHeadings, {
      prefix: ''
    })

    this.app = new Koa()
    this.app.use(router)
    this.server = http.Server(app)
    this.io = socket(server)

    this.opts = opts || {}
    this.port = opts.port || 1337
    this.URI = 'http://localhost:' + this.port
    this.sock = {emit: function() {}}

    this.listen = next => {
      server.listen(this.port, next)
    }

    this.watch = path => {
      chokidar.watch(path).on('change', (path, stats) => {
        fs.readFile(path, 'utf8', (err, data) => {
          if (err) throw err
          data = data || ''
          this.sock.emit('content', md.reader(data))
        }
      }
    }
  }

  async stop(next) {
    await request.del(this.URI, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    next()
  }

  async start(filePath, next) {
    let sendFileOpts = {}

    if (utils.isPathRelative(filePath) {
      sendFileOpts.root = path.resolve(__dirname)
    }

    this.stop(() => {
      this.watch(filePath)
      this.listen(next)
    })

    this.io.on('connection', sock => {
      this.sock = sock
      this.sock.emit('title', path.basename(filePath)
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err
        data = data || ''
        this.sock.emit('content', this.md.render(data))
      })
    })

    this.app.use(parser.json())
    router.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'))
    })

    this.app.use(serve(path.join(__dirname, 'public')))
    this.app.use(serve(path.dirname(filePath))

    this.app.delete('/', (req, res) => {
      this.io.emit('kill')
      res.end()
      process.exit()
    })
  }
}

module.exports = new Server(opts)


