import type { Skill } from '../../types';

function Badge({ name, icon: Icon, color }: Skill) {
  return (
    <div className="badge">
      <Icon size={22} color={color} />
      <span>{name}</span>
    </div>
  );
}

export default Badge;