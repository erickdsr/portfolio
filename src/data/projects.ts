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
    title: 'Oficina-System',
    description: 'Back-end com autenticação, regras de negócio e documentação de rotas.',
    stack: 'Java / Spring Boot / PostgreSQL',
    longDescription:
      'API REST para gestão completa de distribuidora de peças automotivas, com autenticação JWT, controle de estoque automatizado e 14 tabelas relacionadas no banco de dados.',
    challenge:
      'Centralizar regras de negócio em um backend confiável, com segurança e rotas bem organizadas.',
    solution:
      'Implementei uma arquitetura modular com Spring Boot, autenticação, tratamento de erros e documentação via Swagger, tornando a API mais segura e fácil de manter.',
    highlights: [
      'Autenticação e autorização para acesso controlado.',
      'Estrutura organizada para futuras integrações e expansão.',
      'Documentação de rotas para uso por time e clientes.',
    ],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Swagger', 'JWT', 'Spring Security', 'JPA/Hibernate', 'Maven'],
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