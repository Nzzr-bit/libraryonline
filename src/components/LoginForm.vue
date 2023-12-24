<template>
  <div class="form-demo">
    <div class="flex justify-content-center">
      <div class="card">
        <h3 class="text-center">Авторизация</h3>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-credit-card"/>
              <InputText id="name" v-model="v$.login.$model" :class="{'p-invalid':v$.login.$invalid && submitted}"/>
              <label for="name" :class="{'p-error':v$.login.$invalid && submitted}">Логин*</label>
            </div>
            <small v-if="(v$.login.$invalid && submitted) || v$.login.$pending.$response"
                   class="p-error">Логин обязателен для заполнения</small>
          </div>
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-key"/>
              <InputText id="password" type="password" v-model="v$.password.$model"
                        :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
              </InputText>
              <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Пароль*</label>
            </div>
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
                   class="p-error">Пароль обязателен для заполнения</small>
          </div>
          <Button type="submit" label="Войти" class="mt-2"/>
          <Button @click="$router.push('/register')" label="Регистрация" class="mt-2"></Button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useAuthStore} from "../stores/auth";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";

export default {
  name: "RegisterForm",
  components: {
    Dialog,
    Divider,
    InputText,
    Password,
    Button
  },
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      login: '',
      password: '',
      submitted: false,
      state: useAuthStore(),
    }
  },
  validations() {
    return {
      login: {
        required
      },
      password: {
        required
      },
    }
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.state.login({
            "login": this.login,
            "password": this.password
          }
      )
      this.resetForm()
    },
    resetForm() {
      this.login = '';
      this.email = '';
      this.password = '';
      this.submitted = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.form-demo {
  .card {
    min-width: 35%;

    form {
      margin-top: 2rem;
    }

    .field {
      margin-bottom: 1.5rem;
    }
  }

  @media screen and (max-width: 960px) {
    .card {
      width: 80%;
    }
  }
}

</style>