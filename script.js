function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            showSection(e.target.getAttribute('href').substring(1));
        }
    });
});