const toggleButton = document.getElementById('mobile-toggle');
const navLinksContainer = document.querySelector('header nav ul');

toggleButton.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
})