const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Adaptação para mobile - Remove transições problemáticas
function isMobile() {
  return window.innerWidth <= 768;
}

registerBtn.addEventListener('click', () => {
  if (isMobile()) {
    document.querySelector('.sign-in').style.display = 'none';
    document.querySelector('.sign-up').style.display = 'flex';
  } else {
    container.classList.add("active");
  }
});

loginBtn.addEventListener('click', () => {
  if (isMobile()) {
    document.querySelector('.sign-up').style.display = 'none';
    document.querySelector('.sign-in').style.display = 'flex';
  } else {
    container.classList.remove("active");
  }
});

// Foco automático nos inputs (melhora UX em mobile)
document.getElementById('loginEmail')?.focus();

// Evita zoom indesejado em inputs (iOS)
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', () => {
    window.scrollTo(0, 0);
    document.body.style.zoom = "100%";
  });
});

// Validação de formulários (mantenha seu código existente aqui)
// ... (seu código de validação atual)
