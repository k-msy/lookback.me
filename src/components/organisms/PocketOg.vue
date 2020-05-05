<template lang="pug">
.pocket
  p pocket-og
  p: button(v-on:click="auth") Pocket認証
  p: button(v-on:click="getLists") Pocketデータ取得
  ol
    li(v-for="entry in lists")
      a(:href="entry.resolved_url" target="_blank") {{entry.resolved_title}}
      span （{{entry.time_added}}）
</template>

<script>
import config from 'constants/config.js'
import axios from 'axios'
export default {
  data () {
    return {
      lists: []
    }
  },
  async mounted () {
    if(!localStorage.getItem('pocket_access_token')){
      if(localStorage.getItem('pocket_code')){
        const result = await axios.get(`${config.POCKET_SERVER_HOST}/auth/access_token?request_token=${localStorage.getItem('pocket_code')}`)
        localStorage.setItem('pocket_access_token', result.data.access_token)
      }
    }
  },
  methods: {
    async auth () {
      const result = await axios(`${config.POCKET_SERVER_HOST}/auth/request_token`)
      localStorage.setItem('pocket_code', result.data.request_token)
      this.redirect_auth(result)
    },
    redirect_auth (data) {
      location.href = `https://getpocket.com/auth/authorize?request_token=${data.data.request_token}&redirect_uri=${data.data.redirect_uri}`
    },
    async getLists () {
      const result = await axios.get(`${config.POCKET_SERVER_HOST}/retrieve?access_token=${localStorage.getItem('pocket_access_token')}`)
      this.lists = result.data
    }
  }
}
</script>


<style lang="sass" scoped>

</style>