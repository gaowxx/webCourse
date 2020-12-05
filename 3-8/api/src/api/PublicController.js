import svgCaptcha from 'svg-captcha'

class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({
      size: 4, // 验证码位数
      ignoreChars: '0o1il',  // 忽略容易混淆的0o1il
      color: true,  // 背景色
      noise: Math.floor(Math.random() * 5),  // 干扰线数量
      width: 150,  // 宽高
      height: 50
    })
    console.log(newCaptcha)
    ctx.body = {
      // 终端工具里的text是它生成的图形验证码
      code: 200,
      data: newCaptcha.data
    }
  }
}

export default new PublicController()
