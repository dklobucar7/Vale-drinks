document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("order-form");
  const orderTableBody = document.querySelector("#order-table tbody");
  const addRowButton = document.getElementById("add-row");
  const saveButton = document.getElementById("save-form");

  // Add a new row to the table
  addRowButton.addEventListener("click", function () {
    const newRow = `
            <tr>
                <td><input type="text" name="narudzba_id" required></td>
                <td><input type="text" name="p_Naziv"></td>
                <td><input type="text" name="Barcode"></td>
                <td><input type="number" name="Quantity"></td>
                <td><button type="button" class="delete-row">Delete</button></td>
            </tr>
        `;
    orderTableBody.insertAdjacentHTML("beforeend", newRow);
  });

  // Remove a row from the table
  orderTableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-row")) {
      e.target.closest("tr").remove();
    }
  });

  // Save form data as JSON and send it to the server
  saveButton.addEventListener("click", function () {
    const formData = new FormData(orderForm);
    const formDataJSON = {};

    formData.forEach((value, key) => {
      formDataJSON[key] = value;
    });

    const tableData = Array.from(orderTableBody.querySelectorAll("tr")).map(
      (row) => {
        const rowData = {};
        row.querySelectorAll("input").forEach((input) => {
          rowData[input.name] = input.value;
        });
        return rowData;
      }
    );

    formDataJSON["Data"] = tableData;

    // Send the JSON data to the server using Fetch API
    fetch("https://demo.cadcam-group.eu/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([formDataJSON]),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log("Data sent successfully!");
        } else {
          // Handle error
          console.error("Error sending data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
