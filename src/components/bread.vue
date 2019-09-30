<template>
    <nav>
      <router-link to="/">home /</router-link>
      <slot name="bread"></slot>
    </nav>
</template>

<script>
  export default {
    name: 'bread'
  }
</script>

<style scoped>
nav{
  margin: 20px 0;
  padding: 0 220px;
}
</style>
