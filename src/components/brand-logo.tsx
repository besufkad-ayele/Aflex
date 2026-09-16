import Image from "next/image";

const LOGO_SRC = "/images/aflex-logo.png";

type BrandLogoProps = {
  variant?: "full" | "compact";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ variant = "full", className = "", priority = false }: BrandLogoProps) {
  const isCompact = variant === "compact";

  return (
    <span className={`brand-logo ${isCompact ? "brand-logo-compact" : "brand-logo-full"} ${className}`.trim()}>
      <Image
        src={LOGO_SRC}
        alt="AFLEX Academy — Leaders Worth Africa"
        width={isCompact ? 140 : 220}
        height={isCompact ? 40 : 56}
        priority={priority}
        className="brand-logo-img"
      />
    </span>
  );
}
