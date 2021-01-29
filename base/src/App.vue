<template>
  <div id="app">
        <router-link to="/app1">app1-home</router-link>
        <div><router-link to="/app1/about">app1-about</router-link></div>
    <router-view/>
  </div>
</template>

<script>
let id = 1
import { unloadApplication } from 'single-spa'
export default {
  methods: {
    set () {
      window.localStorage.setItem('token', id++)
      unloadApplication('app1')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
