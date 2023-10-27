import React from "react";

type AvatarProps = {
  name: string;
};

const Avatar = ({ name }: AvatarProps) => {
  return (
    <div className="placeholder avatar">
      <div className="h-8 w-8 rounded-full bg-neutral-focus text-neutral-content ">
        <span className="lg:text-md text-xs">{name.split("")[0]}</span>
      </div>
    </div>
  );
};

export default Avatar;
