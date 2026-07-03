function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Ir para o início">
        <svg className="brand-logo" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="6" y="6" width="52" height="52" rx="14" fill="currentColor" />
          <path
            d="M21 20h22v8H29v6h12v8H21z"
            fill="#0a0a0a"
          />
        </svg>
        <span>Erick Sousa</span>
      </a>

      <nav className="nav-links" aria-label="Navegação principal">
        <a href="#about">Sobre</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projetos</a>
        <a href="#contact">Contato</a>
      </nav>
    </header>
  );
}

export default Header;
