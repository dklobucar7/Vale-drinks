document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  /////////////////////////////////////////////////////////////////
  // KREIRANJE TABLICE START
  let id = 1;

  function createRow(data) {
    const tableBody = document.getElementById("table-body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td>${id}</td>
    <td id="kupac-id">${data.id}</td>
    <td id="kupac-ime">${data.ime}</td>
    <td id="kupac-adresa">${data.adresa}</td>
    <td id="kupac-mail">${data.mail}</td>
    <td id="kupac-telefon">${data.telefon}</td>
    <td>
        <button class="btn btn-primary editBtn m-1">
            <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-danger deleteBtn m-1">
            <i class="bi bi-dash-circle"></i>
        </button>
    </td> 
    `;
    //Increase id
    id++;

    //Append the new row to the table
    tableBody.appendChild(newRow);
  }

  ///////////////////////////////////////////////////
  // POST API ZA POVLAČENJE SVIH KUPACA/KLIJENATA START
  const postDataSviProdavaci = [
    {
      action: "tblklijenti",
    },
  ];

  fetch("https://demo.cadcam-group.eu/admin/", {
    method: "POST",
    body: JSON.stringify(postDataSviProdavaci),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error fetching data.");
      }
    })
    .then((data) => {
      // Call createRow to add the fetched data to the table
      data.forEach((data) => {
        createRow(data);
      });
      // Initialize the DataTable
      $("#tablica").DataTable({
        language: {
          search: "Pretraži:",
          info: "Prikazuje se _START_ do _END_ od _TOTAL_ unosa",
          lengthMenu: "Prikaži _MENU_ unosa",
          paginate: {
            next: "Sljedeća",
            previous: "Prethodna",
          },
        },
      });
    })
    .catch((error) => {
      console.error("Došlo je do pogreške:", error);
    });
  // POST API ZA POVLAČENJE SVIH KUPACA/KLIJENATA END
  ///////////////////////////////////////////////////

  // KREIRANJE TABLICE END
  /////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  // API ZA KREIRANJE NOVOG KUPCA START

  const newClientForm = document.getElementById("new-client-form");

  newClientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(newClientForm);

    // Construct JSON
    const jsonData = [
      {
        action: "tblklijenti+",
        Data: [
          {
            id: formData.get("id-firme"),
            ime: formData.get("naziv-firme"),
            adresa: formData.get("adresa-firme"),
            prezime: formData.get("grad-firme"),
            mail: formData.get("email-firme"),
            telefon: formData.get("kontakt-firme"),
          },
        ],
      },
    ];

    const myHeaders = new Headers();
    myHeaders.append = ("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(jsonData),
    };

    fetch("https://demo.cadcam-group.eu/admin/", requestOptions)
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          console.error("Error sending data.");
        }
      })

      .catch((error) => {
        console.error("Došlo je do pogreške:", error);
      });
  });

  // API ZA KREIRANJE NOVOG KUPCA END
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  // DELETE CLIENT START

  // Detecting delete button
  $("#table-body").on("click", ".deleteBtn", function () {
    //Get id from specific client
    const kupcacId = $(this).closest("tr").find("#kupac-id").text();

    const rowData = [
      {
        action: "tblklijenti-",
        Parameters: [
          {
            id: kupcacId,
          },
        ],
      },
    ];

    const myHeaders = new Headers();
    myHeaders.append = ("Content-Type", "application/josn");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(rowData),
    };

    fetch("https://demo.cadcam-group.eu/api/", requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log(JSON.stringify(rowData));
          location.reload();
        } else {
          console.error("Error sending data.");
        }
      })

      .catch((error) => {
        console.error("Error: ", error);
      });
  });

  // DELETE CLIENT END
  ////////////////////////////////////////////////////////////////

  
});
