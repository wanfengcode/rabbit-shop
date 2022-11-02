<template>
  <div class="accountBox">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
    </div>
    <Form ref="formTarget" class="form" :validation-schema="localSchema" v-slot="{errors}">
      <template v-if="isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{error:errors.account}" v-model="form.account"  name='account' type="text" placeholder="请输入用户名"></Field>
          </div>
          <div class="error" v-if="errors.account"><i class="iconfont icon-warning" />{{errors.account}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field :class="{error:errors.password}" v-model="form.password" name="password" type="password" placeholder="请输入密码"></Field>
          </div>
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field :class="{error:errors.mobile}" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号"></Field>
          </div>
          <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field :class="{error:errors.code}" v-model="form.code" name="code" type="password" placeholder="请输入验证码"></Field>
            <span @click="sendCode" class="code">{{time > 0 ? `${time}秒后重新发送`: '发送验证码'}}</span>
          </div>
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="RabbitCheckedBox" name="isAgree" v-model="form.isAgree"></Field>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree"><i class="iconfont icon-warning" />{{errors.isAgree}}</div>
      </div>
      <a @click="login" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { onUnmounted, reactive, ref, watch } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validation-schema'
import Message from '@/components/libs/Message'
import { msgCode, mobileLogin, userLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    // 切换登录方式
    const isMsgLogin = ref(true)
    // 表单信息
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // 用于获取表单元素
    const formTarget = ref(null)
    /*
        vee-validate插件使用步骤
        1.按需导入该插件的Form、Field组件;分别用于替换表单标签和input标签
        2.Form组件提供 validation-schema 属性用于接收校验规则对象,添加v-slot="{errors}"作用域插槽用于提供错误对象errors
            2.1 Form组件提供validate函数用于表单的整体校验，返回结果为promise对象
        3.Field组件添加name属性，取值应和校验规则对象里的方法同名用于触发同名函数完成对input框值变化时的校验；双向数据绑定相应input框的值
            3.1 Field的as属性支持将当前Field组件转为其他标签或组件，但组件必须支持v-model否则校验不触发
    */
    // 校验规则对象
    const localSchema = {
      isAgree: schema.isAgree,
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code
    }
    // 登录按钮触发事件
    const login = async () => {
      // 表单的整体校验
      const validResult = await formTarget.value.validate()
      if (validResult) {
        let data = null
        try {
          if (isMsgLogin.value) {
          // 用户登录
            const { account, password } = form
            data = await userLogin({ account, password })
          } else {
          // 手机号登录
            const { mobile, code } = form
            data = await mobileLogin({ mobile, code })
          }
          // 存储用户信息、路由跳转至原来页面或首页、信息提示
          const { id, avator, nickname, account, mobile, token } = data.result
          store.commit('user/setUser', { id, avator, nickname, account, mobile, token })
          router.push(route.query.redirectUrl ? route.query.redirectUrl : '/')
          Message({ type: 'success', text: '登录成功' })
        } catch (e) {
          if (e.response.data) {
            Message({ type: 'error', text: e.response.data.message })
          }
        }
      }
    }
    // 切换登陆方式后，清空表单信息
    watch(isMsgLogin, () => {
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
    })

    // 发送验证码倒计时
    const time = ref(0)
    // useIntervalFn(callback,执行间隔,是否立即开启)函数用于实现倒计时,resume和pause方法分别用于开启和暂停
    const { resume, pause } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        // 倒计时结果为零时停止
        pause()
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })
    // 发送短信验证码
    const sendCode = async () => {
      // 校验表单信息
      const valid = localSchema.mobile(form.mobile)
      if (valid === true) {
        // 校验成功，并且倒计时为零发送验证码请求
        if (time.value <= 0) {
          try {
            await msgCode(form.mobile)
            Message({ type: 'success', text: '验证码已发送' })
            time.value = 60
            // 开启定时器
            resume()
          } catch (e) {
            Message({ type: 'error', text: e.response.data.message || '发送失败' })
          }
        }
      } else {
        // 校验失败,vee的Form组件提供setFieldError(校验字段，msg)函数用来提示校验结果，msg为校验结果的错误信息
        formTarget.value.setFieldError('mobile', valid)
      }
    }

    return { isMsgLogin, form, localSchema, login, formTarget, sendCode, time }
  }
}
</script>

<style lang="less" scoped>
.accountBox {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 110px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
