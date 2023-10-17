document.addEventListener("DOMContentLoaded", function () {
  // Get value of the narudzba_id parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const narudzbaId = urlParams.get("narudzba_id");
  console.log(narudzbaId);

  // Set the value of narudzba_id to input field
  const narudzba_id = document.getElementById("narudzba_id_");
  narudzba_id.value = narudzbaId;

  /////////////////////////////////////////////////////////////////////////////////////
  // Populate data for specific narudzba_id

  const rowData = [
    {
      action: "Uredi",
      Parameters: [
        {
          narudzba_id: narudzbaId,
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

  //Initialization of DOM elements
  const orderForm = document.getElementById("orderForm");
  const formData = new FormData(orderForm);

  const prodavac = formData.get("prodavac");

  fetch("https://demo.cadcam-group.eu/api/", requestOptions)
    .then((response) => {
      if (response.ok) {
        //Handle success
        console.log("Uređivanje narudzbe");
        console.log(JSON.stringify(rowData));
      } else {
        //Handle error
        console.error("Error sending data.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
