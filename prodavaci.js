document.addEventListener("DOMContentLoaded", function () {
  /////////////////////////////////////////
  // KREIRANJE TABLICE START
  var id = 1;
  function createRow(data) {
    const tableBody = document.getElementById("table-body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td>${id}</td>
    <td id="prodavac-id">${data.id}</td>
    <td id="prodavac-ime">${data.ime}</td>
    <td id="prodavac-prezime">${data.prezime}</td>
    <td id="prodavac-mail">${data.mail}</td>
    <td id="prodavac-telefon">${data.telefon}</td>
    <td id="prodavac-adresa">${data.adresa}</td>
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

  ///////////////////////////////////////////
  // POST API POPIS SVIH PRODAVACA

  const dataPostListaSvihProdavaca = [
    {
      action: "tblprodavaci",
    },
  ];

  fetch("https://demo.cadcam-group.eu/admin/", {
    method: "POST",
    body: JSON.stringify(dataPostListaSvihProdavaca),
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
  // POST API POPIS SVIH PRODAVAC END

  // KREIRANJE TABLICE END
  /////////////////////////////////////////

  //////////////////////////////////////////
  // POST API ZA KREIRANJE PRODAVAČA START
  const newSalesmanForm = document.getElementById("new-salesman-form");

  newSalesmanForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(newSalesmanForm);

    //Construct JOSN
    const jsonData = [
      {
        action: "tblprodavaci+",
        Data: [
          {
            id: formData.get("id-prodavaca"),
            ime: formData.get("ime-prodavaca"),
            prezime: formData.get("prezime-prodavaca"),
            mail: formData.get("email-prodavaca"),
            adresa: formData.get("adresa-prodavaca"),
            telefon: formData.get("kontakt-prodavaca"),
          },
        ],
      },
    ];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(jsonData),
      redirect: "follow",
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

  // POST API ZA KREIRANJE PRODAVAČA ENDs
  //////////////////////////////////////////

  //////////////////////////////////////////
  // DELETE API ZA PRODAVAČA START

  // Detecting delete button
  $("#table-body").on("click", ".deleteBtn", function () {
    const prodavacId = $(this).closest("tr").find("#prodavac-id").text();

    const rowData = [
      {
        action: "tblprodavaci-",
        Parameters: [
          {
            id: prodavacId,
          },
        ],
      },
    ];
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("https://demo.cadcam-group.eu/api/", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(rowData),
    })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          console.error("Error sending data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // DELETE API ZA PRODAVAČA END
  //////////////////////////////////////////

  /////////////////////////////////////////
  // EDITIRANJE PRODAVACA START
  $("#table-body").on("click", ".editBtn", function () {
    console.log(this);

    // Dohvaćanje podataka korisnika
    const prodavacId = $(this).closest("tr").find("#prodavac-id").text();
    const prodavacIme = $(this).closest("tr").find("#prodavac-ime").text();
    const prodavacPrezime = $(this)
      .closest("tr")
      .find("#prodavac-prezime")
      .text();
    const prodavacMail = $(this).closest("tr").find("#prodavac-mail").text();
    const prodavacAdresa = $(this)
      .closest("tr")
      .find("#prodavac-adresa")
      .text();
    const prodavacTelefon = $(this)
      .closest("tr")
      .find("#prodavac-telefon")
      .text();

    // Postavljanje podataka u modalni prozor
    $("#id-prodavaca").val(prodavacId);
    $("#ime-prodavaca").val(prodavacIme);
    $("#prezime-prodavaca").val(prodavacPrezime);
    $("#email-prodavaca").val(prodavacMail);
    $("#adresa-prodavaca").val(prodavacAdresa);
    $("#kontakt-prodavaca").val(prodavacTelefon);

    // Otvaranje modala
    $("#exampleModal").modal("show");
  });

  // EDITIRANJE PRODAVACA START
  /////////////////////////////////////////

  /////////////////////////////////////////
  // DOHVACANJE PRVOG SLOBODNOG ID-a ZA PRODAVACA START

  $("#dodajte-prodavaca").on("click", function () {
    // Prvo očistimo sve podatke (jer ako otvorimo vec postojeceg korisnika onda ce ostati njegovi podaci)
    $("#id-prodavaca").val("");
    $("#ime-prodavaca").val("");
    $("#prezime-prodavaca").val("");
    $("#email-prodavaca").val("");
    $("#adresa-prodavaca").val("");
    $("#kontakt-prodavaca").val("");

    const freeIdProdavac = [
      {
        action: "tblprodavaci*",
      },
    ];

    fetch("https://demo.cadcam-group.eu/admin/", {
      method: "POST",
      body: JSON.stringify(freeIdProdavac),
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
        const prodavacID = document.getElementById("id-prodavaca");
        prodavacID.value = `${data[0].id}`;
      })
      .catch((error) => {
        console.error("Došlo je do pogreške:", error);
      });
  });

  // DOHVACANJE PRVOG SLOBODNOG ID-a ZA PRODAVACA END
  /////////////////////////////////////////
});
