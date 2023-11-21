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
    <td>${data.id}</td>
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
  // BRISANJE KORISNIKA START

  $("#table-body").on("click")

  // BRISANJE KORISNIKA END
  ////////////////////////////////////////////////////////////////
});
