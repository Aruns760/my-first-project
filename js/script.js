// Change header color on click
const header = document.querySelector('h1');
header.addEventListener('click', () => {
  header.style.color = '#dc2626'; // Red
  setTimeout(() => {
    header.style.color = '#2563eb'; // Revert after 1 sec
  }, 1000);
});
// Current year in footer
document.querySelector('footer').innerHTML += ` 
  <p>© ${new Date().getFullYear()} - Arun</p>`;

<<<<<<< HEAD:js/script.js
// Add version number to force update
const version = "1.0.2"; // ← Change this number after edits
=======
// dark and day mode toggle
const toggle = document.getElementById("darkModeToggle");
>>>>>>> 3348e5c4b5292cab72da325fd2674f38b6b10fbf:script.js

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  // Update button text
  const toggle = document.getElementById("darkModeToggle");
  toggle.textContent = document.body.classList.contains("dark-mode") 
    ? "☀️ Light Mode" 
    : "🌙 Dark Mode";
});
