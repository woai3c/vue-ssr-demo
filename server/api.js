module.exports = function setApi(app) {
    let apiData = {
        one: '一级路由数据（通过 ajax 请求获取）',
        two: '二级路由数据（通过 ajax 请求获取）',
        three: '三级路由数据（通过 ajax 请求获取）'
    }
    
    app.get('/fetchData', (req, res) => {
        res.send({
            code: 0,
            data: apiData[req.query.key]
        })
    })
    
    app.post('/changeData', (req, res) => {
        const data = {
            one: ' x 级路由数据（通过 ajax 请求获取）',
            two: ' xx 级路由数据（通过 ajax 请求获取）',
            three: ' xxx 级路由数据（通过 ajax 请求获取）'
        }
    
        res.send({
            code: 0,
            data,
        })
    })
}