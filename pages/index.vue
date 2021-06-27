<template>
  <div>
    <section class="section">
      <div class="box">
        <nav class="level">
          <div class="level-left">
            <div class="field is-grouped is-grouped-multiline">
              <p class="control">
                <input
                  v-model="keyword"
                  class="input"
                  type="text"
                  placeholder="Keyword"
                />
              </p>
              <p class="control">
                <span class="select">
                  <select v-model="category">
                    <option value="">All</option>
                    <option
                      v-for="category in categories"
                      :key="category.key"
                      :value="category.key"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </span>
              </p>
              <p class="control">
                <a class="button is-warning" @click.prevent="search">
                  Search
                </a>
              </p>
              <p class="control"></p>
            </div>
          </div>

          <div class="level-right">
            <div class="field is-grouped is-grouped-multiline">
              <p class="control">
                <span class="select">
                  <select v-model="sort">
                    <option value="">Latest</option>
                    <option value="low">Price - Low to High</option>
                    <option value="high">Price - High to Low</option>
                  </select>
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>

      <div class="columns is-mobile is-multiline">
        <div
          v-for="product in products"
          :key="product.key"
          class="
            column
            is-full-mobile
            is-half-tablet
            is-half-desktop
            is-one-third-widescreen
            is-one-quarter-fullhd
          "
        >
          <ProductBox :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductBox from '@/components/ProductBox'
export default {
  components: {
    ProductBox,
  },
  data() {
    return {
      keyword: '',
      category: '',
      sort: '',
    }
  },
  computed: {
    products() {
      return this.$store.getters['catalog/products']
    },
    categories() {
      return this.$store.getters['catalog/categories']
    },
  },
  watch: {
    products(value) {
      if (value) {
        console.log('TEST', value)
      }
    },
  },
  created() {
    const loadedProducts = this.$store.getters['catalog/products']
    if (loadedProducts.length === 0) {
      this.$store.dispatch('catalog/getProducts')
      this.$store.dispatch('catalog/getCategories')
    }
  },
  methods: {
    search() {
      const searchData = {
        keyword: this.keyword,
        category: this.category,
        sort: this.sort,
      }
      this.$store.dispatch('catalog/productSearch', searchData)
    },
  },
}
</script>
