export default {
  data() {
    return {
      cart: this.$store.getters['catalog/cart'],
    }
  },
  methods: {
    productInCart(product) {
      // カートに入っている商品を一つずつ検査して、カートに入レたものがすでにあったらその番号を返す
      const cartItems = this.cart.items
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].product.key === product.key) {
          return i
        }
      }
      return null
    },
    addToCart(product, quantity) {
      const index = this.productInCart(product)
      // quantityが0もしくは1以下の場合、quantityの整数値を代入
      const productQuantity = !quantity || quantity < 1 ? 1 : parseInt(quantity)
      // 重複した商品がなかった場合はカートを更新
      // あったら更新しない
      if (index === null) {
        const item = {
          product,
          quantity: productQuantity,
        }
        this.$store.commit('catalog/updateCart', item)
      } else if (!quantity) {
        this.$store.commit('catalog/increaseQuantity', index)
      } else {
        this.$store.commit('catalog/updateQuantity', {
          index,
          productQuantity,
        })
      }

      this.$toast.show('Shopping cart updated', {
        theme: 'bubble',
        position: 'top-center',
        duration: 1500,
      })
    },
    increaseQuantity(i) {
      this.$store.commit('catalog/increaseQuantity', i)
    },
    decreaseQuantity(i) {
      this.$store.commit('catalog/decreaseQuantity', i)
    },
  },
  computed: {
    cartTotal() {
      let totalAmount = 0
      this.cart.items.forEach((item) => {
        totalAmount += item.quantity * parseFloat(item.product.price)
      })
      return totalAmount
    },
  },
}
