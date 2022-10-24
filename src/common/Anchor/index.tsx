import { AnchorHTMLAttributes, FC, ReactNode } from "react";

type TLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  value: string;
  children: ReactNode;
  className: string;
};

export const Link: FC<TLink> = ({ value, children, className }) => {
  if (value === "") {
    return <span className={className}>{children}</span>;
  }

  return (
    <a href={value} className={className} target="_blank">
      {children}
    </a>
  );
};
