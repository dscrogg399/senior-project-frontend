import Link from "next/link";

export default function HivelyLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-hBlue-500 hover:text-hPurple-500 active:text-hPurple-300 ${className}`}
    >
      {children}
    </Link>
  );
}
