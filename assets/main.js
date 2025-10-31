// Theme toggle: persists with localStorage, default = dark
(function () {
  const doc = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const sun = document.getElementById('sun');
  const moon = document.getElementById('moon');

  function applyTheme(theme) {
    if (theme === 'dark') {
      doc.classList.add('dark');
      sun.classList.remove('hidden');
      moon.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      doc.classList.remove('dark');
      sun.classList.add('hidden');
      moon.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  }

  // init
  const saved = localStorage.getItem('theme');
  if (saved) applyTheme(saved);
  else applyTheme('dark'); // default

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  });

  // mobile nav toggle
  const mobileBtn = document.getElementById('mobileBtn');
  const mobileNav = document.getElementById('mobileNav');
  mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    mobileNav.classList.toggle('show');
  });

  // simple contact handler (non-blocking, demo)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    // Basic client side validation (already required)
    alert('Thanks, ' + (data.get('name') || '') + '! I received your message. (Demo alert)');
    form.reset();
  });
})();
