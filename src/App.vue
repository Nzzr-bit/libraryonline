<template>
  <header>
    <div class="menubar">
      <Menubar>
        <template #start>
          <ul class="p-menubar-root-list">
            <li class="p-menuitem">
              <div class="p-menuitem-content">
                <RouterLink
                  to="/"
                  v-if="auth_state.auth"
                  class="p-menuitem-link">
                  <span class="p-menuitem-icon pi pi-home"></span>
                  <span class="p-menuitem-text">Главная</span>
                </RouterLink>
              </div>
            </li>
            <!-- <li class="p-menuitem">
              <div class="p-menuitem-content">
                <RouterLink
                  to="/books"
                  v-if="auth_state.auth"
                  class="p-menuitem-link">
                  <span class="p-menuitem-icon pi pi-book"></span>
                  <span class="p-menuitem-text">Книги</span>
                </RouterLink>
              </div>
            </li> -->
            <!-- <li class="p-menuitem">
              <div class="p-menuitem-content">
                <RouterLink
                  to="/authors"
                  v-if="auth_state.auth"
                  class="p-menuitem-link">
                  <span class="p-menuitem-icon pi pi-bookmark"></span>
                  <span class="p-menuitem-text">Авторы</span>
                </RouterLink>
              </div>
            </li> -->
            <li class="p-menuitem">
              <div class="p-menuitem-content">
                <RouterLink
                  to="/readers"
                  v-if="auth_state.auth"
                  class="p-menuitem-link">
                  <span class="p-menuitem-icon pi pi-user"></span>
                  <span class="p-menuitem-text">Читатели</span>
                </RouterLink>
              </div>
            </li>
            <li class="p-menuitem">
              <div class="p-menuitem-content">
                <RouterLink
                  to="/librarians"
                  v-if="auth_state.auth"
                  class="p-menuitem-link">
                  <span class="p-menuitem-icon pi pi-briefcase"></span>
                  <span class="p-menuitem-text">Библиотекари</span>
                </RouterLink>
              </div>
            </li>
          </ul>
        </template>
        <template #end>
          <ul class="p-menubar-root-list">
            <li class="p-menuitem">
              <div class="p-menuitem-content">
                <RouterLink
                  to="/login"
                  v-if="!auth_state.auth"
                  class="p-menuitem-link">
                  <span class="p-menuitem-icon pi pi-power-off"></span>
                  <span class="p-menuitem-text">Войти</span>
                </RouterLink>
                <RouterLink
                  to="/personal"
                  v-if="auth_state.auth"
                  class="p-menuitem-link">
                  <span class="p-menuitem-icon pi pi-id-card"></span>
                  <span class="p-menuitem-text">Личный кабинет</span>
                </RouterLink>
              </div>
            </li>
            <li class="p-menuitem">
              <div class="p-menuitem-content">
                <RouterLink
                  to="/login"
                  @click="auth_state.logout()"
                  v-if="auth_state.auth"
                  class="p-menuitem-link">
                  <span class="pi pi-power-off"></span>
                </RouterLink>
              </div>
            </li>
          </ul>
        </template>
      </Menubar>
    </div>
  </header>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Menubar from "primevue/menubar";

import { useAuthStore } from "./stores/auth";

export default {
  components: {
    RouterView,
    RouterLink,
    Menubar,
  },
  data() {
    return {
      auth_state: useAuthStore(),
    };
  },
};
</script>

<style scoped></style>
