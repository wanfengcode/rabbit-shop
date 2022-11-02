
export default {
  // 用户名校验
  account (value) {
    if (!value) return '请输入用户名'
    // 校验规则：字母开头，6~20个字符
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头6~20个字符'
    return true
  },
  password (value) {
    if (!value) return '请输入密码'
    // 6~24个字符
    if (!/^\w{6,}$/.test(value)) return '6~24个字符'
    return true
  },
  mobile (value) {
    if (!value) return '请输入手机号'
    // 1开头 3~9 9个数字结尾
    if (!/^1[3-9]\d{9}$/.test(value)) return '号码格式不对'
    return true
  },
  code (value) {
    if (!value) return '请输入验证码'
    // 6位数字
    if (!/^\d{6}$/.test(value)) return '验证码为六位数字'
    return true
  },
  isAgree (value) {
    if (!value) return '请勾选用户协议'
    return true
  }

}
