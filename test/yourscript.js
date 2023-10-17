document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector(".add-button");
  const saveButton = document.querySelector("#save-button");

  addButton.addEventListener("click", addRow);
  saveButton.addEventListener("click", saveFormData);

  // Add event listeners to existing remove buttons
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      removeRow(this);
    });
  });
});

function addRow() {
  const tableBody = document.querySelector("#orderTable tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td><input type="text" name="p_Naziv"></td>
        <td><input type="text" name="barcode"></td>
        <td><input type="number" name="qty"></td>
        <td><button type="button" class="remove-button">Remove</button></td>
    `;
  tableBody.appendChild(newRow);

  // Add event listener to the newly created remove button
  const removeButton = newRow.querySelector(".remove-button");
  removeButton.addEventListener("click", function () {
    removeRow(this);
  });
}

function removeRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function saveFormData() {
  const orderForm = document.querySelector("#orderForm");
  const formData = new FormData(orderForm);
  const jsonData = {
    action: "Narudzba",
    Parameters: Object.fromEntries(formData.entries()),
    Data: [],
  };

  const productRows = document.querySelectorAll("#orderTable tbody tr");
  productRows.forEach((row) => {
    const productInputs = row.querySelectorAll(
      "input[name='p_Naziv'], input[name='barcode'], input[name='qty']"
    );
    const productData = {
      narudzba_id: jsonData.Parameters.narudzba_id,
    };
    productInputs.forEach((input) => {
      productData[input.name] = input.value;
    });
    jsonData.Data.push(productData);
  });

  // Send jsonData to the server using the Fetch API
  fetch("https://demo.cadcam-group.eu/api", {
    method: "POST",
    body: JSON.stringify([jsonData]),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server if needed
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
}
