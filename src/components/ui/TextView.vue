<template>
  <input
    v-bind="$attrs"
    @input="$emit('input', $event.target.value)"
    type="text"
    class="text-view"
  />
</template>

<script>
export default {
  name: "TextView"
};
</script>

<style lang="scss" scoped>
.text-view {
  width: 100%;
  outline: none;
  border: 1px solid #3c2c17;
  border-radius: 5px;
  font-size: 18px;
  padding: 10px;
  &::placeholder {
    color: #3c2c17;
  }
}
</style>
