<template>
  <div class="field-input-container">
    <label> {{ label }}<span v-if="required" class="required"> *</span></label>
    <div
      @mouseover="handleValidate"
      @mouseleave="handleLeave"
      class="input-field"
      :class="[searchField ? 'search-field' : '']"
    >
      <input
        ref="autoFocus"
        :type="type ? type : 'text'"
        :placeholder="placeholder"
        :value="value ? value : inputValue"
        @input="getValue"
        :class="[
          required && errorNotify.status ? 'errorInput' : '',
          type == 'date' && value
            ? 'active'
            : type == 'email'
            ? 'form-email'
            : null,
        ]"
        max="2021-08-25"
      />
      <div v-if="searchField" class="search-icon"></div>
      <div v-if="required && errorNotify.status" class="validateMessage">
        <p>{{ errorNotify.errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "placeholder",
    "searchField",
    "label",
    "type",
    "value",
    "required",
    "errorNotify",
  ],
  data() {
    return {
      inputValue: "", // giá trị ô input trả về dialog cha
      validate: false, // lỗi validate
      errorMessage: "", // thông điệp lỗi
      showMessage: false, // hiển thị ?
    };
  },

  methods: {
    /**
     * Truyền dữ liệu nhận được ra ngoài dialog
     * CreatedBy: PQHieu(18/06/2021)
     */
    getValue(e) {
      this.$emit("input", e.target.value);
    },

    /**
     * Hiển thị thông báo lỗi
     * CreatedBy : PQHieu(18/06/2021)
     */
    handleValidate() {
      if (this.required && this.validate) {
        this.showMessage = true;
      }
    },

    /**
     * đóng hiển thị thông báo lỗi
     * CreatedBy : PQHieu(18/06/2021)
     */
    handleLeave() {
      if (this.required && this.validate) {
        this.showMessage = false;
      }
    },
    /**
     * focus vào 1 element
     * CreatedBy : PQHieu(18/06/2021)
     */
    handleFocus() {
      this.$refs.autoFocus.focus();
    },
  },
};
</script>

<style scoped>
.field-input-container {
  height: 100%;
}

.input-field {
  position: relative;
  height: 100%;
  /* max-height: 32px; */
}
.input-field input {
  padding: 6px 11px;
  border-radius: 2px;
  border: 1px solid #babec5;
  outline: none;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid #949494;
  background: #FFF;
  /* max-height: 32px; */
}
.input-field input:focus {
  border-color: #babec5;
  border-bottom: 2px solid green;
}
::placeholder {
  font-style: italic;
}
.search-icon {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -992px -357px;
  cursor: pointer;
}

.validateMessage {
  position: absolute;
  background: #443e3e;
  left: 50%;
  top: 50%;
  width: 150px;
  color: #fff;
  transform: translateX(-50%);
  user-select: none;
  padding: 3px 3px;
  display: block;
}
.validateMessage p {
  font-size: 12px;
  margin-bottom: 0;
}
.input-field:hover .validateMessage {
  display: none;
}
.required {
  color: red;
}
.errorInput {
  border-color: red !important;
}
input[type="date"] {
  padding-right: 5px;
  font-style: italic;
  text-transform: uppercase;
  color: #babec5;
}

input[type="date"].active {
  color: #000;
  font-style: normal;
  border-bottom: 2px solid green;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  color: #babec5;
  opacity: 1;
  display: block;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -128px -310px;
  width: 14px;
  height: 16px;
  border-width: thin;
}

input[type="date"]:hover {
  cursor: pointer;
  border-bottom: 2px solid green;
}

/* input {
  box-shadow: 1px 1px 1px #e6dada;
} */

/* input:hover {
  border: 1px solid green;
} */
</style>
