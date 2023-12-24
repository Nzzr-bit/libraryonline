<template>
  <div class="form-demo">
    <div class="flex justify-content-center">
      <div class="card">
        <h3 class="text-center">Регистрация</h3>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-credit-card"/>
              <InputText id="login" v-model="v$.login.$model" :class="{'p-invalid':v$.login.$invalid && submitted}"/>
              <label for="login" :class="{'p-error':v$.login.$invalid && submitted}">Логин*</label>
            </div>
            <small v-if="(v$.login.$invalid && submitted) || v$.login.$pending.$response"
                   class="p-error">Логин обязателен для заполнения</small>
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password id="password" v-model="v$.password.$model"
                        :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                <template #header>
                  <h6>Введите пароль</h6>
                </template>
                <template #footer="sp">
                  <Divider/>
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>Хотя бы одна строчная</li>
                    <li>Хотя бы одна заглавная</li>
                    <li>Хотя бы одна цифра</li>
                    <li>Минимум 8 символов</li>
                  </ul>
                </template>
              </Password>
              <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Пароль*</label>
            </div>
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
                   class="p-error">Пароль обязателен для заполнения</small>
          </div>
          <div class="field">
            <div class="p-float-label">
              <Dropdown id="type" v-model="type" :options="user_types" placeholder="Кем вы являетесь?"
                        :class="{'p-invalid':v$.type.$invalid && submitted}"/>
              <label for="type">Тип пользователя
              </label>
            </div>
            <small v-if="(v$.type.$invalid && submitted) || v$.type.$pending.$response"
                   class="p-error">Тип пользователя обязателен для выбора</small>
          </div>
          <Button type="submit" label="Зарегистрироваться" class="mt-2"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {alphaNum, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useAuthStore} from "../stores/auth";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";

export default {
  name: "RegisterForm",
  components: {
    Dialog,
    Divider,
    InputText,
    Password,
    Button,
    Dropdown
  },
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      login: '',
      password: '',
      type: null,
      submitted: false,
      state: useAuthStore(),
      user_types: [
        'Обычный житель',
        'Студент',
        'Научный работник',
        'Преподаватель',
        'Школьник',
        'Работник библиотеки',
        'Пенсионер'
      ]
    }
  },
  validations() {
    return {
      login: {
        required,
        alphaNum
      },
      password: {
        required,
        alphaNum
      },
      type: {
        required
      }
    }
  },
  methods: {
    handleSubmit(isFormValid) {
      console.log(isFormValid)
      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.state.register({
            "login": this.login,
            "password": this.password,
            "user_type": this.type
          }
      )
    },
    resetForm() {
      this.login = '';
      this.password = '';
      this.type = null;
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