//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PRVI SLOBODNI ID za novu narudžbu

// Definiranje podataka za POST zahtjev
const postDataNarudzbaId = [
  {
    action: "Narudzba_ID",
  },
];
// POST zahtjev na API endpoint
fetch("https://demo.cadcam-group.eu/api/", {
  method: "POST",
  body: JSON.stringify(postDataNarudzbaId),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const narudzbaId = document.getElementById("narudzba_id");

    narudzbaId.value = `${data[0].NextID}`;
  })
  .catch((error) => {
    console.error("Došlo je do pogreške:", error);
  });
//
