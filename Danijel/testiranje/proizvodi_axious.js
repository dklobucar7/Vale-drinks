document.addEventListener("DOMContentLoaded", function () {
  // Initialization of DOM elements
  const tableBody = document.getElementById("tbody");
  let id = 1;

  function createRow(data) {
    // Create a new table row element
    const newRow = document.createElement("tr");

    // Populate row with data from GET request
    newRow.innerHTML = `
      <td>${id}</td>
      <td>${data.Naziv}</td>
      <td>${data.Sadrzaj}</td>
      <td>${data.tip}</td>
      `;

    // Append the new row to the table
    tableBody.appendChild(newRow);

    // Increment id for the next row
    id++;
  }

  // Use Axios to make a GET request
  axios
    .get("https://demo.cadcam-group.eu/api/")
    .then((response) => {
      // Check if the response status is OK (status code 200)
      if (response.status === 200) {
        // Process the data
        const data = response.data;
        data.forEach((item) => {
          createRow(item);
        });
      } else {
        console.error("Došlo je do pogreške pri dohvaćanju podataka.");
      }
    })
    .catch((error) => {
      console.error("Došlo je do pogreške:", error);
    });
});
