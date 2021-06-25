import { firebaseApp } from '@/plugins/firebase'

export const state = () => ({
  products: [],
  categories: [],
  cart: {
    items: [],
  },
})

export const mutations = {
  loadProducts(state, payload) {
    state.products = payload
  },
  loadCategories(state, payload) {
    state.categories = payload
  },
  updateCart(state, payload) {
    state.cart.items.push(payload)
  },
  reloadCart(state, payload) {
    state.cart.items = payload.items
  },
  emptyCart(state) {
    state.cart.items = []
  },
  updateQuantity(state, payload) {
    state.cart.items[payload.index].quantity = payload.productQuantity
  },
  increaseQuantity(state, payload) {
    state.cart.items[payload].quantity++
  },
  decreaseQuantity(state, payload) {
    state.cart.items[payload].quantity--
    // マイナスを押していって、0になった場合カートのストアから指定した商品を削除
    if (state.cart.items[payload].quantity === 0) {
      state.cart.items.splice(payload, 1)
    }
  },
}

export const actions = {
  getProducts({ commit }) {
    firebaseApp
      .database()
      .ref('products')
      .limitToLast(50)
      .once('value')
      .then((snapShot) => {
        const products = []
        let item = {}
        snapShot.forEach((child) => {
          item = child.val()
          item.key = child.key
          products.push(item)
        })
        // 最新のに登録した商品が先頭に来るようにreverse()
        commit('loadProducts', products.reverse())
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getCategories({ commit }) {
    firebaseApp
      .database()
      .ref('categories')
      .once('value')
      .then((snapShot) => {
        const categories = []
        let item = {}
        snapShot.forEach((child) => {
          item = child.val()
          item.key = child.key
          categories.push(item)
        })
        // 最新のに登録した商品が先頭に来るようにreverse()
        commit('loadCategories', categories)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  productSearch({ commit }, payload) {
    let ref = 'products'
    // category検索がかかったら
    if (payload.category) {
      ref = `productCategories/${payload.category}`
    }
    firebaseApp
      .database()
      .ref(`${ref}`)
      .orderByChild('name')
      .limitToLast(50)
      .startAt(payload.keyword)
      .endAt(payload.keyword + '\uF8FF')
      .once('value')
      .then((snapShot) => {
        let products = []
        let item = {}
        snapShot.forEach((child) => {
          item = child.val()
          item.key = child.key
          products.push(item)
        })
        if (payload.sort) {
          if (payload.sort === 'low') {
            products.sort(function (a, b) {
              return a.price - b.price
            })
          } else {
            products.sort(function (a, b) {
              return b.price - a.price
            })
          }
        } else {
          products = products.reverse()
        }
        commit('loadProducts', products)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  postOrder({ commit }, payload) {
    // orders/orderKey/userKey/productKey/productDetail
    const orderKey = firebaseApp.database().ref('orders').push().key
    const items = payload.items
    const user = firebaseApp.auth().currentUser
    const orderItems = {}

    items.forEach((item) => {
      orderItems[`orders/${orderKey}/${user.uid}/${item.product.key}`] = {
        code: item.product.code,
        product: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
        createdAt: new Date().toISOString(),
      }
    })
    firebaseApp
      .database()
      .ref()
      .update(orderItems)
      .then(() => {
        commit('emptyCart')
        commit('setJobDone', true, { root: true })
      })
      .catch((error) => {
        commit('setError', error, { root: true })
      })
  },
}

export const getters = {
  products(state) {
    return state.products
  },
  categories(state) {
    return state.categories
  },
  cart(state) {
    return state.cart
  },
}
