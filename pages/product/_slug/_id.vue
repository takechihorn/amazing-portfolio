<template>
  <div>
    <section class="section left-right-pad">
      <div class="columns">
        <div class="column is-6">
          <div class="image is-4by3">
            <img :src="product.imageUrl" />
          </div>
        </div>
        <div class="column is-5 is-offset-1">
          <div class="title is-2">{{ product.name }}</div>
          <p class="title is-3 has-text-muted">
            {{ product.price | currency }}
          </p>
          <hr />
          <table class="table">
            <tbody>
              <tr>
                <td class="">
                  <strong>Product Code:</strong>
                </td>
                <td>{{ product.code }}</td>
              </tr>
              <tr>
                <td class="">
                  <strong>Brand:</strong>
                </td>
                <td>{{ product.brand }}</td>
              </tr>
              <tr>
                <td class="">
                  <strong>Availability:</strong>
                </td>
                <td :class="{ 'has-text-danger': product.stock === 0 }">
                  {{
                    product.stock > 0
                      ? `${product.stock} In Stock`
                      : 'Out of Stock'
                  }}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="field is-grouped is-grouped-multiline">
            <p class="control">
              <input
                class="input has-text-centered"
                style="width: 50px"
                type="text"
                name=""
                value="1"
              />
            </p>
            <p class="control">
              <a class="button is-primary">Add to cart</a>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section v-if="product.description" class="section">
      <h6 class="title is-6">Details</h6>
      <hr size="1" />
      <div class="content">
        <p :inner-html.prop="product.description | nl2br"></p>
      </div>
    </section>
  </div>
</template>

<script>
import { firebaseApp } from '@/plugins/firebase'
export default {
  // search engine friendly
  asyncData({ params }) {
    return firebaseApp
      .database()
      .ref(`products/${params.id}`)
      .once('value')
      .then((snapShot) => {
        const product = snapShot.val()
        product.key = params.id
        return { product }
      })
  },
  head() {
    return {
      title: this.product.name,
      meta: [
        { hid: 'description', name: 'description', content: this.product.name },
      ],
    }
  },
}
</script>
