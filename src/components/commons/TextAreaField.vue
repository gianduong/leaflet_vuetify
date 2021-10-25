<template>
  <div class="field-text-container">
    <label> {{ label }}<span v-if="required" class="required"> *</span></label>
    <div
      @mouseover="handleValidate"
      @mouseleave="handleLeave"
      class="text-field"
      :class="[searchField ? 'search-field' : '']"
    >
      <textarea
        ref="autoFocus"
        :placeholder="placeholder"
        :value="value ? value : textValue"
        @input="getValue"
        :class="[
          required && errorNotify.status ? 'errortext' : '',
          type == 'date' && value ? 'active' : null,
        ]"
        :rows="rows ? rows : '2'"
        :cols="cols ? cols : '50'"
      >
      </textarea>
      <div v-if="searchField" class="search-icon"></div>
      <div v-if="required && errorNotify.status" class="validateMessage">
        <p>{{ errorNotify.errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // #region props
  props: [
    "placeholder",
    "searchField",
    "label",
    "type",
    "value",
    "required",
    "errorNotify",
    "rows",
    "cols",
  ],
  // end region

  // #region data
  data() {
    return {
      textValue: "",
      validate: false,
      errorMessage: "",
      showMessage: false,
    };
  },
  // end region

  // #region methods
  methods: {
    /**
     * Truyền dữ liệu nhận được ra ngoài dialog
     * CreatedBy: NGDuong(19/08/2021)
     */
    getValue(e) {
      this.$emit("input", e.target.value);
    },

    /**
     * Hiển thị thông báo lỗi
     * CreatedBy: NGDuong(19/08/2021)
     */
    handleValidate() {
      if (this.required && this.validate) {
        this.showMessage = true;
      }
    },

    /**
     * đóng hiển thị thông báo lỗi
     * CreatedBy: NGDuong(19/08/2021)
     */
    handleLeave() {
      if (this.required && this.validate) {
        this.showMessage = false;
      }
    },
    /**
     * focus vào 1 element
     * CreatedBy: NGDuong(19/08/2021)
     */
    handleFocus() {
      this.$refs.autoFocus.focus();
    },
  },
  // end region
};
</script>

<style lang="scss" scoped>
.field-text-container {
  height: 100%;

  label {
    .required {
      color: red;
    }
  }

  .text-field {
    textarea {
      text-transform: none;
      padding: 6px 11px;
      border-radius: 2px;
      border: 1px solid #babec5;
      outline: none;
      width: 100%;
      height: 100%;
      /* max-height: 32px; */
      &:focus {
        border-bottom-color: #2ca01c;
      }
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
      display: none;
      p {
        font-size: 12px;
        margin-bottom: 0;
      }
    }
  }
  ::placeholder {
    font-style: italic;
  }

  .text-field:hover .validateMessage {
    display: block;
  }

  .errortext {
    border-color: red !important;
  }
  textarea {
    padding-right: 5px;
    font-style: italic;
    text-transform: uppercase;
    color: #000;
    resize: none;
  }
}
::placeholder{
  text-transform: none;
}
</style>
