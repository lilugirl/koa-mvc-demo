const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const isProduction = process.env.NODE_ENV === 'production';

//导入controller middleware
const controller = require('./controller');
const templating = require('./templating');




const app = new Koa();


app.use(async (ctx, next) => {
  console.log(`process ${ctx.request.method} ${ctx.request.url}...`);
  var start = new Date().getTime(),
    execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
})

let staticFiles = require('./static-files');
app.use(staticFiles('/static', __dirname + '/static'));

app.use(bodyParser());


app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}));


// add router middleware;
app.use(controller())
app.listen(3010);
console.log('app started at port 3010...');