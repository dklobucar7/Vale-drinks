//////////////////////////////////////////////////////////
// FETCH ITEM PRICE START
// Function to fetch item price and update the table row
function fetchItemPrice(inputElement) {
  // Define selectElement here to access the select element
  const selectElement = document.getElementById("list-products");
  const selectedOption = Array.from(
    selectElement.querySelectorAll("option")
  ).find((option) => option.value === inputElement.value);
  if (selectedOption) {
    const price = selectedOption.getAttribute("data-price");
    const row = inputElement.closest("tr");
    const priceInput = row.querySelector("#cijena");
    priceInput.value = price;
  }
}
// FETCH ITEM PRICE END
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//FETCH SALESMAN-ID START

function fetchSalesmanId(inputElement) {
  // Define selectElement here to access the select element
  const selectElement = document.getElementById("list-salesman");
  const selectedOption = Array.from(
    selectElement.querySelectorAll("option")
  ).find((option) => option.value === inputElement.value);
  if (selectedOption) {
    const salesmanId = selectedOption.getAttribute("client-id");
    return salesmanId;
  }
}
//FETCH SALESMAN-ID END
///////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
// FETCH CLIENT ID START

function fetchClientId(inputElement) {
  const selectElement = document.getElementById("list-clients");
  const selectedOption = Array.from(
    selectElement.querySelectorAll("option")
  ).find((option) => option.value === inputElement.value);
  if (selectedOption) {
    const clientId = selectedOption.getAttribute("client-id");
    return clientId;
  }
}

// FETCH CLIENT ID END
/////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// DOM

document.addEventListener("DOMContentLoaded", function () {
  let salesmanId;
  let clientId;
  //Initialization of DOM elements
  const orderForm = document.getElementById("orderForm");
  const orderTableBody = document.getElementById("tbody");
  const addRowButton = document.getElementById("addRow");
  //Add a new row to table
  // Add a new row to the table and fetch the price for the selected item
  addRowButton.addEventListener("click", function () {
    const newRow = `
      <tr>
        <td>
          <input 
            type="text"
            class="form-control"
            list="list-products"
            id="nazivPR"
            name="p_naziv"
            oninput="fetchItemPrice(this)"
          />
        </td>
        <td>
          <input type="number" class="form-control" id="quantity" />
        </td>
        <td>
          <input
            type="number"
            class="form-control"
            id="cijena"
            step= 0.01
          />
        </td>
        <td>
        <button class="btn btn-danger deleteBtn delete-row">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-dash-circle-dotted"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
            />
          </svg>
          </button>
        </td>
        <td><input type="hidden" id="hidden_barcode" name="barcode"></td>
      </tr>
    `;
    orderTableBody.insertAdjacentHTML("beforeend", newRow);
  });
  //Delete button click evente
  $("table").on("click", ".deleteBtn", function () {
    $(this).closest("tr").remove();
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////
  // GET method Populate data from "https://demo.cadcam-group.eu/api" to table NAZIV ARTIKLA/
  fetch("https://demo.cadcam-group.eu/api")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((user) => {
        const markup = `<option id="option-item" data-barcode="${
          user.BAR_COD
        }" data-price="${user.VPC_kn}">${
          user.Naziv +
          " - " +
          user.Sadrzaj +
          " - " +
          user.Pak +
          " - " +
          user.BAR_COD
        }</option>`;
        document
          .querySelector("#list-products")
          .insertAdjacentHTML("beforeend", markup);
      });
    })
    .catch((error) => console.log(error));
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //SAVE ORDER
  //Handle form submission
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    // Definiranje podataka za POST zahtjev
    const postDataNarudzbaId = [
      {
        action: "Narudzba_ID",
      },
    ];

    var myHeaders_1 = new Headers();
    myHeaders_1.append("Content-Type", "application/json");
    var requestOptions_1 = {
      method: "POST",
      headers: myHeaders_1,
      body: JSON.stringify(postDataNarudzbaId),
      redirect: "follow",
    };
    // POST zahtjev na API endpoint
    fetch("https://demo.cadcam-group.eu/api/", requestOptions_1)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const narudzbaId = document.getElementById("narudzba_id");
        narudzbaId.value = `${data[0].NextID}`;
      })
      .catch((error) => {
        console.error("Došlo je do pogreške:", error);
      });

    //
    salesmanId = fetchSalesmanId(prodavac);
    clientId = fetchClientId(narucitelj);
    //
    console.log("čekam");
    setTimeout(function () {
      slanjeJSON();
    }, 1000);
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //SAVE ORDER
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // PRVI SLOBODNI ID za novu narudžbu

  function slanjeJSON() {
    const formData = new FormData(orderForm);
    const prodavac = formData.get("prodavac"); // Get the value of prodavac
    const narucitelj = formData.get("narucitelj");

    //Body
    const formDataJSON = {
      action: "Narudzba",
      Parameters: [
        {
          narudzba_id: formData.get("narudzba_id"),
          narucitelj: formData.get("narucitelj").split(" - ")[0] || "",
          prodavac: formData.get("prodavac"),
          datumNarudzbe: formData.get("datumNarudzbe"),
          datumDostave: formData.get("datumDostave"),
          adresaDostave: formData.get("narucitelj").split(" - ")[1] || "",
          prodavaci_id: salesmanId,
          klijenti_id: clientId,
        },
      ],
      Data: [],
    };
    const tableRows = Array.from(orderTableBody.querySelectorAll("tr"));
    const selectElement = document.getElementById("list-products");
    for (const row of tableRows) {
      //Naziv artikla ima spojeno više podataka, ovdje razdvajamo sve podatke i dodijeljujemo ih prema specificnim poljima
      const p_NazivAllElements = row.querySelector("#nazivPR").value;
      const parts = p_NazivAllElements.split(" - ");
      //const p_NazivFirstElement = parts[0]; //trenutno ga ne koristimo jer ipak upisujemo sve podatke u JSON
      // Dohvatite odabrani proizvod iz datalista na temelju vrijednosti iz #nazivPR - ovako moramo raditi
      const selectedOption = Array.from(
        selectElement.querySelectorAll("option")
      ).find((option) => option.value === p_NazivAllElements);
      const barcode = selectedOption.getAttribute("data-barcode");
      const kolicina = row.querySelector("#quantity").value;
      const cijena = selectedOption.getAttribute("data-price");
      const rowData = {
        narudzba_id: formData.get("narudzba_id"),
        p_Naziv: p_NazivAllElements,
        p_bar_cod: barcode,
        kolicina: kolicina,
        cijena: cijena,
      };
      formDataJSON.Data.push(rowData);
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify([formDataJSON]),
      redirect: "follow",
    };
    fetch("https://demo.cadcam-group.eu/api/", requestOptions)
      .then((response) => {
        if (response.ok) {
          //Handle success
          alert("Data sent successfully!");
          console.log(JSON.stringify([formDataJSON]));

          // Redirect to
          window.location.href = `https://demo.cadcam-group.eu/narudzbe.html?prodavac=${encodeURIComponent(
            prodavac
          )}`;
        } else {
          //Handle error
          console.error("Error sending data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
