<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
    <input type="text" placeholder="Rechercher...">
    <button type="submit">Go</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      stateKey: 'Spotify_auth_state'
    };
  },
  props: {
    msg: String
  },
  mounted() {
    if (window.location.search.includes('code=')) {
    // Extraire le code de l'URL de la requête
    const code = window.location.search.split('code=')[1].split('&')[0];

    // Vérifier l'état dans le cookie pour s'assurer que cela correspond à la requête d'autorisation
    const state = document.cookie.split(this.stateKey + '=')[1].split(';')[0];
    if (state === null || state !== this.state.state) {
      console.error('Le cookie d\'état ne correspond pas à la requête d\'autorisation');
      return;
    }

    // Éliminer l'état du cookie
    document.cookie = this.stateKey + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // Effectuer une requête pour échanger le code contre un jeton d'accès
    axios.post('/api/token', { code, state })
      .then(response => {
        const accessToken = response.data.access_token;

        // Stocker le jeton d'accès pour une utilisation ultérieure
        localStorage.setItem('access_token', accessToken);

        // Rediriger vers la page d'accueil
        this.$router.push('/');
      })
      .catch(error => {
        console.error(error);
      });
  }
},
  methods: {
    login() {
      const state = this.generateRandomString(16);
      document.cookie = `${this.stateKey}=${state};max-age=3600`;
      const scope = 'user-read-private user-read-email';

      const SPOTIFY_CLIENT_ID = 'ba07904c005743fc9b90cb3e6784ea04';
      const SPOTIFY_REDIRECT_URI ='http://localhost:8080/callback';
      
      const searchParams = new URLSearchParams();
      searchParams.set('client_id', SPOTIFY_CLIENT_ID);
      searchParams.set('response_type', 'code');
      searchParams.set('redirect_uri', SPOTIFY_REDIRECT_URI);
      searchParams.set('state', state);
      searchParams.set('scope', scope);

      window.location.href = `https://accounts.spotify.com/authorize?${searchParams.toString()}`;
    },
    generateRandomString(length) {
      let randomString = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      return randomString;
    }
  }
} 
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