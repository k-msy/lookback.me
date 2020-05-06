<template lang="pug">
.qiita
  p qiita-og
  p: button(v-on:click="getLists") ストック記事データ取得
  ol
    li(v-for="entry in lists")
      a(:href="entry.url" target="_blank") {{entry.title}}
      span （{{entry.date}}）
</template>

<script>
import config from 'constants/config.js'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
export default {
  data () {
    return {
      lists: []
    }
  },
  methods: {
    async getLists () {
      const fetched = await axios.get(`${config.QIITA_REQUEST_DOMAIN}users/${config.QIITA_USER_ID}/stocks`)
      this.lists = _.map(fetched.data, datum => {
        return {
          title: datum.title,
          date: moment(datum.created_at).format('YYYY/MM/DD HH:mm:ss'),
          url: datum.url,
          likes_count: datum.likes_count
        }
      })
    }
  }
}
</script>


<style lang="sass" scoped>

</style>