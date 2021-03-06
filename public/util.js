;(function () {
  // your page initialization code here
  // the DOM will be available here
  document.addEventListener('DOMContentLoaded', function () {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    )
    // Check if there are any nav burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
          // Get the target from the "data-target" attribute
          const target = $el.dataset.target
          const $target = document.getElementById(target)
          // Toggle "navbar-burger" menu when a menu item is clicked
          $target.addEventListener('click', function (e) {
            Array.prototype.forEach.call(
              $target.querySelectorAll('.navbar-item'),
              function (el) {
                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                // console.log(el)
                $el.classList.toggle('is-active')
                $target.classList.toggle('is-active')
              }
            )
          })
          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active')
          $target.classList.toggle('is-active')
        })
      })
    }
  })
})()
