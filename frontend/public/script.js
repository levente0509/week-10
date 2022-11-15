const form = document.querySelector("#add-category");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const product = {
    name: document.querySelector("#name").value,
    category: document.querySelector("#category").value,
    price: parseInt(document.querySelector("#price").value),
  };
});

const formData = new formData();
formData.append("fileName", document.querySelector("#fileName").value);
formData.append("file", document.querySelector("#file".files[0])); //mindig egy elemet ad vissza

fetch("/upload", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(product), //mindenképp string legyen --> szerver csak ezt tud küldeni & fogadni
});

fetch("/upload-image", {
  method: "POST",
  body: formData,
});
