const {
  createContext
} = require("vm")

var fn_index = async (ctx, next) => {
  ctx.render('index.html')
}


var fn_signin = async (ctx, next) => {
  var name = ctx.request.body.name || '',
    password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '123456') {
    // ctx.response.body = `<h1>Welcome, ${name}</h1>`
    // 登录成功
    ctx.render('signin-ok.html', {
      title: 'Sign in Ok',
      name: 'Mr node'
    });
  } else {
    // ctx.response.body = `<h1>Login failed!</h1>
    // <p><a href="/">Try again</a></p>
    // `

    // 登录失败
    ctx.render('signin-failed.html', {
      title: 'Sign In Failed'
    })
  }
}

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin
}