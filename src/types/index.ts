import type { IconType } from 'react-icons';

export type SkillCategory = 'backend' | 'frontend' | 'database' | 'tools';

export interface Skill {
  name: string;
  icon: IconType;
  category: SkillCategory;
  color?: string;
}
