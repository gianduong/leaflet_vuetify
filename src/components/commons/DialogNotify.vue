<template>
  <div class="modal-container">
    <div class="modal-content">
      <div
        class="logo-message"
        :class="[
          type == 'notify-success' ? 'logo-success' : null,
          type == 'confirm' ? 'logo-danger' : null,
          type == 'notify-error' ? 'logo-error' : null,
          type == 'notify-danger' ? 'logo-danger' : null,
          type == 'notify-note' ? 'logo-note' : null,
        ]"
      ></div>
      <div class="modal-message">
        <p v-if="type == 'confirm'">
          Bạn có thực sự muốn xóa Nhân viên &lt;<span>{{ employeeCode }}</span>&gt;
          không?
        </p>
        <p v-if="type == 'notify-danger'">
          {{ notifyMessage }}
        </p>
        <p v-if="type == 'notify-success'">
          {{ notifyMessage }}
        </p>
        <p v-if="type == 'notify-error'">
          {{ notifyMessage }}
        </p>
        <p v-if="type == 'notify-note'">
          Dữ liệu đã bị thay đổi. Bạn có muốn cất không?
        </p>
      </div>
    </div>
    <div class="line"></div>
    <div
      class="modal-bottom"
      :class="[
        type == 'confirm' ? 'notify-space' : null,
        type == 'notify-success' ? 'notify-center' : null,
        type == 'notify-error' ? 'notify-center' : null,
        type == 'notify-danger' ? 'notify-end' : null,
        type == 'notify-note' ? 'notify-space' : null,
      ]"
    >
      <div v-if="type == 'confirm'" @click="$emit('closeDialog')">
        <Button :content="'Không'" :btnWhite="true" />
      </div>
      <div v-if="type === 'confirm'" @click="$emit('onDelete')">
        <Button :content="'Có'" />
      </div>
      <div
        class="notify-btn"
        v-if="type != 'confirm' && type != 'notify-note'"
        @click="$emit('closeDialog')"
      >
        <Button
          :content="
            type == 'notify-error' || type == 'notify-success'
              ? 'Đóng'
              : 'Đồng ý'
          "
        />
      </div>
      <!-- notify note -->
      <div v-if="type == 'notify-note'" @click="$emit('closeDialog')">
        <Button :content="'Hủy'" :btnWhite="true" />
      </div>
      <div v-if="type == 'notify-note'" class="group-btn">
        <div @click="$emit('closeAllDialog')" class="btn-r-10">
          <Button :content="'Không'" :btnWhite="true" />
        </div>
        <div @click="onAdd">
          <Button :content="'Có'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  //#region Component
  components: { Button },
  //#endregion

  //#region Props
  props: ["employeeCode", "type", "notifyMessage"],
  //#endregion
  //#region Data
  data() {
    return {
      confirmEmployeeCode: "111",
      employeeCodeNotify: "111",
    };
  },
  //#endregion

  methods: {
    /**
     * Thực thiện gọi hàm thêm nhân viên của component cha và đóng dialog
     * CreatedBy : PQHieu(14/06/2021)
     */
    onAdd() {
      this.$emit("onAddOrUpdate");
      this.$emit("closeDialog");
    },
  },
};
</script>

<style scoped>
.modal-container {
  background-color: #fff;
  padding: 32px;
}
.modal-content {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.logo-message {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat;
}
.logo-danger {
  background-position: -592px -456px;
}
.logo-success {
  background-position: -981px -456px;
}
.logo-error {
  background-position: -24px -954px;
}
.logo-danger {
  background-position: -592px -456px;
}
.logo-note {
  background-position: -826px -456px;
}
.modal-message {
  overflow: auto;
  max-height: 400px;
  padding-left: 16px;
  position: relative;
  top: 10px;
}
.line {
  height: 1px;
  background: #b8bcc3;
  margin-bottom: 20px;
}
.modal-bottom {
  display: flex;
  justify-content: space-between;
}
.modal-bottom.notify-end {
  justify-content: flex-end;
}
.modal-bottom.notify-center {
  justify-content: center;
}
.modal-bottom.notify-space {
  justify-content: space-between;
}
.group-btn {
  display: flex;
}
.btn-r-10 {
  margin-right: 10px;
}
</style>
