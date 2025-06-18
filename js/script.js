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

// Dark Mode Toggle
const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggle.textContent = document.body.classList.contains("dark-mode") 
    ? "☀️ Light Mode" 
    : "🌙 Dark Mode";
});
