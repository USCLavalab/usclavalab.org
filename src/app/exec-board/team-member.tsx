import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    cohort: string;
    image: StaticImageData;
    url: string;
  };
}

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <Link
      href={member.url}
      className="group flex items-center overflow-hidden border bg-neutral-900 transition hover:scale-[1.02]"
    >
      <div className="relative h-full min-h-20 w-20 flex-shrink-0">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          className="object-cover grayscale transition group-hover:grayscale-0"
        />
      </div>
      <div className="p-4 text-left">
        <p className="text-sm">{member.name}</p>
        <p className="text-sm text-gray-400">
          {member.role}, {member.cohort}
        </p>
      </div>
    </Link>
  );
}
