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

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://demo.cadcam-group.eu/api/", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      // Response processing
      data.forEach((data) => {
        createRow(data);
      });
    }
  };
  xhr.send();
});
