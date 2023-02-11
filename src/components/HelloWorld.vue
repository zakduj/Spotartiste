<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
    <input type="text" placeholder="Rechercher...">
    <button type="submit">Go</button>
    </form>
    <button style="position: absolute; top: 0; right: 0;">Login</button>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
