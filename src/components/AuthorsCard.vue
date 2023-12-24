<template>
  <Card class="card" style="padding-top: 20px">
    <template #title>
      <span>{{ author.author }}</span>
    </template>
    <!-- <template #subtitle>-->
    <!--        <span>{{ author.authors }}</span>-->
    <!--      </template>-->
    <!--      <template #content>-->
    <!--        <div class="field">-->
    <!--          <span>Тип издания: {{ author.text }}</span>-->
    <!--        </div>-->
    <!--      </template> -->
    <template #footer>
      <Button
        label="Показать"
        icon="pi pi-external-link"
        @click="showModal = true"
        :aria-controls="showModal ? 'dlg' : null"
        :aria-expanded="showModal"
        position="top" />
      <Dialog
        id="dlg"
        v-model:visible="showModal"
        style="max-width: 80%"
        :modal="true">
        <div class="flex flex-column">
          <div>
            <DataTable :value="author.books" responsiveLayout="scroll">
              <Column field="name" header="Название издания"></Column>
              <Column field="type" header="Тип издания"></Column>
              <Column field="genre" header="Жанр"></Column>
            </DataTable>
          </div>
        </div>
        <template #footer>
          <div class="justify-content-center">
            <Button
              label="Закрыть"
              @click="showModal = false"
              class="mt-2"
              autofocus />
          </div>
        </template>
      </Dialog>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: "AuthorsCard",
  components: {
    Card,
    Button,
    Dialog,
    DataTable,
    Column,
  },
  props: {
    author: Object,
  },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style scoped>
.card {
  min-width: 24%;
  margin: 7px;
}
</style>
