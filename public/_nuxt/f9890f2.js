(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{390:function(t,e,r){"use strict";r.r(e);var c={computed:{products:function(){return this.$store.getters["product/products"]}},created:function(){0===this.$store.getters["product/products"].length&&this.$store.dispatch("product/getProducts"),this.$store.commit("product/loadProduct",null),this.$store.commit("product/clearProductCategories")},methods:{removeProduct:function(t){var e=this;this.$swal({title:"Delete the product?",icon:"warning",buttons:!0,dangerMode:!0}).then((function(r){r&&e.$store.dispatch("product/removeProduct",t)}))},editProduct:function(t){this.$store.commit("product/loadProduct",t),this.$router.push("product-edit")}}},o=r(55),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("section",{staticClass:"section no-top-pad"},[r("nav",{staticClass:"level"},[t._m(0),t._v(" "),r("div",{staticClass:"level-right"},[r("div",{staticClass:"level-item"},[r("nuxt-link",{staticClass:"button is-primary",attrs:{to:"/admin/product-edit"}},[t._v("Add")])],1)])]),t._v(" "),r("hr"),t._v(" "),r("table",{staticClass:"table is-striped is-fullwidth"},[t._m(1),t._v(" "),r("tbody",t._l(t.products,(function(e,c){return r("tr",{key:e.key},[r("th",[t._v(t._s(++c))]),t._v(" "),r("td",[r("img",{staticClass:"image is-48x48",attrs:{src:e.imageUrl}})]),t._v(" "),r("td",[r("a",{attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.editProduct(e)}}},[t._v(t._s(e.name))])]),t._v(" "),r("td",[t._v(t._s(e.code))]),t._v(" "),r("td",[t._v(t._s(e.brand))]),t._v(" "),r("td",{staticClass:"has-text-centered"},[t._v(t._s(e.stock))]),t._v(" "),r("td",{staticClass:"has-text-centered"},[t._v("\n            "+t._s(1===e.status?"Available":"Not Available")+"\n          ")]),t._v(" "),r("td",[r("a",{attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.removeProduct(e)}}},[t._m(2,!0)])])])})),0)])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"level-left"},[r("div",{staticClass:"level-item"},[r("h5",{staticClass:"title is-5"},[t._v("Products")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",[r("tr",[r("th",[t._v("#")]),t._v(" "),r("th",[t._v("Image")]),t._v(" "),r("th",[t._v("Product")]),t._v(" "),r("th",[t._v("Code")]),t._v(" "),r("th",[t._v("Brand")]),t._v(" "),r("th",{staticClass:"has-text-centered"},[t._v("Stock")]),t._v(" "),r("th",{staticClass:"has-text-centered"},[t._v("Status")]),t._v(" "),r("th",[t._v(" ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon has-text-danger"},[e("i",{staticClass:"fa fa-lg fa-times-circle"})])}],!1,null,null,null);e.default=component.exports}}]);