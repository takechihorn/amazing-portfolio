const { Nuxt } = require('nuxt')
const express = require('express')
const port = process.env.PORT || 8080

const app = express()
const nuxtConfig = require('../nuxt.config')

// Instanciate Nuxt
const nuxt = new Nuxt(nuxtConfig)
app.use(nuxt.render)

app.listen(port, '127.0.0.1', () => {
  console.log(`Nshop App @ Port ${port}`)
})
