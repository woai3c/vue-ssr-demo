const fs = require('fs')
const path = require('path')
const express = require('express')
const LRU = require('lru-cache')

const { createBundleRenderer } = require('vue-server-renderer')
const devServer = require('./build/setup-dev-server')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const app = express()

const microCache = LRU({
    max: 100,
    maxAge: 1000 // 重要提示：条目在 1 秒后过期。
})

const isCacheable = req => {
    // 实现逻辑为，检查请求是否是用户特定(user-specific)。
    // 只有非用户特定(non-user-specific)页面才会缓存
    return true
}

const serve = (path, cache) => {
    return express.static(resolve(path), {
        maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
    })
}

app.use('/dist', serve('./dist', true))

function createRenderer(bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            basedir: resolve('./dist'),
            runInNewContext: false
        })
    )
}

function render(req, res) {
    const cacheable = isCacheable(req)
    if (cacheable) {
        const hit = microCache.get(req.url)
        if (hit) {
            console.log('Response from cache')
            return res.end(hit)
        }
    }

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
        if (cacheable) {
            microCache.set(req.url, html)
        }
        if (!isProd) {
            console.log(`whole request: ${ Date.now() - startTime }ms`)
        }
    })
}

let renderer
let readyPromise
const templatePath = resolve('./src/index.template.html')

if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json') // 将js文件注入到页面中
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    })
} else {
    readyPromise = devServer(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options)
        }
    )
}

const port = 8080

app.listen(port, () => {
    console.log(`server started at localhost:${ port }`)
})

let apiData = {
    one: '一级路由数据',
    two: '二级路由数据',
    three: '三级路由数据'
}

app.get('/fetchData', (req, res) => {
    res.send({
        code: 0,
        data: apiData[req.query.key]
    })
})

app.post('/changeData', (req, res) => {
    const data = {
        one: ' x 级路由数据',
        two: ' xx 级路由数据',
        three: ' xxx 级路由数据'
    }

    res.send({
        code: 0,
        data,
    })
})

app.get(
    '*',
    isProd
        ? render
        : (req, res) => {
            readyPromise.then(() => render(req, res))
        }
)