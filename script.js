
const players = [
  "Evan Nunes", "Luca Bufolo", "Jules Greco", "Antoine Morel", "Julien Morel",
  "Rudy Revida", "Maxime Trillot", "Julien Elkaim", "Lucas Da Silva", "Michael Szulman",
  "Thomas Boutillier", "Louis Gabriel Gruber", "Antonin Demaria", "Colin Abgrall",
  "Jonas Gonzalez", "Kévin Spreux", "Lucas Danes", "Samir Msaoubi", "Tom Chausse",
  "Mathieu Philippe", "Paul-Alexandre Oyabiki", "Bruno Guedes", "Théo Boursier"
];

document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll("select");
  selects.forEach(select => {
    players.forEach(player => {
      const option = document.createElement("option");
      option.value = player;
      option.textContent = player;
      select.appendChild(option);
    });
  });

  document.getElementById("voteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const values = Array.from(formData.values()).slice(3);
    const uniqueValues = new Set(values);
    if (uniqueValues.size !== values.length) {
      document.getElementById("statusMsg").textContent = "Erreur : chaque joueur doit être unique dans le 11.";
      return;
    }

    const response = await fetch("https://script.google.com/macros/s/AKfycbzD8aOcvxh5y60MeH37FmCEO8GxhWZvswWCXaAu4JSFeEBVISzU7sZ6J2uR5xbWnbk2/exec", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      document.getElementById("statusMsg").textContent = "✅ Merci, ton vote a été enregistré !";
      form.reset();
    } else {
      document.getElementById("statusMsg").textContent = "❌ Une erreur est survenue lors de l'envoi.";
    }
  });
});
