<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">Login</h5>
      <hr />

      <div class="columns is-centered is-mobile">
        <div class="column is-half-desktop is-full-mobile is-full-tablet">
          <form @submit.prevent="onLogin">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  v-validate="'required|email'"
                  name="email"
                  :class="{ 'is-danger': errors.has('email') }"
                  class="input"
                  type="text"
                />
                <p v-show="errors.has('email')" class="help is-danger">
                  {{ errors.first('email') }}
                </p>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  v-validate="'required|min:6'"
                  name="password"
                  :class="{ 'is-danger': errors.has('password') }"
                  class="input"
                  type="password"
                />
                <p v-show="errors.has('password')" class="help is-danger">
                  {{ errors.first('password') }}
                </p>
              </div>
            </div>

            <error-bar :error="error"></error-bar>

            <div class="field">
              <div class="control">
                <button
                  class="button is-primary"
                  :class="{ 'is-loading': busy }"
                  :disabled="busy"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ErrorBar from '@/components/ErrorBar'
import apiJobMixin from '@/mixins/apiJobMixin'
export default {
  components: {
    ErrorBar,
  },
  mixins: [apiJobMixin],
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
    }
  },
  beforeCreate() {
    const loggedIn = this.$store.getters.loginStatus
    if (loggedIn) {
      this.$router.replace('/')
    }
  },
  methods: {
    onLogin() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const loginData = {
            email: this.email,
            password: this.password,
          }
          this.$store.dispatch('loginUser', loginData)
        }
      })
    },
    jobsDone() {
      this.removeErrors()
      this.$router.replace('/')
    },
  },
}
</script>
