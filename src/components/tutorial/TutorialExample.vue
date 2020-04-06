<template>
  <div class="tutorial-example">
    <div class="tutorial-example__text">
      <slot name="text" />
    </div>
    <div class="tutorial-example__example">
      <slot name="example" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TutorialExample"
};
</script>

<style lang="scss" scoped></style>
