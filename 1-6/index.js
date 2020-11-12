const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const app = new Koa()
const router = new Router()

// prefix用来定义路由的前缀
router.prefix('/api')

// 请求访问/目录的时候，返回"hello world"
router.get('/', ctx => {
    console.log(ctx);
    console.log(ctx.request);
    ctx.body = 'Hello World!!'
})

// 请求访问/api目录的时候，返回"hello API"
router.get('/api', ctx => {
    // 获取GET请求中的params（参数）
    const params = ctx.request.query
    console.log("this is the params");
    console.log(params);
    console.log(params.name, params.age);
    console.log("params end");
    console.log(ctx.request);
    ctx.body = 'Hello Api!!'
})

// 使用async await可以很好的规避回调黑洞
// await 后面直接接一个promise对象
router.get('/async', async (ctx) => {
    let result = await new Promise((resolve) => {
        setTimeout(function () {
            resolve('hello world 2s later')
        }, 2000)
    })
    ctx.body = result
})

router.post('/post', async (ctx) => {
    let {body} = ctx.request  // 把postman里传过来的body请求体里的内容都放到body对象里
    console.log(body);
    console.log(ctx.request);
    ctx.body = {
        ...body  // 这里是ES6的写法，...是扩展运算符，把body里的内容展开，返回回去
    }

})

/*1-6作业部分*/
router.post('/user', async (ctx) => {
    let {body} = ctx.request
    let {header} = ctx.request
    console.log(header.role) // admin
    console.log(body.name + ' ' + body.email) // imooc imooc@test.com
    if (!body.name || !body.email) {
        ctx.body = {
            "code": 404,
            "msg": "name与email不得为空"
        }
    } else if (!header.role || header.role != "admin") {
        ctx.body = {
            "code": 401,
            "msg": "unauthorized post"
        }
    } else {
        ctx.body = {
            "code": 200,
            "data": {
                "name": "imooc",
                "email": "imooc@email.com"
            },
            "msg":"上传成功"
        }
    }
})


app.use(koaBody())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())  // allowedMethods相当是一个拦截器，主要去拦截应用里没有的请求
    .listen(3000)