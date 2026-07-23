import { type CSSProperties } from 'react';
import { motion, type Variants } from 'framer-motion';
import { skills } from '../../data/skills';
import type { SkillCategory } from '../../types';

const skillCards: Array<{
  category: SkillCategory;
  title: string;
  subtitle: string;
  className: string;
  floatClass: string;
}> = [
  {
    category: 'backend',
    title: 'Backend',
    subtitle: 'APIs, Arquitetura e Segurança',
    className: 'skills-card--backend',
    floatClass: 'skills-card--float-slow',
  },
  {
    category: 'frontend',
    title: 'Front-end',
    subtitle: 'Interfaces modernas',
    className: 'skills-card--frontend',
    floatClass: 'skills-card--float-medium',
  },
  {
    category: 'database',
    title: 'Banco de Dados',
    subtitle: 'Persistência de dados',
    className: 'skills-card--database',
    floatClass: 'skills-card--float-fast',
  },
  {
    category: 'tools',
    title: 'Ferramentas',
    subtitle: 'Produtividade e DevOps',
    className: 'skills-card--tools',
    floatClass: 'skills-card--float-soft',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 95,
      damping: 18,
      mass: 0.72,
    },
  },
};

function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="section-heading">
        <p className="section-label">Tecnologias</p>
        <h2 className="skills-title">Skills & Ferramentas</h2>
      </div>

      <motion.div
        className="skills-masonry"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
      >
        {skillCards.map((card) => {
          const filteredSkills = skills.filter((skill) => skill.category === card.category);

          if (filteredSkills.length === 0) return null;

          return (
            <motion.article
              key={card.category}
              className={`skills-card ${card.className} ${card.floatClass}`}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              style={{ '--skill-count': filteredSkills.length } as CSSProperties}
            >
              <div className="skills-card__header">
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                </div>
              </div>

              <div className="skills-chip-grid">
                {filteredSkills.map((skill, chipIndex) => {
                  const Icon = skill.icon;

                  return (
                    <motion.span
                      className="skill-chip"
                      key={skill.name}
                      title={skill.name}
                      whileHover={{ y: -3, scale: 1.045 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                      style={{ '--chip-index': chipIndex } as CSSProperties}
                    >
                      <Icon className="skill-chip__icon" color={skill.color} aria-hidden="true" />
                      <span>{skill.name}</span>
                    </motion.span>
                  );
                })}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

export default Skills;
