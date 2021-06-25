<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">Checkout</h5>
      <hr />

      <h5 v-if="orderSuceess" class="title is-5">
        <span class="icon is-medium has-text-success">
          <i class="fa fa-check-square"></i>
        </span>
        We've received your orders. Thank you so much for shopping with us.
      </h5>
      <h5 v-else class="title is-5 has-text-info">Processing..</h5>
      <ErrorBar :error="error" />
    </section>
  </div>
</template>

<script>
import cartMixin from '@/mixins/cartMixin'
import ErrorBar from '@/components/ErrorBar'
import apiJobMixin from '@//mixins/apiJobMixin'
export default {
  components: { ErrorBar },
  mixins: [cartMixin, apiJobMixin],
  data() {
    return {
      orderSuceess: false,
    }
  },
  created() {
    if (this.cart.items.length === 0) {
      this.$router.replace('/')
    }
  },
  mounted() {
    this.$store.dispatch('catalog/postOrder', this.cart)
  },
  methods: {
    jobsDone() {
      this.$warehouse.remove('cart')
      this.orderSuceess = true
    },
  },
}
</script>
