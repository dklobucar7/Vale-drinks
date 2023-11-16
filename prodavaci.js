document.addEventListener("DOMContentLoaded", function () {
  /////////////////////////////////////////
  // Kreiranje tablice

  function createRow(data) {
    const tableBody = document.getElementById("table-body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td>${data.ime}</td>
    <td>${data.prezime}</td>
    <td>${data.mail}</td>
    <td>${data.telefon}</td>
    <td>${data.adresa}</td>
    <td>
        <button class="btn btn-primary m-1">
            <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-danger m-1">
            <i class="bi bi-dash-circle"></i>
        </button>
    </td> 
    `;
    //Append the new row to the table
    tableBody.appendChild(newRow);
  }

  ///////////////////////////////////////////
  // POST API SVI PRODAVACI

  const dataPostListaSvihProdavaca = [
    {
      action: "tblprodavaci",
    },
  ];

  fetch("https://demo.cadcam-group.eu/admin/", {
    method: "POST",
    body: JSON.stringify(dataPostListaSvihProdavaca),
    headers: {
      "Content-type": "application/josn",
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
  ///////////////////////////////////////////
  // POST API SVI PRODAVAC END
});
