export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string;
  longDescription: string;
  challenge: string;
  solution: string;
  highlights: string[];
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: 'Oficina-System',
    title: 'Oficina System',
    description: 'Sistema ERP desenvolvido para gestão de distribuidoras de peças automotivas.',
    stack: 'Java / Spring Boot / React / PostgreSQL',
    longDescription:
      'Sistema ERP em desenvolvimento para gestão de distribuidoras de peças automotivas. Desenvolvido com Java, Spring Boot, React com TypeScript e PostgreSQL, utiliza autenticação JWT, Spring Security, JPA/Hibernate, Docker e Swagger. O projeto foi estruturado seguindo arquitetura em camadas, Clean Code e boas práticas para garantir segurança, organização e facilidade de evolução',
    challenge:
      'Controlar o ciclo completo de uma distribuidora, desde o cadastro de produtos até a movimentação do estoque.',
    solution:
      'Criei uma plataforma Full Stack com autenticação, controle de permissões e gerenciamento integrado de estoque, compras e vendas.',
    highlights: [
      'Autenticação e autorização para acesso controlado.',
      'Estrutura organizada para futuras integrações e expansão.',
      'Documentação de rotas para uso por time e clientes.',
    ],
    technologies: ['Java', 'Spring Boot', 'JPA/Hibernate', 'JWT', 'TypeScript', 'React', 'PostgreSQL', 'Swagger', 'Docker'],
  },
  {
    id: 'portfolio',
    title: 'Portfolio pessoal',
    description: 'Site moderno e responsivo para apresentar minhas habilidades, projetos e contatos.',
    stack: 'React / TypeScript / Vite',
    longDescription:
      'Este portfolio foi criado para destacar minha trajetória, compartilhar meus projetos e oferecer uma experiência visual limpa e profissional.',
    challenge:
      'Criar uma interface atrativa, responsiva e com navegação simples para apresentar conteúdo de forma elegante.',
    solution:
      'Estruturei o projeto com React e TypeScript, dividi o conteúdo em seções claras e incluí navegação para detalhes de cada projeto.',
    highlights: [
      'Layout responsivo para desktop e mobile.',
      'Seções bem organizadas para apresentação profissional.',
      'Navegação interna para explorar projetos com mais profundidade.',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'React Router'],
  },
];