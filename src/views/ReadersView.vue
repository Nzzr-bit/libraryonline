<template>
  <div class="dialogs">
    <Dialog id="modalRequest1" v-model:visible="modalVisible1" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 1</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <!--TODO: Поправить типы пользователей-->
                <Dropdown id="user_type" v-model="request_data.user_type" :options="user_types"
                          placeholder="Тип пользователя" autofocus/>
              </div>
              <div class="field">
                <div class="p-float-label">
                  <InputText id="firstname" v-model="request_data.firstname"/>
                  <label for="firstname">Имя</label>
                </div>
              </div>
              <div class="field">
                <div class="p-float-label">
                  <InputText id="middlename" v-model="request_data.middlename"/>
                  <label for="middlename">Отчество</label>
                </div>
              </div>
              <div class="field">
                <div class="p-float-label">
                  <InputText id="lastname" v-model="request_data.lastname"/>
                  <label for="lastname">Фамилия</label>
                </div>
              </div>
              <div class="field" v-if="request_data.user_type === 'Научный работник'">
                <div class="p-float-label">
                  <InputText id="organization" v-model="request_data.organization"/>
                  <label for="organization">Организация</label>
                </div>
              </div>
              <div class="field" v-if="request_data.user_type === 'Научный работник'">
                <div class="p-float-label">
                  <InputText id="theme" v-model="request_data.theme"/>
                  <label for="theme">Тема</label>
                </div>
              </div>
              <div class="field" v-if="request_data.user_type === 'Пенсионер'">
                <div class="p-float-label">
                  <InputText id="certificate" v-model="request_data.certificate"/>
                  <label for="certificate">Сертификат</label>
                </div>
              </div>
              <div class="field" v-if="request_data.user_type === 'Обычный житель'">
                <div class="p-float-label">
                  <InputText id="place" v-model="request_data.place"/>
                  <label for="place">Место</label>
                </div>
              </div>
              <div class="field"
                   v-if="request_data.user_type === 'Студент' || request_data.user_type === 'Преподаватель'">
                <div class="p-float-label">
                  <InputText id="university" v-model="request_data.university"/>
                  <label for="university">Университет</label>
                </div>
              </div>
              <div class="field">
                <div class="p-float-label"
                     v-if="request_data.user_type === 'Студент' || request_data.user_type === 'Преподаватель'">
                  <InputText id="faculty" v-model="request_data.faculty"/>
                  <label for="faculty">Факульет</label>
                </div>
              </div>
              <div class="field">
                <div class="p-float-label" v-if="request_data.user_type === 'Студент'">
                  <InputText id="course" v-model="request_data.course"/>
                  <label for="course">Курс</label>
                </div>
              </div>
              <div class="field" v-if="request_data.user_type === 'Преподаватель'">
                <div class="p-float-label">
                  <InputText id="rank" v-model="request_data.rank"/>
                  <label for="rank">Должность</label>
                </div>
              </div>
              <div class="field" v-if="request_data.user_type === 'Школьник'">
                <div class="p-float-label">
                  <InputText id="school" v-model="request_data.school"/>
                  <label for="school">Школа</label>
                </div>
              </div>
              <div class="field" v-if="request_data.user_type === 'Школьник'">
                <div class="p-float-label">
                  <InputText id="sc_class" v-model="request_data.clas"/>
                  <label for="sc_class">Класс</label>
                </div>
              </div>
              <div class="field" v-if="request_data.user_type === 'Пенсионер'">
                <div class="p-float-label">
                  <InputText id="certificate" v-model="request_data.certificate"/>
                  <label for="certificate">Класс</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible1 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest2" v-model:visible="modalVisible2" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 2</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="book_name" v-model="request_data.book_name"/>
                  <label for="book_name">Название книги</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible2 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest3" v-model:visible="modalVisible3" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 3</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="b_type" v-model="request_data.b_type"/>
                  <label for="b_type">Тип издания</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible3 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest4" v-model:visible="modalVisible4" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 4</h3>
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
              <Button @click="this.modalVisible4 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest5" v-model:visible="modalVisible5" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 5</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="u_fio" v-model="request_data.u_fio"/>
                  <label for="u_fio">ФИО</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible5 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest6" v-model:visible="modalVisible6" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 6</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="u_fio" v-model="request_data.u_fio"/>
                  <label for="u_fio">ФИО</label>
                </div>
              </div>
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible6 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest8" v-model:visible="modalVisible8" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 6</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <div class="field">
                <div class="p-float-label">
                  <InputText id="lw_fio" v-model="request_data.lw_fio"/>
                  <label for="lw_fio">ФИО</label>
                </div>
              </div>
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
              <Button @click="this.modalVisible8 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest10" v-model:visible="modalVisible10" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 10</h3>
            <form @submit.prevent="handleSubmit()" class="p-fluid">
              <Button type="submit" label="Отправить" class="mt-2"/>
              <Button @click="this.modalVisible10 = false" label="Назад" class="mt-2"></Button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog id="modalRequest13" v-model:visible="modalVisible13" style="max-width: 80%" :modal="true">
      <div class="form-demo">
        <div class="flex justify-content-center">
          <div class="card">
            <h3 class="text-center">Запрос 13</h3>
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
              <Button @click="this.modalVisible13 = false" label="Назад" class="mt-2"></Button>
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
  name: "ReadersView",
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
        "Получить список читателей с заданными характеристиками: студентов указанного учебного заведения, факультета, научных работников по определенной тематике и т.д.",
        "Получить перечень читателей, на руках у которых находится указанное произведение.",
        "Получить список читателей, на руках у которых находится указанное издание (книга, журнал и т.д).",
        "Получить перечень читателей, которые в течение указанного промежутка времени получали издание с некоторым произведением, и название этого издания.",
        "Получить список изданий, которые в течение некоторого времени получал указанный читатель из фонда библиотеки, где он зарегистрирован.",
        "Получить перечень изданий, которыми в течение некоторого времени пользовался указанный читатель из фонда библиотеки, где он не зарегистрирован.",
        "Выдать список читателей, которые в течение обозначенного периода были обслужены указанным библиотекарем.",
        "Получить список читателей с просроченным сроком литературы.",
        "Получить список читателей, не посещавших библиотеку в течение указанного времени."
      ],
      user_types: [
        'Пользователь',
        'Студент',
        'Научный работник',
        'Преподаватель',
        'Школьник',
        'Работник библиотеки',
        'Пенсионер'
      ],
      columns: [],
      modalVisible1: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisible4: false,
      modalVisible5: false,
      modalVisible6: false,
      modalVisible8: false,
      modalVisible10: false,
      modalVisible13: false,
    }
  },
  methods: {
    showModal() {
      // Запрос 1
      if (this.current_request === this.requests[0]) {
        this.modalVisible1 = true
        this.request_data = {
          "user_type": null,
          "firstname": null,
          "middlename": null,
          "lastname": null,
          "organization": null,
          "theme": null,
          "certificate": null,
          "place": null,
          "school": null,
          "university": null,
          "course": null,
          "faculty": null,
          "rank": null,
          "clas": null
        }
      }
      // Запрос 2
      else if (this.current_request === this.requests[1]) {
        this.modalVisible2 = true
        this.request_data = {
          "book_name": null
        }
      }
      // Запрос 3
      else if (this.current_request === this.requests[2]) {
        this.modalVisible3 = true
        this.request_data = {
          "b_type": null
        }
      }
      // Запрос 4
      else if (this.current_request === this.requests[3]) {
        this.modalVisible4 = true
        this.request_data = {
          "start_date": null,
          "finish_date": null
        }
      }
      // Запрос 5
      else if (this.current_request === this.requests[4]) {
        this.modalVisible5 = true
        this.request_data = {
          "u_fio": null,
        }
      }
      // Запрос 6
      else if (this.current_request === this.requests[5]) {
        this.modalVisible6 = true
        this.request_data = {
          "u_fio": null,
        }
      }
      // Запрос 8
      else if (this.current_request === this.requests[6]) {
        this.modalVisible8 = true
        this.request_data = {
          "lw_fio": null,
          "start_date": null,
          "finish_date": null
        }
      }
      // Запрос 10
      else if (this.current_request === this.requests[7]) {
        this.modalVisible10 = true
        this.request_data = {}
      }
      // Запрос 13
      else if (this.current_request === this.requests[8]) {
        this.modalVisible13 = true
        this.request_data = {
          "start_date": null,
          "finish_date": null
        }
      }
    },
    handleSubmit() {
      // Запрос 1
      if (this.current_request === this.requests[0]) {
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_users",
            this.request_data
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible1 = false
          if (this.request_data['user_type'].toLowerCase() === this.user_types[0].toLowerCase()) {
            this.columns = [
              {field: "u_fio", header: "ФИО"},
              {field: "u_type", header: "Тип пользователя"},
              {field: "p_place", header: "Место"}
            ]
          } else if (this.request_data['user_type'].toLowerCase() === this.user_types[1].toLowerCase()) {
            this.columns = [
              {field: "u_fio", header: "ФИО"},
              {field: "u_type", header: "Тип пользователя"},
              {field: "s_university", header: "Университет"},
              {field: "s_faculty", header: "Факультет"},
              {field: "s_course", header: "Курс"},
            ]
          } else if (this.request_data['user_type'].toLowerCase() === this.user_types[2].toLowerCase()) {
            this.columns = [
              {field: "u_fio", header: "ФИО"},
              {field: "u_type", header: "Тип пользователя"},
              {field: "organization", header: "Организация"},
              {field: "theme", header: "Тема"},
            ]
          } else if (this.request_data['user_type'].toLowerCase() === this.user_types[3].toLowerCase()) {
            this.columns = [
              {field: "u_fio", header: "ФИО"},
              {field: "u_type", header: "Тип пользователя"},
              {field: "t_university", header: "Университет"},
              {field: "t_faculty", header: "Факультет"},
              {field: "t_rank", header: "Должность"},
            ]
          } else if (this.request_data['user_type'].toLowerCase() === this.user_types[4].toLowerCase()) {
            this.columns = [
              {field: "u_fio", header: "ФИО"},
              {field: "u_type", header: "Тип пользователя"},
              {field: "school", header: "Школа"},
              {field: "sc_class", header: "Класс"},
            ]
          } else if (this.request_data['user_type'].toLowerCase() === this.user_types[5].toLowerCase()) {
            // TODO: Обсудить
            // this.columns = [
            //   {field: "u_fio", header: "ФИО"},
            //   {field: "u_type", header: "Тип пользователя"},
            //   {field: "school", header: "Школа"},
            //   {field: "sc_class", header: "Класс"},
            // ]
          } else if (this.request_data['user_type'].toLowerCase() === this.user_types[6].toLowerCase()) {
            this.columns = [
              {field: "u_fio", header: "ФИО"},
              {field: "u_type", header: "Тип пользователя"},
              {field: "pen_certificate_number", header: "Номер пенсионного удостоверения"},
            ]
          }
          console.log(this.request_response)
        }
      }
      // Запрос 2
      else if (this.current_request === this.requests[1]) {
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_users_with_book?" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible2 = false
          this.columns = [
            {field: "u_fio", header: "ФИО"},
            {field: "u_type", header: "Тип пользователя"},
          ]
        }
      }
      // Запрос 3
      else if (this.current_request === this.requests[2]) {
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_users_with_type_book?" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible3 = false
          this.columns = [
            {field: "u_fio", header: "ФИО"},
            {field: "u_type", header: "Тип пользователя"},
          ]
        }
      }
      // Запрос 4
      else if (this.current_request === this.requests[3]) {
        for (let date in this.request_data) {
          this.request_data[date] = dateFormat(this.request_data[date], "dd-mm-yyyy")
        }
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_books_date?" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible4 = false
          this.columns = [
            {field: "u_fio", header: "ФИО"},
            {field: "b_name", header: "Название книги"},
          ]
        }
      }
      // Запрос 5
      else if (this.current_request === this.requests[4]) {
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_user_info?" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible5 = false
          this.columns = [
            {field: "b_name", header: "Название книги"},
          ]
        }
      }
      // Запрос 6
      else if (this.current_request === this.requests[5]) {
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_user_info_library?" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible6 = false
          this.columns = [
            {field: "b_name", header: "Название книги"},
          ]
        }
      }
      // Запрос 8
      else if (this.current_request === this.requests[6]) {
        this.request_data['start_date'] = dateFormat(this.request_data['start_date'], "dd-mm-yyyy")
        this.request_data['finish_date'] = dateFormat(this.request_data['finish_date'], "dd-mm-yyyy")
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_serviced_users?" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible8 = false
          this.columns = [
            {field: "u_fio", header: "ФИО читателя"},
          ]
        }
      }
      // Запрос 10
      else if (this.current_request === this.requests[7]) {
        for (let date in this.request_data) {
          this.request_data[date] = dateFormat(this.request_data[date], "dd-mm-yyyy")
        }
        let params = new URLSearchParams(this.request_data)
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_users_with_deadline" + params,
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible10 = false
          this.columns = [
            {field: "u_fio", header: "ФИО"},
            {field: "u_type", header: "Тип пользователя"},
          ]
        }
      }
      // Запрос 13
      else if (this.current_request === this.requests[8]) {
        for (let date in this.request_data) {
          this.request_data[date] = dateFormat(this.request_data[date], "dd-mm-yyyy")
        }
        axios.post(
            JSON.parse(localStorage.getItem("server_url")) + "/api/get_overdue_users",
            this.request_data
        ).then(response => {
          this.request_response = response.data
        })
        if (this.request_response != null && this.request_response.length > 0) {
          this.modalVisible13 = false
          this.columns = [
            {field: "u_fio", header: "ФИО"},
            {field: "u_type", header: "Тип пользователя"},
          ]
        }
      }
    }
  },
  created() {
    axios.post(JSON.parse(localStorage.getItem("server_url")) + "/api/get_readers")
        .then(response => {
          this.request_response = response.data
          console.log(this.request_response)
        })
    this.columns = [
      {field: "u_fio", header: "ФИО"},
      {field: "u_type", header: "Тип пользователя"}
    ]
  }
}
</script>

<style scoped>
.dropdown {
  min-width: 85%;
}
</style>