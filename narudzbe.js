document.addEventListener("DOMContentLoaded", function () {
  ////////////////////////////////////////////////////////////////////////////////////
  // POPULATE TABLE
  // Get value of the narudzba_id parameter from the URL - preko URL smo prebacili ID NARUDZBE
  const urlParams = new URLSearchParams(window.location.search);
  const prodavac = urlParams.get("prodavac");
  console.log(prodavac);

  const postDataListaSvihNarudzbi = [
    {
      action: "Lista_svih_narudzbi",
      user: prodavac,
    },
  ];

  // POST zahtjev na API endpoint

  function fetchDataAndAddToTable() {
    fetch("https://demo.cadcam-group.eu/api/", {
      method: "POST",
      body: JSON.stringify(postDataListaSvihNarudzbi),
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
              next: "Slijedeća",
              previous: "Prethodna",
            },
          },
        });
      })
      .catch((error) => {
        console.error("Došlo je do pogreške:", error);
      });
  }
  fetchDataAndAddToTable();

  function createRow(data) {
    // Access the tbody element where you want to append the new row
    const tableBody = document.getElementById("table-tbody");

    // Create a new table row (tr) element
    const newRow = document.createElement("tr");

    // Populate the row with data from the GET request
    newRow.innerHTML = `
     <td>${data.narudzba_id}</td>
     <td>${data.prodavac}</td>
     <td>${data.narucitelj}</td>
     <td>${data.datumNarudzbe}</td>
     <td>${data.datumDostave}</td>
     <td>
        <button class="btn btn-primary editBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
            />
          </svg>
        </button>
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
    <td id="hiddenNarudzbaId">${data.narudzba_id}</td>
     `;

    // Append the new row to the table
    tableBody.appendChild(newRow);
  }

  // POPULATE TABLE
  ///////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////
  // Handle delete order
  const tBody = document.getElementById("table-tbody");
  // Detecting delete button
  $("#table-tbody").on("click", ".deleteBtn", function () {
    const narudzbaIdHidden = $(this)
      .closest("tr")
      .find("#hiddenNarudzbaId")
      .text();

    const rowData = [
      {
        action: "Obrisi",
        Parameters: [
          {
            narudzba_id: narudzbaIdHidden,
          },
        ],
      },
    ];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(rowData),
    };
    fetch("https://demo.cadcam-group.eu/api/", requestOptions)
      .then((response) => {
        if (response.ok) {
          //Handle success
          console.log("Narudzba je obrisana");
          console.log(JSON.stringify(rowData));

          // Reload the page after successful deletion
          location.reload(); // This will refresh the page

          // Alternatively, you can navigate to a specific URL:
          // location.href = "https://your-website.com/your-page";
        } else {
          //Handle error
          console.error("Error sending data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  /////////////////////////////////////////////////////////////////////////////////////
  // Handle delete order

  /////////////////////////////////////////////////////////////////////////////////////
  // Handle EDIT ORDER
  // Detecting EDIT button and send narudzbe_id to uredivanje_narudzbe.html
  $("#table-tbody").on("click", ".editBtn", function () {
    console.log(this);
    const narudzbaIdHidden = $(this)
      .closest("tr")
      .find("#hiddenNarudzbaId")
      .text();
    window.location.href = `https://demo.cadcam-group.eu/uredivanje_narudzbe.html?narudzba_id=${narudzbaIdHidden}`;
  });
});
