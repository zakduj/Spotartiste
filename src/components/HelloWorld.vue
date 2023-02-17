<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form v-if="!loggedIn">
      <input type="text" placeholder="Rechercher...">
      <button type="submit" @click.prevent="searchArtists">Go</button>
      <button type="button" @click="getLogin">Login</button>
    </form>
    <button v-if="loggedIn" @click.prevent="logout">Logout</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      stateKey: 'Spotify_auth_state',
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      artist: null,
      code: null,
      state: null,
      loggedIn: false,
      SPOTIFY_CLIENT_ID : 'ba07904c005743fc9b90cb3e6784ea04',
      SPOTIFY_CLIENT_SECRET : 'c947b3eb664844898f92f74e733969f0',
      SPOTIFY_REDIRECT_URI : 'http://localhost:8080/callback'
    };
  },
  props: {
    msg: String
  },
  methods: {
    getLogin(){
      const state = this.generateRandomString(16);
      document.cookie = `${this.stateKey}=${state};max-age=3600`;
      const scope = 'user-read-private user-read-email';

      const searchParams = new URLSearchParams();
      searchParams.set('client_id', this.SPOTIFY_CLIENT_ID);
      searchParams.set('response_type', 'code');
      searchParams.set('redirect_uri', this.SPOTIFY_REDIRECT_URI);
      searchParams.set('state', state);
      searchParams.set('scope', scope);

      window.location.href = `https://accounts.spotify.com/authorize?${searchParams.toString()}`

      this.state = state;
      this.code = this.$route.query.code;

      this.getAccessToken()
      .then(response => {
        this.response = JSON.stringify(response.data, null, 2);
        this.loggedIn = true;
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    },
    generateRandomString(length) {
      let randomString = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      return randomString;
    },

    async getAccessToken() {
      const authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${this.SPOTIFY_CLIENT_ID}:${this.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: new URLSearchParams({
          code: this.code,
          redirect_uri: this.SPOTIFY_REDIRECT_URI,
          grant_type: 'authorization_code'
        })
      };
      try {
        const response = await axios(authOptions);
        if (response.status === 200) {
          return response;
        }
      } catch (error) {
        console.error(error);
      }
      return null;
    },
  }
};
</script>
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