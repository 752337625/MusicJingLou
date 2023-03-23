<script lang="ts" setup>
  import logo from '/@/assets/img/logo1.jpg';
  import usePhoneLogin from '/@/hook/usePhoneLogin';
  import type { FormInstance } from 'element-plus';
  const ruleFormRef = ref<FormInstance>();
  let { form, rules, countriesList, _getCaptchaSent, submitForm, title } = usePhoneLogin();
</script>
<template>
  <div class="phone">
    <img :src="logo" />
    <el-form ref="ruleFormRef" :model="form" label-width="0" size="large" :rules="rules">
      <el-form-item style="margin-bottom: 20px" prop="phone">
        <el-select v-model="form.countries" filterable style="width: 87px">
          <el-option v-for="item in countriesList" :key="item.code" :label="'+' + item.code" :value="item.code">
            <span style="float: left; font-size: 13px">{{ item.zh }}</span>
            <span style="float: right; font-size: 13px">+{{ item.code }}</span>
          </el-option>
        </el-select>
        <el-input v-model="form.phone" placeholder="请输入手机号" style="width: 203px" />
      </el-form-item>
      <el-form-item style="margin-bottom: 0px" prop="captcha">
        <el-input v-model="form.captcha" placeholder="请输入验证码" style="width: 290px">
          <template #append>
            <el-button @click="_getCaptchaSent">{{ title }}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item style="margin-top: 72px">
        <el-button style="width: 100%; background-color: #ff3a3a; color: #fff" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
      <el-form-item style="margin-top: 60px">
        <el-checkbox v-model="form.checked" label="同意" /><span>《服务条款》《隐私政策》《儿童隐私政策》</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
  .phone {
    text-align: center;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-form {
      -webkit-app-region: no-drag;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 290px;
    }
    .el-form-item {
      width: 100%;
      span {
        color: #507daf;
        font-size: 12px;
      }
    }
  }
  img {
    margin-bottom: 36px;
    width: 210px;
  }
</style>
