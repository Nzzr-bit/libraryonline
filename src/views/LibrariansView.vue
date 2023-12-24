<template>
  <div class="dialogs">
    <Dialog id="modalRequest9" v-model:visible="modalVisible9" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 9</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <Calendar class="calendar" id="start_date" dateFormat="dd-mm-yy" :touchUI="true" :showButtonBar="true"
                            :maxDate="request_data.finish_date" v-model="request_data.start_date"/>
                  <label for="start_date">Начальная дата</label>
                </div>
              </div>
              <div class="field">
                <div class="p-float-label">
                  <Calendar class="calendar" id="finish_date" dateFormat="dd-mm-yy" :touchUI="true" :showButtonBar="true"
                            :minDate="request_data.start_date" :maxDate="new Date()" v-model="request_data.finish_date"/>
                  <label for="finish_date">Конечная дата</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible9 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest12" v-model:visible="modalVisible12" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 12</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="library_name" v-model="request_data.library_name"/>
                  <label for="library_name">Название библиотеки</label>
                </div>
              </div>
              <div class="field">
                <div class="p-float-label">
                  <InputText id="number_hall" v-model="request_data.number_hall"/>
                  <label for="number_hall">Номер зала</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible12 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  </div>

  <div class="flex flex-wrap justify-content-center">
    <Dropdown class="dropdown" id="type" v-on:change="showModal()" v-model="current_request" :options="requests"
              placeholder="Запросы"/>
  </div>
  <div class="flex flex-wrap justify-content-center">
    <DataTable :value="request_response" :v-if="request_response !== -1" responsiveLayout="scroll" autolayout style="max-width: 80%">
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
    </DataTable>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import dateFormat from "dateformat";

export default {
  name: "LibrariansView",
  components: {
    DataTable,
    Column,
    Dropdown,
    Dialog,
    InputText,
    Button,
    Calendar
  },
  data() {
    return {
      current_request: null,
      request_data: null,
      request_response: null,
      requests: [
        "Получить данные о выработке библиотекарей (число обслуженных читателей в указанный период времени).",
        "Выдать список библиотекарей, работающих в указанном читальном зале некоторой библиотеки."
      ],
      columns: [],
      modalVisible9: false,
      modalVisible12: false
    }
  },
  methods: {
    showModal() {
      // Запрос 9
      if (this.current_request === this.requests[0]) {
        this.modalVisible9 = true
        this.request_data = {
          "start_date": null,
          "finish_date": null
        }
      }
      // Запрос 12
      if (this.current_request === this.requests[1]) {
        this.modalVisible12 = true
        this.request_data = {
          "library_name": null,
          "number_hall": null
        }
      }
    },
    handleSubmit() {
      // Запрос 9
      if (this.current_request === this.requests[0]) {
        for (let date in this.request_data) {
          this.request_data[date] = dateFormat(this.request_data[date], "dd-mm-yyyy")
          console.log(this.request_data[date])
        }
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_worker_production",
            this.request_data,
        ).then(response => {
          this.request_response = response.data
        })

        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible9 = false
          this.columns = [
            {field: "lw_fio", header: "ФИО"},
            {field: "count", header: "Количество обслуженных читателей"},
          ]
        }
      }
      // Запрос 12
      if (this.current_request === this.requests[1]) {
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_hall_workers?" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible12 = false
          this.columns = [
            {field: "lw_fio", header: "ФИО"},
          ]
        }
      }
    }
  },
  created() {
    axios.post(JSON.parse(localStorage.getItem("server_url")) + "/api/get_library_workers")
        .then(response => {
          this.request_response = response.data
        })
    this.columns = [
      {field: "lw_fio", header: "ФИО"},
      {field: "name", header: "Библиотека"}
    ]
  }
}
</script>

<style scoped>
.dropdown {
  min-width: 85%;
}
</style>