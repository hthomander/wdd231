document.addEventListener('DOMContentLoaded', function () {
const yearSpan = document.getElementById('year');
const lastModified = document.getElementById('lastModified');
const menuToggle = document.querySelector('.hamburger');
const menu = document.querySelector('nav ul');
const resourcesList = document.getElementById('resourcesList');
const featuredResource = document.getElementById('featuredResource');
const form = document.getElementById('newsletter');
const modal = document.getElementById('modal');
const closemodal = document.getElementById('close-modal');





yearSpan.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");
    });
    

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (modal) {
        showModal();

        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = '';
        }
        }
    });
}


if (closemodal && modal) {
    closemodal.addEventListener('click', () => {
        if (modal) {
        modal.classList.add('hidden');
        }
    });
}

function showModal() {
    if (modal) {
    modal.classList.remove('hidden');
    }
}


    fetch('data/resources.json')
    .then(response => response.json())
    .then(data => {

       
        if (resourcesList) {
        data.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.classList.add('resource-card');

            const image = document.createElement('img');
            image.src = resource.image;
            image.alt = resource.title;
            resourceCard.appendChild(image);

            const title = document.createElement('h4');
            title.textContent = resource.title;
            resourceCard.appendChild(title);

            const description = document.createElement('p');
            description.textContent = resource.description;
            resourceCard.appendChild(description);

            const link = document.createElement('a');
            link.href = resource.link;
            link.textContent = 'Learn More';
            resourceCard.appendChild(link);

            resourcesList.appendChild(resourceCard);
    
        });
    }

    if (featuredResource) {
        let index = 0;
        const showResource = (index) => {
            const resource = data[index];
            const resourceCard = document.createElement('div');
            resourceCard.classList.add('resource-card', 'highlighted');

        const image = document.createElement('img');
        image.src = resource.image;
        image.alt = resource.title;
        resourceCard.appendChild(image);

        const title = document.createElement('h4');
        title.textContent = resource.title;
        resourceCard.appendChild(title);

        const description = document.createElement('p');
        description.textContent = resource.description;
        resourceCard.appendChild(description);

        const link = document.createElement('a');
        link.href = resource.link;
        link.textContent = 'Learn More';
        resourceCard.appendChild(link);

        const existingCards = featuredResource.querySelectorAll('.resource-card');
        existingCards.forEach(card => card.remove());

        featuredResource.appendChild(resourceCard);
    };
        showResource(index);


    
        setInterval(() => {
            index = (index + 1) % data.length;
            showResource(index)
        }, 10000);
    }
    })
    
});