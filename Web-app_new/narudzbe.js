// Handle delete order

// Detecting delete button

for (var i = 0; i < document.querySelectorAll(".delete-row").length; i++) {
  document
    .querySelectorAll(".delete-row")
    [i].addEventListener("click", function () {
      var buttonInnerHTML = this.innerHTML;
      console.log(buttonInnerHTML);
    });
}
