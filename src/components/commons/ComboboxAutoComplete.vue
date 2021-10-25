<template>
  <div class="dropdown autocomplete">
    <div class="dropdown-btn con-input combobox-style">
      <input
        type="text"
        class="input has-icon"
        :value="valueInput"
        @focus="showSuggestion"
        @blur="onBlur"
        @keydown.up.prevent="up"
        @keydown.down.prevent="down"
        @keydown.enter.prevent="enter"
        @input="onInput"
      />
      <div
        class="icon-input icon-dropdown-box"
        @mousedown.prevent="toggleSuggestion"
      >
        <div
          class="icon icon-arrow-dropdown"
          :class="{ rotateicon: statusClick }"
        ></div>
      </div>
    </div>
    <div class="dropdown-content" :class="{ hide: !isShow }">
      <div class="dropdown-item-empty" v-if="suggestionData.length == 0">
        Không có dữ liệu hiển thị
      </div>
      <div
        v-for="(suggestion, index) in suggestionData"
        :key="index"
        class="dropdown-item"
        :class="{ active: current == index }"
        @click.prevent="
          clickSuggestion(suggestion, index), getIndex(), getValue()
        "
      >
        {{ suggestion.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // #region props
  props: {
    /**
     * Danh sách suggestion của autocomplete.
     * Createdby: NGDuong (19/08/2021) 
     */
    suggestions: { // 
      type: Object,
      required: true,
    },

    /**
     * Giá trị khởi tạo cho input
     * Createdby: NGDuong (19/08/2021) 
     */
    value: {
      type: Number/String,
      default: null,
    },
  },
  // end region

  // #region data
  data: () => ({
    /**
     * Xác định trạng thái popup autocomplete
     * CreatedBy: NGDuong (19/08/2021)
     */
    isShow: false,

    /**
     * vị trí hiện tại
     * CreatedBy: NGDuong (19/08/2021)
     */
    current: 0,

    /**
     * Danh sách suggesstion của autocomplete có lọc
     * CreatedBy: NGDuong (19/08/2021)
     */
    suggestionData: [],

    /**
     * Giá trị của input
     * CreatedBy: NGDuong (20/07/2021)
     */
    valueInput: "",
    /**
     * bien xoay theo su kien click
     * CreatedBy: NGDuong (19/08/2021)
     */
    statusClick: false,
  }),
  // end region

  // #region Watch
  watch:{
    /**
     * cập nhật sự thay đổi của combobox
     * CreatedBy: NGDuong (19/08/2021)
     */
    valueInput: function (value) {
      if (value != "") {
        this.onInput(value);
      }
    },
  },
  // end region

  // #region methods
  methods: {
    /**
     * Đảo ngược trạng thái popup
     * CreatedBy: NGDuong (19/08/2021)
     */
    toggleSuggestion() {
      if (this.isShow) {
        this.isShow = false;
        this.$el.querySelector("input").blur();
      } else {
        this.showSuggestion();
      }
    },
    /**
     * Emit get data
     * CreatedBy: NGDuong (19/08/2021)
     */
    getData(){
      this.$emit("getDepartmentId", this.suggestionData[this.current].value);
    },
    /**
     * getIndex
     * CreatedBy: NGDuong (19/08/2021)
     */
    getIndex() {
      console.log("id=" + this.suggestionData[this.current].value);
    },
    /**
     * get Value
     * CreatedBy: NGDuong (19/08/2021)
     */
    getValue() {
      console.log("value=" + this.suggestionData[this.current].name);
    },
    /**
     * Hiển thị popup
     * CreatedBy: NGDuong (19/08/2021)
     */
    showSuggestion() {
      this.$el.querySelector("input").focus();
      this.isShow = true;
      this.statusClick = true;
    },
    /**
     * Nhấn enter
     * CreatedBy: NGDuong (19/08/2021)
     */
    enter() {
      this.valueInput = this.suggestionData[this.current].name;
      this.isShow = false;
      this.$el.querySelector("input").blur();
      this.statusClick = false;
    },

    /**
     * Nhấn up
     * CreatedBy: NGDuong (19/08/2021)
     */
    up() {
      if (this.current > 0) this.current--;
      this.valueInput = this.suggestionData[this.current].name;
    },

    /**
     * Nhấn down
     * CreatedBy: NGDuong (19/08/2021)
     */
    down() {
      if (this.current < this.suggestions.length - 1) this.current++;
      this.valueInput = this.suggestionData[this.current].name;
    },
    /**
     * Chọn một suggesstion
     * CreatedBy: NGDuong (19/08/2021)
     */
    clickSuggestion(suggestion, index) {
      this.current = index;
      this.isShow = false;
      this.valueInput = suggestion.name;
      this.statusClick = false;
    },

    /**
     * Blur input
     * CreatedBy: NGDuong (19/08/2021)
     */
    onBlur() {
      setTimeout(() => {
        this.isShow = false;
        this.statusClick = false;
        this.$emit("blur");
      }, 300);
    },

    /**
     * Nhập vào input
     * CreatedBy: NGDuong (19/08/2021)
     */
    onInput(e) {
      let val = e.target.value;
      this.valueInput = val;
      this.current = 0;
      if (this.suggestions) {
        this.suggestionData = this.suggestions.filter((s) =>
          s.name.toLowerCase().includes(val.toLowerCase())
        );
        this.isShow = true;
      }
    },
  },
  // end region

  // #region mounted
  mounted() {
    this.suggestionData = this.suggestions;
    let index = this.suggestionData.findIndex((s) => s.value == this.value);
    if (index >= 0) {
      this.current = index;
      this.valueInput = this.suggestionData[this.current].name;
    } else {
      this.current = 0;
      this.valueInput = "";
    }
  },
  // end region
};
</script>
<style lang="scss" scoped>
/** biến dùng chung */
$navbar-width: 178px;
$navbar-width-toggle: 52px;
$rotate-icon: 180deg;
$header-height: 48px;
$icon-size: 24px;
$color-white: #fff;
// mixins
@mixin flex-row {
  display: flex;
  flex-direction: row;
}
@mixin icon-default {
  background-image: url("../../assets/img/Sprites.64af8f61.svg");
  background-repeat: no-repeat;
  display: inline-block;
}
@mixin icon-bind($position, $size: $icon-size) {
  background-position: $position;
  height: $size;
  width: $size;
}
/** --------------------css---------------- */
.flex-row-align-center {
  @include flex-row();
  align-items: center;
}
// Icon
.icon {
  @include icon-default();
  &.icon-arrow-dropdown {
    @include icon-bind(-560px -359px, 16px);
  }
}
// input
.input {
  height: 32px;
  outline: none;
  border: 1px solid #ccc;
  padding-left: 12px;
  width: 100%;
  &::placeholder {
    font-style: italic;
  }
  &:focus {
    border-color: #2CA01C;
  }
  &:hover:not(:focus) {
    border-color: #888b8f;
  }
  &.has-icon {
    padding-right: 28px;
  }
  &.has-error {
    border-color: #f20 !important;
  }
}
.con-input {
  position: relative;
  .text-error {
    display: none;
  }
  &:hover .text-error {
    white-space: nowrap;
    display: inline-block;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #EBEDF0;
    color: $color-white;
    padding: 8px;
    z-index: 10;
  }
  .icon-input {
    position: absolute;
    right: 8px;
    top: 8px;
  }
}
.label-input {
  display: inline-block;
  margin-top: 8px;
  margin-bottom: 4px;
  font-weight: bold;
}
// dropdown
.dropdown {
  position: relative;
  .dropdown-content {
    min-width: 100%;
    position: absolute;
    background-color: $color-white;
    border: 1px solid #ccc;
    white-space: nowrap;
    z-index: 20;
    min-width: 100%☺;
    margin-top: 5px;
    margin-bottom: 5px;
    &.reserve {
      top: auto;
      bottom: 100%;
    }
    &.hide {
      display: none;
    }
    &.right {
      right: 0;
    }
    .dropdown-item-empty {
      background-color: #f7f7f7;
      color: #575757;
      height: 40px;
      line-height: 40px;
      padding-left: 12px;
      padding-right: 12px;
      text-align: center;
      border: 1px solid rgb(197, 197, 197);
    }
    .dropdown-item {
      height: 32px;
      line-height: 32px;
      padding-left: 12px;
      padding-right: 12px;
      cursor: pointer;
      &:hover:not(.active) {
        background-color: #EBEDF0;
        color: #4FAE43;
      }
    }
  }
}
// autocomplete
.autocomplete {
  .icon-dropdown-box {
    cursor: pointer;
    height: 30px;
    width: 30px;
    top: 1px;
    right: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #e9e9e9;
      border-left: none;
      border-top-right-radius: 4px;
      border-end-end-radius: 4px;
    }
  }
  .active {
    background-color: #2CA01C;
    color: $color-white;
  }
}
.rotateicon {
  transform: rotate(180deg);
}
</style>