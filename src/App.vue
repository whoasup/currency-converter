<template>
  <v-app>
    <v-main>
      <v-form @submit.prevent="submitHandler" v-model="valid" ref="form">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Сумма"
                prefix="₽"
                :rules="[rules.number, rules.required]"
                v-model="roubles"
                clearable
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                :items="currenciesList"
                label="Валюта"
                :rules="[rules.required]"
                v-model="selectedCurrency"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="total"
                label="Итого"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="email"
                type="email"
                :rules="[rules.email, rules.required]"
                label="E-mail"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="primary" elevation="4" type="submit">
                Записаться на обмен валюты
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-main>
  </v-app>
</template>

<script>
// Подключаем функцию для запроса в цб
import { loadCurrencies } from "./api";

export default {
  name: "App",

  components: {},

  data: () => ({
    roubles: "",

    email: "",

    currencies: "",

    selectedCurrency: "",

    valid: false,

    // Валидация полей формы
    rules: {
      number: (value) => {
        const regex = /^-?\d*\.?\d*$/;
        return regex.test(value) || "Введите число";
      },
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Введите e-mail";
      },
      required: (value) => !!value || "Обязательное поле",
    },
  }),

  created() {
    // Запрашиваем список валют при создании приложения
    this.getCurrenciesData();
  },

  computed: {
    currenciesList() {
      return Object.keys(this.currencies);
    },
    selected() {
      return this.currencies[this.selectedCurrency] || 0;
    },
    multiplier() {
      return this.selected.Value || 1;
    },
    total() {
      if (this.selectedCurrency) {
        return (this.roubles / this.multiplier).toFixed(2) || 0;
      }
      return "";
    },
    list() {
      return Object.entries(this.currencies);
    },
  },

  methods: {
    async getCurrenciesData() {
      try {
        const response = await loadCurrencies();
        const currenciesData = response.Valute;
        this.currencies = currenciesData;
      } catch (err) {
        console.log(err);
      }
    },

    validate() {
      // Используем встроенную валидацию vuetify
      this.$refs.form.validate();
    },

    submitHandler() {
      this.validate();

      if (this.valid) {
        // Тут должна находиться логика отправки данных формы на почту
        console.log("Отправка данных формы");
      }
    },
  },
};
</script>
