<template>
  <div class="greet">
    <div v-if="username"> 
      <h3>{{text}} {{username}} </h3>
    </div>
    <h3 v-else>You are not logged in</h3>
  </div>
</template>
<script>
export default {
  name: 'Greet',
  props: ["username", "text"],
};
</script>
<style scoped>
.greet {
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
  font-family: 'Courier New', Courier, monospace;
}
</style>