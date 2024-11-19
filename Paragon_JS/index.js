let produkty = [
    {nazwa: "Masło", ilość: 2, cena: 8},
    {nazwa: "Jajka", ilość: 1, cena: 10},
    {nazwa: "Woda", ilość: 1, cena: 3}
];
//  Wyświetlenie produktów
function showProducts() {
    const tbody = document.getElementById("paragon_tbody");
    let sumaParagonu = 0;

    tbody.innerHTML = "";

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
            <td><button class="remove-btn" onclick="openRemoveModal(${index})">X</button></td>
            <td><button id="edit-btn" onclick="openEditModal(${index})">Edytuj</button></td>
        `;

        tbody.appendChild(tr);
    });

    
    document.getElementById("sumaParagonu").textContent = `${sumaParagonu} zł`;
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
        produkty.push({nazwa, ilość, cena});
        
        nazwaForm.value = '';
        iloscForm.value = '';
        cenaForm.value = '';

        showProducts();
    } else {
        alert("Wszystkie pola muszą być wypełnione poprawnie.");
    }
}

// Usuwanie produktów
let productToRemoveIndex = null;

function openRemoveModal(index){
    productToRemoveIndex = index;
    document.getElementById("removeProductModal").style.display = "block";
}

function closeRemoveModal(){
    document.getElementById("removeProductModal").style.display = "none"
}

function removeProduct(){
    if (productToRemoveIndex !== null) {
        produkty.splice(productToRemoveIndex, 1);
        showProducts();
        closeRemoveModal();
    }
}

// Edycja produktów
let productToEditIndex = null;

function openEditModal(index){
    productToEditIndex = index;
    const produkt = produkty[index];

    document.getElementById("edit-nazwa-form").value = produkt.nazwa;
    document.getElementById("edit-ilosc-form").value = produkt.ilość;
    document.getElementById("edit-cena-form").value = produkt.cena;

    document.getElementById("EditProductModal").style.display = "block";
}

function closeEditModal(){
    document.getElementById("EditProductModal").style.display = "none"

}

function editProduct(event){
    event.preventDefault();

    const nazwa = document.getElementById("edit-nazwa-form").value;
    const ilość = document.getElementById("edit-ilosc-form").value;
    const cena = document.getElementById("edit-cena-form").value;

    if(nazwa && ilość > 0 && cena > 0){
        produkty[productToEditIndex] = {nazwa, ilość, cena};

        closeEditModal();
        showProducts();
    }else{
        alert("Wszystkie pola muszą być wypełnione poprawnie!");
    }
}

// Modale do dodawania produktów
function openModal(){
    document.getElementById("newProductModal").style.display = "block";
}
function closeModal(){
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
