<template>
  <ComponentLogin :api-host='apiHost'
            :redirect='redirect' />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { apiHost } from '@/utils/util'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const redirect = ref(route.query && route.query.redirect)
    return {
      redirect,
      apiHost,
    }
  },
})
</script>
