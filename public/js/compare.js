document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("compare-menu");
    const slots = document.querySelectorAll(".compare-slot");
    
    let activeSlot = null;

    document.getElementById("compare-open-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.add("show");
    });

    document.getElementById("compare-close-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.remove("show");
        slots.forEach(s => s.classList.remove("selecting"));
        activeSlot = null;
    });

    slots.forEach(slot => {
        slot.addEventListener("click", () => {
            slots.forEach(s => s.classList.remove("selecting"));
            activeSlot = slot;
            slot.classList.add("selecting");
        });
    });

    document.querySelectorAll(".game-items").forEach(card => {
        card.addEventListener("click", (e) => {
            if (!activeSlot) return;
            
            e.preventDefault();

            const gameId = card.id.replace("game-item", "");
            const imgSrc = card.querySelector("img").src;
            const title = card.querySelector("em").textContent.trim();

            activeSlot.innerHTML = `<img src="${imgSrc}" alt="${title}">`;
            
            document.getElementById(activeSlot.id === "slot-1" ? "input-slot-1" : "input-slot-2").value = gameId;

            activeSlot.classList.remove("selecting");
            activeSlot = null;
        });
    });
});