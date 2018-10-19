<template>
  <div>
    <div class="container">
      <div class="heading">Search Token</div>
      <b-input-group size="lg">
        <b-form-select v-model="yearSelected" :options="yearOptions"></b-form-select>
        <b-form-select v-model="branchSelected" :options="branchOptions"></b-form-select>
        <b-form-input v-model="id" placeholder="038"></b-form-input>
      </b-input-group>
      <b-input-group size="lg">
        <b-form-input v-model="tokenPrefix" :disabled=true></b-form-input>
        <b-form-input placeholder="Token Number" v-model="token"></b-form-input>
      </b-input-group>
      <button class="btn mx-auto" @click="search">Search</button>
      <b-card title="Order" v-if="order.sum > 0">
        <div v-for="(event, index) in order.events" class="row mx-auto">
          <div class="event-name">
            {{index+1}}. {{event.eventName}}
          </div>
          <div class="ml-auto">{{event.entryFee}}</div>
        </div>
        <div class="total">
          <div class="row">
            <div class="ml-auto">Total</div>
            <div class="mx-auto">{{order.sum}}</div>
          </div>
          <div class="row" v-if="!order.paid">
            <button class="btn ml-auto" @click="confirm">Confirm Order</button>
          </div>
          <div class="row" v-if="order.paid">
            <span class="ml-auto paid">Already Paid</span>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      token: null,
      tokenPrefix: 'O-',
      yearSelected: null,
      branchSelected: null,
      yearOptions: [
        {
          value: null, text: 'Year'
        },
        {
          value: "18", text: '18'
        },
        {
          value: "17", text: '17'
        },
        {
          value: "16", text: '16'
        },
        {
          value: "15", text: '15'
        }
      ],
      branchOptions: [
        {
          value: null, text: 'Branch'
        },
        {
          value: 'ce', text: 'CE'
        },
        {
          value: 'el', text: 'EL'
        },
        {
          value: 'ee', text: 'EE'
        },
        {
          value: 'it', text: 'IT'
        },
        {
          value: 'cp', text: 'CP'
        },
        {
          value: 'ec', text: 'EC'
        },
        {
          value: 'me', text: 'ME'
        },
        {
          value: 'pe', text: 'PE'
        }
      ],
      id: '',
      order: {
        events: [],
        sum: 0,
        paid: false
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      events: state => state.events
    })
  },
  methods: {
    search() {
      let username = this.yearSelected + this.branchSelected + this.id
      let token = this.tokenPrefix + this.token

      this.$http.post("https://fathomless-island-78033.herokuapp.com/publicity/find", {
        username,
        token
      }, {
        headers: {
          Authorization: this.user.authToken
        }
      }).then(function (response) {
        let eventsIds = response.body.events
        let sum = response.body.sum
        let finalEvents = []
        eventsIds.map( (id) => {
          this.events.forEach((event) => {
            if(event._id === id)
              finalEvents.push(event)
          })
        })
        this.order.events = finalEvents
        this.order.sum = sum
        this.order.paid = response.body.paid
      }).catch(function (error) {
        console.log(error)
      })
    },
    confirm() {
      let username = this.yearSelected + this.branchSelected + this.id
      let token = this.tokenPrefix + this.token
      let publicityId = this.user.name

      this.$http.post("https://fathomless-island-78033.herokuapp.com/publicity/paid", {
        username, token, publicityId
      }, {
        headers: {
          Authorization: this.user.authToken
        }
      }).then(function (response) {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../sass/variables'
@import '../sass/input'

.container
  margin-top: 20px

.form-control
  margin-right: 10px
  max-width: 300px

.card
  margin-top: 20px
  box-shadow: 5px 5px 5px #333333

.order
  font-size: 20px
  max-width: 800px
  @media screen and (min-width: 320px) and (max-width: 520px)
    .event-name
      max-width: 250px

.total
  margin-top: 10px

.paid
  background: #37bc29
  border-radius: 5px
  color: white
  padding: 10px
  margin-top: 15px
  font-size: 20px
</style>