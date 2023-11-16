document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  function createRow(data) {
    const tableBody = document.getElementById("table-body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td>${data.ime}</td>
    <td>${data.adresa}</td>
    <td>${data.mail}</td>
    <td>${data.telefon}</td>
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

  ///////////////////////////////////////////////////
  // POST API ZA POVLAČENJE SVIH KUPACA/KLIJENATA
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
});
