<template>
  <Card class="card" style="padding-top: 20px">
    <template #title>
      <span>{{ book.b_name }}</span>
    </template>
    <template #subtitle>
      <span>{{ book.authors_fio }}</span>
    </template>
    <template #content>
      <div class="field">
        <span>Тип издания: {{ book.b_type }}</span>
      </div>
      <div class="field">
        <span>Жанр: {{ book.genre }}</span>
      </div>
    </template>
    <template #footer>
      <Button label="Показать" icon="pi pi-external-link" @click="showModal = true"
              :aria-controls="showModal ? 'dlg' : null"
              :aria-expanded="showModal" position="top"/>
      <Dialog v-model:visible="showModal" style="width: 30%">
        <div class="flex flex-column">
          <!--TODO: Фикс авторов, места хранения-->
          <div class="modal-title"><span>{{ book.b_name }}</span></div>
          <div class="modal-subtitle"><span>{{ book.authors_fio }}</span></div>
          <div class="modal-field">
            <span>Место хранения: Библиотека {{ book.location }}, зал {{ book.number_hall }}, полка {{ book.sh_id }}</span>
          </div>
          <div class="modal-field">
            <span>Кол-во экземпляров: {{ book.quantity }}</span>
          </div>
        </div>
        <template #footer>
          <div class="flex justify-content-center">
            <Button label="Закрыть" @click="showModal = false" class="p-button-text" autofocus/>
          </div>
        </template>
      </Dialog>
    </template>
  </Card>
</template>

<script>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Card from "primevue/card";

export default {
  name: "BookCard",
  components: {
    Card,
    Button,
    Dialog
  },
  props: {
    book: Object
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>

<style scoped>
.card {
  min-width: 24%;
  margin: 7px;
}
</style>