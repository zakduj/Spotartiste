<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
    <input type="text" placeholder="Rechercher...">
    <button type="submit">Go</button>
    </form>
    <button @click="login" >Login</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    login() {
      const SPOTIFY_CLIENT_ID = "your_client_id";
      const SPOTIFY_REDIRECT_URI = "your_redirect_uri";
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URI}`;
    }
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
