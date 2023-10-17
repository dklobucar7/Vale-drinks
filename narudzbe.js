document.addEventListener("DOMContentLoaded", function () {
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
