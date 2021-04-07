<template>
  <div class="container">
    <div class="list-group">
      <div class="list-group-item">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


<style scoped>
.flex {
	display: flex;
	align-items: flex-start 
}

</style>
