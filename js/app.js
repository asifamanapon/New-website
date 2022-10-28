const loadPhones = async() => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
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
        `;
        phonesContainer.appendChild(phonesDiv);
    })
}
loadPhones();
