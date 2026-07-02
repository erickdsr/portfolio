import type { Skill } from '../../types';

function Badge({ name, icon: Icon }: Skill) {
  return (
    <div className="badge">
      <Icon size={22} />
      <span>{name}</span>
    </div>
  );
}

export default Badge;