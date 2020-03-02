<template>
  <div>
    {{date}}
  <el-date-picker
    v-model="date"
    type="datetime"
    placeholder="选择日期时间">
  </el-date-picker>
    <el-button @click="test()">test</el-button>
    <el-rate
      v-model="value"
      :colors="colors" @change="changeStar()">
    </el-rate>
    {{value}}
  </div>
</template>

<script>
import TestApi from '@/api/TestApi'
export default {
  name: 'test',
  data () {
    return {
      date: '',
      value: 3.5,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  methods: {
    changeStar () {
    },
    test () {
      TestApi.test(this.date)
    }
  }
}
</script>

<style scoped>

</style>
