import { useEffect, useRef, useState } from "react";

export default function RoleCardHeader({ roleName }: { roleName: string }) {
  const roleBtnRef = useRef<HTMLDivElement>(null);
  const roleNameRef = useRef<HTMLHeadingElement>(null);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    setMarginLeft(
      (roleBtnRef.current?.clientWidth ?? 0) * 0.5 -
        (roleNameRef.current?.clientHeight ?? 0) * 0.5,
    );
  }, []);

  return (
    <div
      className="h-full w-14 cursor-pointer border-r-2 border-r-neutral-700/50 sm:w-20"
      ref={roleBtnRef}
    >
      <div
        className="absolute left-0 h-6"
        style={{
          bottom: `0`,
          marginLeft: `${marginLeft}px`,
        }}
      >
        <h3
          ref={roleNameRef}
          className="origin-top-left -rotate-90 text-xl select-none"
        >
          {roleName}
        </h3>
      </div>
    </div>
  );
}
