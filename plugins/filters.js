import Vue from 'vue'

Vue.filter('currency', (value) => {
  // 数字かどうか判定、valueがあるかどうか判定
  if (!value || isNaN(value)) value = 0
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })
  return formatter.format(value)
})
