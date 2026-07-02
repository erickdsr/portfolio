function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Ir para o início">
        Erick Sousa
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
