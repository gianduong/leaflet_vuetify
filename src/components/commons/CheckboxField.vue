<template>
  <div class="checkbox-container">
    <div class="checkbox-field">
      <div v-if="isCheck" class="check-icon"></div>
    </div>
    <div v-if="content" class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  // #region props
  props: {
    content: {
      type: String,
      default: "",
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
  // end region

  // #region methods
  methods: {
    // handleCheck() {
    //   this.isCheck = !this.isCheck;
    // },
  },
  // end region
};
</script>

<style lang="scss" scoped>
@mixin widthheight($w, $h) {
  width: $w;
  height: $h;
}

.checkbox-container {
  display: flex;
  cursor: pointer;

  .checkbox-field {
    @include widthheight(18px, 18px);
    border-radius: 2px;
    border: 1px solid #afafaf;
    background: #fff;
    
    .check-icon {
      @include widthheight(24px, 24px);
      background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -1224px -360px;
    }
  }
}

.content {
  margin-left: 10px;
}

</style>
