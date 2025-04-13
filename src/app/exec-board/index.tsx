import members from "./members";
import TeamMember from "./team-member";

export default function ExecBoard() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {members.map((member, index) => (
          <TeamMember key={index} member={member} />
        ))}
      </div>
    </div>
  );
}
