const directory = document.querySelector('#directory');
const toggleButton = document.querySelector('#toggleView');

async function getMembers() {
    const response = await fetch('scripts/member.json');
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    directory.innerHTML = '';
    members.forEach(member => {
        let card = document.createElement('section');
        card.classList.add('card');

        let img = document.createElement('img');
        img.src = `images/${member.image}`;
        img.alt = `${member.name} Logo`;

        let name = document.createElement('h2');
        name.textContent = member.name;

        let address = document.createElement('p');
        address.textContent = `📍 ${member.address}`;

        let phone = document.createElement('p');
        phone.textContent = `📞 ${member.phone}`;

        let website = document.createElement('a');
        website.href = member.website;
        website.textContent = 'Visit Website';
        website.target = "_blank";

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        directory.appendChild(card);
    });
}

toggleButton.addEventListener('click', () => {
    directory.classList.toggle('list-view');
});

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

getMembers();