<template>
  <div class="baojia-container">
    <my-top></my-top>
    <router-view></router-view>
  </div>
</template>

<script>
import myTop from "@/components/header/top.vue";
export default {
  components: {
    myTop,
  },
};
</script>

<style lang="less" scoped>
.baojia-container {
  width: 100%;
  height: 100%;
}
</style>
