document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    const toggleButton = document.getElementById("toggleView");

    toggleButton.addEventListener('click', () => {
        directory.classList.toggle('list-view');
    });

    getMembers();
});


async function getMembers() {
    const response = await fetch('scripts/members.json');
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    const directory = document.getElementById("directory");
    directory.innerHTML = '';

    members.forEach(member => {
        let card = document.createElement("section");
        card.classList.add("card");

        let img = document.createElement("img");
        img.src = `images/${member.image}`;
        img.alt = `${member.name} Logo`;
        img.onerror = () => img.src = "images/default.jpg";

        let name = document.createElement("h2");
        name.textContent = member.name;

        let address = document.createElement("p");
        address.textContent = `📍 ${member.address}`;

        let phone = document.createElement("p")
        phone.textContent = `📞 ${member.phone}`;

        let website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        directory.appendChild(card);
    });
}


document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

