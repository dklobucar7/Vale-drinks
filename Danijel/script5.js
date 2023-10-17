document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("order-form");
  const orderTableBody = document.querySelector("#order-table tbody");
  const addRowButton = document.getElementById("add-row");

  // Add a new row to the table
  addRowButton.addEventListener("click", function () {
    const newRow = `
            <tr>
                <td><input type="text" name="narudzba_id" required></td>
                <td><input type="text" name="p_naziv"></td> 
                <td><input type="text" name="p_bar-cod"></td>
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

  // Handle form submission
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

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
          adresaDostave: formData.get("adresaDostave"),
        },
      ],
      Data: [],
    };

    const tableRows = Array.from(orderTableBody.querySelectorAll("tr"));
    for (const row of tableRows) {
      const rowData = {
        narudzba_id: row.querySelector('[name="narudzba_id"]').value,
        p_Naziv: row.querySelector('[name="p_naziv"]').value,
        p_bar_cod: row.querySelector('[name="p_bar-cod"]').value,
      };
      formDataJSON.Data.push(rowData);
    }

    /*
    // Send the JSON data to the server using Fetch API
    fetch("https://demo.cadcam-group.eu/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([formDataJSON]),
      redirect: "follow",
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log("Data sent successfully!");
          console.log(formDataJSON);
        } else {
          // Handle error
          console.error("Error sending data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    */

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify([formDataJSON]),
      redirect: "follow",
    };

    fetch("https://demo.cadcam-group.eu/aron/", requestOptions)
      .then((response) => response.text())

      .then((result) => console.log(result))

      .catch((error) => console.log("error", error));
  });
});
