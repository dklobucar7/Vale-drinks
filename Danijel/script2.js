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
    const formDataJSON = {
      action: "Narudzba",
      Parameters: [
        {
          narudzba_id: formData.get("narudzba_id"),
          narucitelj: formData.get("narucitelj"),
          prodavac: formData.get("prodavac"),
          datumNarudzbe: formData.get("datumNarudzbe"),
          datumDostave: formData.get("datumDostave"),
        },
      ],
      Data: [],
    };

    const tableRows = Array.from(orderTableBody.querySelectorAll("tr"));
    for (const row of tableRows) {
      const rowData = {
        narudzba_id: row.querySelector('[name="narudzba_id"]').value,
        p_Naziv: row.querySelector('[name="p_Naziv"]').value,
        Barcode: row.querySelector('[name="Barcode"]').value,
        Quantity: row.querySelector('[name="Quantity"]').value,
      };
      formDataJSON.Data.push(rowData);
    }

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
