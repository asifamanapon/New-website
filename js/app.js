const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    //display 10 phones
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    //display no phone found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    
        
    }
    else {
        noPhone.classList.add('d-none');
    }

    //display all phones
    phones.forEach(phone => {
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
        <div class="card p-5 ">
        <img src="${phone.image}" class="card-img-top" alt="...">
         <div class="card-body">
         <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
         content. This content is a little bit longer.</p>
         </div>
         </div>
         <button onclick="loadPhoneDetails('${phone.slug}')" herf="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
         
        `;
        phonesContainer.appendChild(phonesDiv);
    })
    //stop loader
    toggleSpiner(false);
}

const processSearch = (dataLimit) => {
    toggleSpiner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

//handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    //strat loader
    processSearch(10);
})

//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    console.log(e.key);
    if (e.key === 'Enter') {
        //code for enter
        processSearch(10);
    }
})

const toggleSpiner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
//load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const PhoneDetails = document.getElementById('phone-details');
    PhoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found, please try other'}</p>
    <p>Chipset: ${phone.mainFeatures.chipSet}</p>
    <p>Bluetooth: ${phone.others.Bluetooth}</p>
    <p>Display: ${phone.mainFeatures.displaySize}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Sensors: ${phone.mainFeatures.sensors}</p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    `
}


loadPhones('apple');
