<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" placeholder="Rechercher..." v-model="searchTerm">
      <button type="submit" @click="searchArtists">Go</button>
    </form>
    <div v-if="artists.length">
      <h2>Results:</h2>
      <ul>
        <li v-for="artist in artists" :key="artist.id">{{ artist.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      searchTerm: '',
      artists: [],
      accessToken: ''
    }
  },
  methods: {
    async searchArtists() {
      try {
        if (!this.accessToken) {
          await this.getAccessToken();
        }
        const res = await axios.get(`https://api.spotify.com/v1/search?q=${this.searchTerm}&type=artist`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        });
        this.artists = res.data.artists.items;
      } catch (err) {
        console.error(err);
      }
    },
    async getAccessToken() {
      const SPOTIFY_CLIENT_ID = 'ba07904c005743fc9b90cb3e6784ea04';
      const SPOTIFY_REDIRECT_URI = 'http://localhost:8080/callback';
      const res = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'client_credentials',
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET
      });
      this.accessToken = res.data.access_token;
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
