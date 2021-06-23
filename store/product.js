import { firebaseApp } from '@/plugins/firebase'

export const state = () => ({
  categories: [],
  products: [],
  product: null,
  productCategories: [],
})

export const mutations = {
  loadCategories(state, payload) {
    state.categories.push(payload)
  },
  updateCategory(state, payload) {
    const i = state.categories.indexOf(payload.category)
    state.categories[i].name = payload.name
  },
  removeCategory(state, payload) {
    const i = state.categories.indexOf(payload.category)
    state.categories.splice(i, 1)
  },
  loadProducts(state, payload) {
    state.products = payload
  },
  loadProduct(state, payload) {
    state.product = payload
  },
  removeProduct(state, payload) {
    const i = state.products.indexOf(payload)
    state.products.splice(i, 1)
  },
  loadProductCategories(state, payload) {
    state.productCategories.push(payload)
  },
  clearProductCategories(state) {
    state.productCategories = []
  },
}

export const actions = {
  createCategory({ commit }, payload) {
    commit('setBusy', true, { root: true })
    commit('clearError', null, { root: true })
    firebaseApp
      .database()
      .ref('categories')
      .push(payload)
      .then(() => {
        commit('setBusy', false, { root: true })
        commit('setJobDone', true, { root: true })
      })
      .catch((error) => {
        commit('setBusy', false, { root: true })
        commit('setError', error, { root: true })
      })
  },
  getCategories({ commit }) {
    firebaseApp
      .database()
      .ref('categories')
      .on('child_added', (snapShot) => {
        const item = snapShot.val()
        item.key = snapShot.key
        commit('loadCategories', item)
      })
  },
  updateCategory({ commit }, payload) {
    commit('setBusy', true, { root: true })
    commit('clearError', null, { root: true })
    firebaseApp
      .database()
      .ref(`categories/${payload.category.key}`)
      .update({ name: payload.name })
      .then(() => {
        commit('setBusy', false, { root: true })
        commit('setJobDone', true, { root: true })
        const categoryData = {
          category: payload.category,
          name: payload.name,
        }
        commit('updateCategory', categoryData)
      })
      .catch((error) => {
        commit('setBusy', false, { root: true })
        commit('setError', error, { root: true })
      })
  },
  removeCategory({ commit }, payload) {
    firebaseApp
      .database()
      .ref(`categories/${payload.category.key}`)
      .remove()
      .then(() => {
        commit('removeCategory', payload)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  addProduct({ dispatch, commit }, payload) {
    const productData = payload
    const categories = payload.belongs
    const image = payload.image
    let imageUrl = ''
    let productKey = ''
    delete productData.belongs
    delete productData.image
    commit('setBusy', true, { root: true })
    commit('clearError', null, { root: true })
    firebaseApp
      .database()
      .ref('products')
      .push(productData)
      .then((result) => {
        productKey = result.key
        return firebaseApp.storage().ref(`products/${image.name}`).put(image)
      })
      .then((fileData) => {
        imageUrl = fileData.metadata.downloadURLs[0]
        return firebaseApp.database().ref('products').child(productKey).update({
          imageUrl,
        })
      })
      .then(() => {
        const productSnippet = {
          name: productData.name,
          price: productData.price,
          status: productData.status,
          // eslint-disable-next-line object-shorthand
          imageUrl: imageUrl,
        }
        const catUpdates = {}
        categories.forEach((catKey) => {
          catUpdates[`productCategories/${catKey}/${productKey}`] =
            productSnippet
        })
        return firebaseApp.database().ref().update(catUpdates)
      })
      .then(() => {
        dispatch('getProducts')
        // Dispatch getProducts to refresh the products list
        commit('setBusy', false, { root: true })
        commit('setJobDone', true, { root: true })
      })
      .catch((error) => {
        commit('setBusy', false, { root: true })
        commit('setError', error, { root: true })
      })
  },
  getProducts({ commit }) {
    firebaseApp
      .database()
      .ref('products')
      .once('value')
      .then((snapShot) => {
        const products = []
        let item = {}
        snapShot.forEach((child) => {
          item = child.val()
          item.key = child.key
          products.push(item)
        })
        commit('loadProducts', products.reverse())
      })
  },
  removeProduct({ commit }, payload) {
    console.log('TEST', payload.imageUrl)
    // 1.Remove from storage
    // 2. Remove from products
    // 3. Remove from productCategories
    const imageUrl = payload.imageUrl
    const refUrl = imageUrl.split('?')[0]
    const httpsRef = firebaseApp.storage().refFromURL(refUrl)
    httpsRef
      .delete()
      .then(() => {
        return firebaseApp
          .database()
          .ref(`products/${payload.key}`)
          .remove()
          .then(() => {
            return firebaseApp
              .database()
              .ref('categories')
              .once('value')
              .then((snapShot) => {
                const catKeys = Object.keys(snapShot.val())
                const updates = {}
                catKeys.forEach((key) => {
                  updates[`productCategories/${key}/${payload.key}`] = null
                })
                return firebaseApp.database().ref().update(updates)
              })
          })
      })
      .then(() => {
        commit('removeProduct', payload)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  updateProduct({ dispatch, commit }, payload) {
    const productData = payload
    const categories = productData.belongs
    const image = payload.image
    const productKey = payload.key
    let oldImageUrl = null
    const oldCatsRemoval = {}
    delete productData.belongs // Goes to productCategories
    delete productData.image // Goes to storage

    commit('setBusy', true, { root: true })
    commit('clearError', null, { root: true })
    firebaseApp
      .database()
      .ref(`products/${productKey}`)
      .update(productData) // Update products data with update
      // Upload image if new image provided
      .then(() => {
        if (image) {
          return firebaseApp.storage().ref(`products/${image.name}`).put(image)
        } else {
          return false
        }
      })
      .then((fileData) => {
        if (fileData) {
          oldImageUrl = productData.oldImageUrl
          productData.imageUrl = fileData.metadata.downloadURLs[0]
          return firebaseApp
            .database()
            .ref('products')
            .child(productKey)
            .update({ imageUrl: productData.imageUrl })
          // 新しいURLに変更している
        }
      })
      .then(() => {
        // Remove old image if new image uploaded and old image exists
        if (oldImageUrl) {
          const refUrl = oldImageUrl.split('?')[0]
          const httpsRef = firebaseApp.storage().refFromURL(refUrl)
          return httpsRef.delete()
        }
      })
      .then(() => {
        // Prepare batch removal of product-categories attachments
        return firebaseApp
          .database()
          .ref('productCategories')
          .on('child_added', (snapShot) => {
            oldCatsRemoval[`productCategories/${snapShot.key}/${productKey}`] =
              null
          })
      })
      .then(() => {
        // Execute removal of product-categories attachments
        return firebaseApp.database().ref().update(oldCatsRemoval)
      })
      .then(() => {
        // Add new product-categories attachments
        const productSnippet = {
          name: productData.name,
          imageUrl: productData.imageUrl,
          price: productData.price,
          status: productData.status,
        }
        const catUpdates = {}
        categories.forEach((catKey) => {
          catUpdates[`productCategories/${catKey}/${productKey}`] =
            productSnippet
        })
        return firebaseApp.database().ref().update(catUpdates)
      })
      .then(() => {
        // Dispatch getProducts to refresh the products list
        dispatch('getProducts')
        commit('setBusy', false, { root: true })
        commit('setJobDone', true, { root: true })
      })
      .catch((error) => {
        commit('setBusy', false, { root: true })
        commit('setError', error, { root: true })
      })
  },
  productCategories({ commit }, payload) {
    commit('clearProductCategories')
    firebaseApp
      .database()
      .ref('productCategories')
      .on('child_added', (snapShot) => {
        const item = snapShot.val()
        item.key = snapShot.key
        if (item[payload] !== undefined) {
          commit('loadProductCategories', item.key)
        }
      })
  },
}

export const getters = {
  categories(state) {
    return state.categories
  },
  products(state) {
    return state.products
  },
  product(state) {
    return state.product
  },
  productCategories(state) {
    return state.productCategories
  },
}
