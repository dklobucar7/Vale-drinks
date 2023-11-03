document.addEventListener("DOMContentLoaded", function () {
  // Initialization of DOM elements
  const tableBody = document.getElementById("tbody");
  let id = 1;

  function createRow(data) {
    // Create a new table row element
    const newRow = document.createElement("tr");

    //Populate row with data from GET request
    newRow.innerHTML = `
  <td>${id}</td>
  <td>${data.Naziv}</td>
  <td>${data.Sadrzaj}</td>
  <td>${data.tip}</td>
  `;

    // Append the new row to the table
    tableBody.appendChild(newRow);

    // Increment id for next row
    id++;
  }
  function fetchData() {
    fetch("https://demo.cadcam-group.eu/api/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((data) => {
          createRow(data);
        });
      })
      .catch((error) => {
        console.error("Došlo je do pogreške:", error);
      });
  }
  fetchData();
});
