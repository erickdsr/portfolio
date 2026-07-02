import { FaJava, FaGitAlt } from 'react-icons/fa';
import {
  SiSpringboot,
  SiSpringsecurity,
  SiPostgresql,
  SiMysql,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiSwagger,
  SiDocker,
  SiGithub,
} from 'react-icons/si';
import type { Skill } from '../types';

export const skills: Skill[] = [

  { name: 'Java', icon: FaJava, category: 'backend' },
  { name: 'Spring Boot', icon: SiSpringboot, category: 'backend' },
  { name: 'Spring Security', icon: SiSpringsecurity, category: 'backend' },
  { name: 'Swagger / OpenAPI', icon: SiSwagger, category: 'backend' },

  { name: 'PostgreSQL', icon: SiPostgresql, category: 'database' },
  { name: 'MySQL', icon: SiMysql, category: 'database' },

  { name: 'React', icon: SiReact, category: 'frontend' },
  { name: 'TypeScript', icon: SiTypescript, category: 'frontend' },
  { name: 'JavaScript', icon: SiJavascript, category: 'frontend' },
  { name: 'HTML5', icon: SiHtml5, category: 'frontend' },
  { name: 'CSS3', icon: SiCss, category: 'frontend' },

  { name: 'Git', icon: FaGitAlt, category: 'tools' },
  { name: 'GitHub', icon: SiGithub, category: 'tools' },
  { name: 'Docker', icon: SiDocker, category: 'tools' },
];