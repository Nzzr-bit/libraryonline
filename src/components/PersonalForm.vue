<template>
  <div class="form-demo">
    <div class="flex justify-content-center">
      <div class="card">
        <h3 class="text-center">Личный кабинет</h3>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-credit-card" />
              <InputText
                :disabled="!updateVisible"
                id="fio"
                v-model="v$.fio.$model"
                :class="{ 'p-invalid': v$.fio.$invalid && submitted }"
                aria-describedby="fio-error" />
              <label
                for="fio"
                :class="{ 'p-error': v$.fio.$invalid && submitted }"
                >ФИО*</label
              >
            </div>
            <small
              v-if="(v$.fio.$invalid && submitted) || v$.fio.$pending.$response"
              class="p-error"
              >ФИО обязательно для заполнения
            </small>
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password
                :disabled="!updateVisible"
                id="password"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                toggleMask>
                <template #header>
                  <h6>Введите пароль</h6>
                </template>
                <template #footer="sp">
                  <Divider />
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>Хотя бы одна строчная</li>
                    <li>Хотя бы одна заглавная</li>
                    <li>Хотя бы одна цифра</li>
                    <li>Минимум 8 символов</li>
                  </ul>
                </template>
              </Password>
              <label
                for="password"
                :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Пароль*</label
              >
            </div>
            <small
              v-if="
                (v$.password.$invalid && submitted) ||
                v$.password.$pending.$response
              "
              class="p-error"
              >Пароль обязателен для заполнения</small
            >
          </div>
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-tag" />
              <InputText :disabled="true" id="type" v-model="type" />
              <label for="type">Тип пользователя</label>
            </div>
          </div>
          <Dialog v-model:visible="showMessage" position="top">
            <div class="flex align-items-center flex-column pt-6 px-3">
              <i
                class="pi pi-check-circle"
                :style="{ fontSize: '5rem', color: 'var(--green-500)' }"></i>
              <h5>Успешно</h5>
              <p :style="{ lineHeight: 1.5, textIndent: '1rem' }">
                Информация была успешно обновлена!
              </p>
            </div>
          </Dialog>
          <Button
            v-if="updateVisible"
            type="submit"
            label="Обновить"
            class="mt-2" />
          <Button
            v-if="!updateVisible"
            @click="updateVisible = true"
            label="Изменить"
            class="mt-2" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { alphaNum, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "../stores/auth";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";

export default {
  name: "PersonalForm",
  components: {
    Dialog,
    Divider,
    InputText,
    Password,
    Button,
    Dropdown,
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      fio: useAuthStore().current_user["u_fio"],
      password: useAuthStore().current_user["password"],
      type: useAuthStore().current_user["u_type"],
      submitted: false,
      updateVisible: false,
      showMessage: false,
      state: useAuthStore(),
      user_types: [
        "Обычный житель",
        "Студент",
        "Научный работник",
        "Преподаватель",
        "Школьник",
        "Работник библиотеки",
        "Пенсионер",
      ],
    };
  },
  validations() {
    return {
      fio: {
        required,
      },
      password: {
        required,
        alphaNum,
      },
    };
  },
  methods: {
    async updateUserData() {
      try {
        const response = await axios.put(
          `/api/update_user/${this.state.current_user.id}`,
          {
            fio: this.fio,
            password: this.password,
          }
        );

        if (response.data.message) {
          this.updateVisible = false;
          this.showMessage = true;
        } else {
          console.error(response.data.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleSubmit(isFormValid) {
      console.log(isFormValid);
      this.submitted = true;

      if (!isFormValid) {
        return;
      }
      this.updateVisible = false;
      this.showMessage = true;
      this.state.update({
        fio: this.fio,
        type: this.type,
      });
    },
  },
};
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
