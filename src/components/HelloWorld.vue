<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
    <input type="text" placeholder="Rechercher...">
    <button type="submit">Go</button>
    </form>
      <button @click="login">Login</button>
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
      const SPOTIFY_CLIENT_ID = 'ba07904c005743fc9b90cb3e6784ea04';
      const SPOTIFY_REDIRECT_URI ='http://localhost:8080/callback';
      const searchParams = new URLSearchParams();

      searchParams.set('client_id', SPOTIFY_CLIENT_ID);
      searchParams.set('response_type', 'code');
      searchParams.set('redirect_uri', SPOTIFY_REDIRECT_URI);

      window.location.href = `https://accounts.spotify.com/authorize?${searchParams.toString()}`;
    },
    generateRandomString(length) {
      let randomString = Math.random().toString(36).slice(-length);
      return randomString;
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
