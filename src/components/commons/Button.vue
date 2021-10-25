<template>
  <div class="button" :class="['btn', btnWhite ? 'btn-white' : '']">
    <span>{{ content }}</span>
  </div>
</template>

<script>
export default {
  /** #region props */
  props: ["content", "btnWhite"],
  // end region
  /**#region method */
  methods:{

  }
  // end region
};
</script>

<style lang="scss" scoped>
.btn {
  height: 36px;
  padding: 8px 20px;
  color: #fff;
  cursor: pointer;
  background: #2ca01c;
  border-radius: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #35bf22;
  }
  &:active {
    background: #01b075;
  }
  &.btn-white {
    background: #fff;
    border: 1px solid #8d9096;
    color: #111;
  }
  .btn-white span {
    font-weight: 600;
  }
  .btn-white:hover {
    background-color: #d2d3d6;
  }
}
.button:hover{
  background-color: #D2D3D6;
}
</style>
