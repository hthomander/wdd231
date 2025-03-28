document.addEventListener("DOMContentLoaded", () => {
    const modalLinks = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll("[data-close]");

    modalLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const modalId = event.target.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            document.getElementById(modalId);
            if (modal) {
                modal.classList.add("show-modal");
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", event => {
            const modalId = event.target.getAttribute("data-close");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove("show-modal");
            }
        });
    });

    window.addEventListener("click", event => {
        document.querySelectorAll(".modal").forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove("show-modal");
            }
        });
    });



    const form = document.querySelector("form");
    const timestampInput = document.getElementById("timestamp");
    if (form && timestampInput) {
    form.addEventListener("submit", () => {
        const now = new Date();
        const formattedTimestamp = now.toLocaleString();
        timestampInput.value = formattedTimestamp;
    });
}

if (document.getElementById("firstName")) {
        const params = new URLSearchParams(window.location.search);
        document.getElementById("firstName").textContent = params.get("firstName") || "N/A";
        document.getElementById("lastName").textContent = params.get("lastName") || "N/A";
        document.getElementById("email").textContent = params.get("email") || "N/A";
        document.getElementById("phone").textContent = params.get("phone") || "N/A";
        document.getElementById("businessName").textContent = params.get("businessName") || "N/A";
        document.getElementById("timestamp").textContent = params.get("timestamp") || "N/A";
}

const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}
});
      