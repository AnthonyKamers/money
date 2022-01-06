<template>
  <v-col :cols="cols">
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          :rules="rules"
          v-model="dateFormatted"
          :label="label"
          outlined
          @change="changeEvents()"
          @click:clear="clearEvents()"
          v-on="on"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" @input="menu1 = false"></v-date-picker>
    </v-menu>
  </v-col>
</template>

<script>
export default {
  name: "DataOutline",

  props: {
    cols: {
      required: false
    },
    label: {
      required: true
    },
    rules: {
      required: false
    },
    value: {
      required: false
    },
  },

  data() {
    return {
      date: "", // new Date().toISOString().substr(0, 10),
      dateFormatted: "", // this.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false
    };
  },

  created() {
    this.attributeValue();
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);

      // levar model para parent
      this.$emit("update", this.date);
    },

    value() {
      this.attributeValue();
    }
  },

  methods: {
    clearEvents() {
      this.dateFormatted = this.parseDate(this.dateFormatted);
      this.$emit("update", "");
    },

    changeEvents() {
      this.dateFormatted = this.parseDate(this.dateFormatted);
      this.$emit("update", this.dateFormatted);
    },

    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    attributeValue() {
      if (this.value !== undefined) {
        this.date = this.value;
      }
    },

    formatDate (date) {
        if (!date) return null;

        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    },
  }
};
</script>

<style scoped></style>