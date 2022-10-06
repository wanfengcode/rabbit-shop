<template>
    <div>
        {{$store.state.user.userMessage.account}}
        <button @click=" $store.commit('user/setUser',{account:'jack'}) ">click</button>
    </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  setup () {

  }
}
</script>

<style>

</style>
