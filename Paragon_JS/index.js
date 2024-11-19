let productToEditIndex = null;
let productToRemoveIndex = null;
const date = new Date();

const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

document.querySelector("h1").innerHTML = `Paragon nr ${day}/${month}/${year}`;


// Wyświetlenie produktów
function showProducts() {
    const tbody = document.getElementById("paragon_tbody");
    let sumaParagonu = 0;

    tbody.innerHTML = "";
    fetch('http://localhost:3000/produkty')
        .then(response => response.json())
        .then(produkty => {
            produkty.forEach((produkt, index) => {
                const tr = document.createElement('tr');
                const suma = produkt.ilość * produkt.cena;
                sumaParagonu += suma;

                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${produkt.nazwa}</td>
                    <td>${produkt.ilość}</td>
                    <td>${produkt.cena} zł</td>
                    <td>${suma} zł</td>
                    <td><button class="remove-btn" onclick="openRemoveModal('${produkt.id}')">X</button></td>
                    <td><button id="edit-btn" onclick="openEditModal('${produkt.id}')">Edytuj</button></td>
                `;
                tbody.appendChild(tr);
            });
            document.getElementById("sumaParagonu").textContent = `${sumaParagonu} zł`;
        })
        .catch(error => console.error('Błąd pobierania danych:', error));
}

// Dodawanie produktów
function addProduct(event) {
    event.preventDefault();

    const nazwaForm = document.getElementById("nazwa_form");
    const iloscForm = document.getElementById("ilosc_form");
    const cenaForm = document.getElementById("cena_form");

    const nazwa = nazwaForm.value;
    const ilość = parseInt(iloscForm.value);
    const cena = parseFloat(cenaForm.value);

    if (nazwa && ilość > 0 && cena > 0) {
        const nowyProdukt = { nazwa, ilość, cena };

        fetch('http://localhost:3000/produkty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nowyProdukt)
        })
        .then(response => response.json())
        .then(() => {
            showProducts(); // Po dodaniu odświeżamy widok
        })
        .catch(error => console.error('Błąd dodawania produktu:', error));

        nazwaForm.value = '';
        iloscForm.value = '';
        cenaForm.value = '';
    } else {
        alert("Wszystkie pola muszą być wypełnione poprawnie.");
    }
}


// Usuwanie produktów
function openRemoveModal(id) {
    productToRemoveIndex = id;
    document.getElementById("removeProductModal").style.display = "block";
}

function closeRemoveModal() {
    document.getElementById("removeProductModal").style.display = "none";
}

function removeProduct() {
    if (productToRemoveIndex !== null) {
        fetch(`http://localhost:3000/produkty/${productToRemoveIndex}`, {
            method: 'DELETE'
        })
        .then(() => {
            showProducts();
            closeRemoveModal();
        })
        .catch(error => console.error('Błąd usuwania produktu:', error));
    }
}


// Edycja produktów
function openEditModal(id) {
    productToEditIndex = id; // id jest teraz stringiem

    fetch(`http://localhost:3000/produkty/${id}`)
        .then(response => response.json())
        .then(produkt => {
            document.getElementById("edit-nazwa-form").value = produkt.nazwa;
            document.getElementById("edit-ilosc-form").value = produkt.ilość;
            document.getElementById("edit-cena-form").value = produkt.cena;
            document.getElementById("EditProductModal").style.display = "block";
        })
        .catch(error => console.error('Błąd pobierania danych do edycji:', error));
}

function editProduct(event) {
    event.preventDefault();

    const nazwa = document.getElementById("edit-nazwa-form").value;
    const ilość = parseInt(document.getElementById("edit-ilosc-form").value);
    const cena = parseFloat(document.getElementById("edit-cena-form").value);

    if (nazwa && ilość > 0 && cena > 0) {
        const zaktualizowanyProdukt = { nazwa, ilość, cena };

        fetch(`http://localhost:3000/produkty/${productToEditIndex}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(zaktualizowanyProdukt)
        })
        .then(() => {
            showProducts();
            closeEditModal();
        })
        .catch(error => console.error('Błąd edycji produktu:', error));
    } else {
        alert("Wszystkie pola muszą być wypełnione poprawnie!");
    }
}

function closeEditModal() {
    document.getElementById("EditProductModal").style.display = "none";
}


// Modale do dodawania produktów
function openModal() {
    document.getElementById("newProductModal").style.display = "block";
}

function closeModal() {
    document.getElementById("newProductModal").style.display = "none";
}

//Listenery
document.getElementById("showModalButton").addEventListener("click", openModal);
document.getElementById("closeModalButton").addEventListener("click", closeModal);
document.getElementById("addForm").addEventListener("submit", addProduct);
document.getElementById("removebtn").addEventListener("click", removeProduct);
document.getElementById("cancelbtn").addEventListener("click", closeRemoveModal);
document.getElementById("editProductButton").addEventListener("click", editProduct);
document.getElementById("closeEditModalButton").addEventListener("click", closeEditModal);

showProducts();
