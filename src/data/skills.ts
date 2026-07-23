import { FaJava } from 'react-icons/fa';
import {
  SiCss,
  SiDocker,
  SiGit,
  SiGithub,
  SiHibernate,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiReact,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import type { Skill } from '../types';

export const skills: Skill[] = [

  { name: 'Java', icon: FaJava, category: 'backend', color: '#38BDF8' },
  { name: 'Spring Boot', icon: SiSpringboot, category: 'backend', color: '#6DB33F' },
  { name: 'Spring MVC', icon: SiSpring, category: 'backend', color: '#6DB33F' },
  { name: 'Spring Security', icon: SiSpringsecurity, category: 'backend', color: '#6DB33F' },
  { name: 'Hibernate', icon: SiHibernate, category: 'backend', color: '#BCAE79' },

  { name: 'PostgreSQL', icon: SiPostgresql, category: 'database', color: '#336791' },
  { name: 'MySQL', icon: SiMysql, category: 'database', color: '#4479A1' },

  { name: 'React', icon: SiReact, category: 'frontend', color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, category: 'frontend', color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, category: 'frontend', color: '#F7DF1E' },
  { name: 'HTML5', icon: SiHtml5, category: 'frontend', color: '#E34F26' },
  { name: 'CSS3', icon: SiCss, category: 'frontend', color: '#1572B6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'frontend', color: '#38BDF8' },

  { name: 'Git', icon: SiGit, category: 'tools', color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, category: 'tools', color: '#e5e7eb' },
  { name: 'Docker', icon: SiDocker, category: 'tools', color: '#2496ED' },
  { name: 'Swagger / OpenAPI', icon: SiSwagger, category: 'tools', color: '#6BA539' },
  { name: 'Vite', icon: SiVite, category: 'tools', color: '#A78BFA' },
];
