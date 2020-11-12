const Koa = require('koa')
const app = new Koa()

// 中间件的方法测试

// 拿到ctx的request里的path
// 通过app.use来使用这个middleware
// 通过app.listen来监听3000端口
const middleware = function async(ctx, next) {
    console.log('this is a midlleware!');
    console.log(ctx.request.path)
    // next()  // 一旦中间件中没有出现next()，koa就默许本次的请求终止了
}

const middleware1 = function async(ctx, next) {
    console.log('this is a midlleware1!');
    console.log(ctx.request.path)
    next()
    console.log('this is 1 ending');  // 碰到next以后的内容不会去执行，它会按照一个先进后出的顺序去进行回调执行。
}

const middleware2 = function async(ctx, next) {
    console.log('this is a midlleware2!');
    console.log(ctx.request.path)
    next()
    console.log('this is 2 ending');
}

app.use(middleware1)
    .use(middleware2)
    .use(middleware)
    .listen(3000)