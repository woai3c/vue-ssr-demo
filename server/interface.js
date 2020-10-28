module.exports = function interface(app) {
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
}