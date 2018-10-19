<template>
  <div>
    <div class="heading-text">
      <span>Publicity API login</span>
    </div>
    <div class="container login">
      <div>
        <b-input-group size="lg">
          <b-form-input placeholder="Name" v-model="id"></b-form-input>
        </b-input-group>
        <b-input-group size="lg">
          <b-form-input placeholder="password" v-model="password" type="password" min-length="3" @keyup.enter.native="login"></b-form-input>
        </b-input-group>
      </div>
      <button class="btn mx-auto" @click="login">Login</button>
      <div v-if="errorMessage" class="heading">
        {{errorMessage}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        id: null,
        password: null,
        errorMessage: null
      }
    },
    methods: {
      login() {
        this.$http.post('https://fathomless-island-78033.herokuapp.com/users/login', {
          username: this.id,
          password: this.password
        }).then(function(response) {
          this.$store.commit('login', {
            name: this.id,
            number: this.password,
            authToken: response.body.token
          })
          this.$router.push('/search')
        }).catch(function(error) {
          this.errorMessage = error.body.message
        })
      }
    },
    mounted() {
      if(localStorage.user){
        this.$router.push('/search')
      }
    }
  }
</script>

<style scoped lang="sass">
@import "../sass/input"
@import '../sass/variables'

.login
  padding-top: 12%
  padding-bottom: 10%
  background: url("../assets/logo.png") no-repeat center
  background-size: contain

.heading
  font-size: 30px

.heading-text
  font-family: Neptune, sans-serif
  text-align: center
  font-size: 45px
  margin-top: 20px
  span
    @include textGrad
</style>