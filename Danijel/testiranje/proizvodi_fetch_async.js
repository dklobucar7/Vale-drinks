document.addEventListener("DOMContentLoaded", async function () {
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

  async function fetchData() {
    try {
      const response = await fetch("https://demo.cadcam-group.eu/api/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      data.forEach((item) => {
        createRow(item);
      });
    } catch (error) {
      console.error("Došlo je do pogreške:", error);
    }
  }
  await fetchData(); // Using await here to ensure fetchData completes before continuing
});
