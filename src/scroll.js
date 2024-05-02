export default eStore;

function eStore() {
  window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const eStore = document.getElementById('eStore');
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
      eStore.classList.add('hidden');
    } else {
      header.classList.remove('scrolled');
      eStore.classList.remove('hidden');
    }
  });
}
