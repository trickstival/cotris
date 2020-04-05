<template>
  <input v-bind="$attrs" v-on="$listeners" type="text" class="text-view" />
</template>

<script>
export default {
  name: "TextView"
};
</script>

<style lnag="scss" scoped>
.text-view {
  width: 100%;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;
  padding: 10px;
}
</style>
