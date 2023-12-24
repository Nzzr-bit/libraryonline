<template>
  <div class="dialogs">
    <Dialog id="modalRequest7" v-model:visible="modalVisible1" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 7</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="name" v-model="request_data.name"/>
                  <label for="name">Библиотека</label>
                </div>
              </div>
              <div class="field">
                <div class="p-float-label">
                  <InputText id="shelf" v-model="request_data.shelf"/>
                  <label for="shelf">Полка</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible1 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest11" v-model:visible="modalVisible2" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 11</h3>
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
              <Button @click="this.modalVisible2 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest14" v-model:visible="modalVisible3" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 14</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="name" v-model="request_data.book_name"/>
                  <label for="name">Название книги</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible3 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest15" v-model:visible="modalVisible4" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 15</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="name" v-model="request_data.author_name"/>
                  <label for="name">ФИО автора</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible4 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest16" v-model:visible="modalVisible5" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 16</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible5 = false" label="Назад" class="mt-2"></Button>
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
    <DataTable :value="request_response" :v-if="request_response !== -1" responsiveLayout="scroll">
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
    </DataTable>
  </div>
  <div class="flex flex-wrap justify-content-center">
    <BookCard :book=book v-for="book in books"></BookCard>
  </div>
</template>

<script>
import BookCard from "../components/BookCard.vue";
import axios from "axios"
import dateFormat from "dateformat";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";

export default {
  name: "BooksView",
  components: {
    BookCard,
    DataTable,
    Column,
    Dialog,
    Dropdown,
    Button,
    InputText,
    Calendar
  },
  data() {
    return {
      current_request: null,
      request_data: null,
      request_response: null,
      requests: [
          "Получить список литературы, которая в настоящий момент выдана с определенной полки некоторой библиотеки.",
          "Получить перечень указанной литературы, которая поступила (была списана) в течение некоторого периода.",
          "Получить список инвентарных номеров и названий из библиотечного фонда, в которых содержится указанное произведение.",
          "Выдать список инвентарных номеров и названий из библиотечного фонда, в которых содержатся произведения указанного автора.",
          "Получить список самых популярных произведений."
      ],
      columns: [],
      books: [],
      modalVisible1: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisible4: false,
      modalVisible5: false,
    }
  },
  methods: {
    showModal() {
      // Запрос 7
      if (this.current_request === this.requests[0]) {
        this.modalVisible1 = true
        this.request_data = {
          "shelf": null,
          "name": null,
        }
      }
      // Запрос 11
      else if (this.current_request === this.requests[1]) {
        this.modalVisible2 = true
        this.request_data = {
          "start_date": null,
          "finish_date": null,
        }
      }
      // Запрос 14
      else if (this.current_request === this.requests[2]) {
        this.modalVisible3 = true
        this.request_data = {
          "book_name": null,
        }
      }
      // Запрос 15
      else if (this.current_request === this.requests[3]) {
        this.modalVisible4 = true
        this.request_data = {
          "author_name": null,
        }
      }
      // Запрос 16
      else if (this.current_request === this.requests[4]) {
        this.modalVisible5 = true
        this.request_data = {}
      }
    },
    handleSubmit() {
      // Запрос 7
      if (this.current_request === this.requests[0]) {
         let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_books_from_shelf?" + params,
            this.request_data
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible1 = false
          this.columns = [
            {field: "u_fio", header: "ФИО автора"},
            {field: "b_name", header: "Название книги"},
            {field: "name", header: "Библиотека"},
            {field: "number_hall", header: "Номер зала"},
          ]
          console.log(this.request_response)
        }
      }
      // Запрос 11
      else if (this.current_request === this.requests[1]) {
        for (let date in this.request_data) {
          this.request_data[date] = dateFormat(this.request_data[date], "dd-mm-yyyy")
        }
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_scrapped_books",
            this.request_data
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible2 = false
          this.columns = [
            {field: "b_name", header: "Название книги"},
          ]
        }
      }
      // Запрос 14
      else if (this.current_request === this.requests[2]) {
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_inventory_numbers_by_book?" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible3 = false
          this.columns = [
            {field: "b_name", header: "Название книги"},
            {field: "name", header: "Библиотека"},
            {field: "number_hall", header: "Номер зала"},
            {field: "sh_id", header: "Номер полки"},
          ]
        }
      }
      // Запрос 15
      else if (this.current_request === this.requests[3]) {
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_inventory_numbers_by_author?" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible4 = false
          this.columns = [
            {field: "authors_fio", header: "ФИО автора"},
            {field: "name", header: "Библиотека"},
            {field: "number_hall", header: "Номер зала"},
            {field: "sh_id", header: "Номер полки"},
          ]
        }
      }
      // Запрос 16
      else if (this.current_request === this.requests[4]) {
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_popular_books",
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible5 = false
          this.columns = [
            {field: "max", header: "Название издания"},
          ]
        }
      }
    }
  },
  created() {
    axios.post(JSON.parse(localStorage.getItem("server_url")) + "/api/get_books")
        .then(response => {
          this.books = response.data
        })
  }
}
</script>

<style scoped>
.dropdown {
  min-width: 85%;
}
</style>