<template>
  <button v-bind="$attrs" v-on="$listeners" class="btn">
    <slot />
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.btn {
  background-color: #3c2c17;
  color: #fff;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  outline: none;
  cursor: pointer;
  padding: 10px;
}
</style>
