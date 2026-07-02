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

  { name: 'Java', icon: FaJava, category: 'backend', color: '#007396' },
  { name: 'Spring Boot', icon: SiSpringboot, category: 'backend', color: '#6DB33F' },
  { name: 'Spring Security', icon: SiSpringsecurity, category: 'backend', color: '#6DB33F' },
  { name: 'Swagger / OpenAPI', icon: SiSwagger, category: 'backend', color: '#6BA539' },

  { name: 'PostgreSQL', icon: SiPostgresql, category: 'database', color: '#336791' },
  { name: 'MySQL', icon: SiMysql, category: 'database', color: '#00758F' },

  { name: 'React', icon: SiReact, category: 'frontend', color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, category: 'frontend', color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, category: 'frontend', color: '#F7DF1E' },
  { name: 'HTML5', icon: SiHtml5, category: 'frontend', color: '#E34F26' },
  { name: 'CSS3', icon: SiCss, category: 'frontend', color: '#1572B6' },

  { name: 'Git', icon: FaGitAlt, category: 'tools', color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, category: 'tools', color: '#181717' },
  { name: 'Docker', icon: SiDocker, category: 'tools', color: '#2496ED' },
];