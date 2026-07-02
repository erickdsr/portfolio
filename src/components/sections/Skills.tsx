import { skills } from "../../data/Skills";
import Badge from '../ui/Badge';
import type { SkillCategory } from '../../types';

const categoryLabels: Record<SkillCategory, string> = {
  backend: 'Back-End',
  database: 'Banco de Dados',
  frontend: 'Front-End',
  tools: 'Ferramentas',
};

const categoryOrder: SkillCategory[] = ['backend', 'database', 'frontend', 'tools'];

function Skills() {
  return (
    <section id="skills" className="skills">
      <h2>Skills</h2>

      {categoryOrder.map((category) => {
        const filteredSkills = skills.filter((skill) => skill.category === category);

        if (filteredSkills.length === 0) return null;

        return (
          <div key={category} className="skills-group">
            <h3>{categoryLabels[category]}</h3>
            <div className="skills-grid">
              {filteredSkills.map((skill) => (
                <Badge key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Skills;
