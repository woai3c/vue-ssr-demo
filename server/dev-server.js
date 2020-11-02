const path = require('path')
const express = require('express')
const setApi = require('./api')
const { createBundleRenderer } = require('vue-server-renderer')
const devServer = require('../build/setup-dev-server')
const favicon = require('serve-favicon')
const resolve = (file) => path.resolve(__dirname, file)

const app = express()

const serve = (path) => {
    return express.static(resolve(path), {
        maxAge: 0
    })
}

app.use(favicon(resolve('../public/favicon.ico')))
app.use('/dist', serve('../dist', true))

function createRenderer(bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            basedir: resolve('../dist'),
            runInNewContext: false
        })
    )
}

function render(req, res) {
    const startTime = Date.now()
    res.setHeader('Content-Type', 'text/html')

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            res.status(500).send('500 | Internal Server Error~')
            console.log(err)
        }
    }

    const context = {
        title: 'SSR 测试', // default title
        url: req.url
    }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        
        res.send(html)
        console.log(`whole request: ${ Date.now() - startTime }ms`)
    })
}

let renderer
let readyPromise
const templatePath = resolve('../public/index.template.html')

readyPromise = devServer(
    app,
    templatePath,
    (bundle, options) => {
        renderer = createRenderer(bundle, options)
    }
)

const port = 8080

app.listen(port, () => {
    console.log(`server started at localhost:${ port }`)
})

setApi(app)

app.get('*', (req, res) => {
    readyPromise.then(() => render(req, res))
})