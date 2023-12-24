<template>
  <PersonalForm></PersonalForm>
  <div class="flex justify-content-center">
    <Button class="mt-2" style="width: 35%" label="Показать выданные экземпляры" @click="showModal = true"
            :aria-controls="showModal  ? 'dlg' : null"
            :aria-expanded="showModal"/>
  </div>
  <Dialog id="dlg" v-model:visible="showModal" style="max-width: 80%" :modal="true">
    <div class="flex flex-column">
      <div>
        <DataTable :value="instances" responsiveLayout="scroll">
          <Column field="date" header="Дата выдачи"></Column>
          <Column field="term" header="Cрок сдачи"></Column>
          <Column field="name" header="Название"></Column>
          <Column field="authors" header="Авторы"></Column>
        </DataTable>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-content-center">
        <Button label="Закрыть" @click="showModal = false" class="p-button-text" autofocus/>
      </div>
    </template>
  </Dialog>
</template>

<script>
import PersonalForm from "../components/PersonalForm.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";

export default {
  name: "PersonalView",
  components: {
    PersonalForm,
    Dialog,
    Button,
    Column,
    DataTable
  },
  data() {
    return {
      showModal: false,
      instances: [
        {
          date: "21.05.2022",
          term: "25.07.2022",
          name: "Кошки и мужики",
          authors: "Олег Авантюра"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>