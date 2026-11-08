import Image from "next/image";

export const AFLEX_LOGO_SRC = "/images/aflex-logo.png";

type BrandLogoProps = {
  variant?: "full" | "compact";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ variant = "full", className = "", priority = false }: BrandLogoProps) {
  const isCompact = variant === "compact";
  const size = isCompact ? 48 : 160;

  return (
    <span className={`brand-logo ${isCompact ? "brand-logo-compact" : "brand-logo-full"} ${className}`.trim()}>
      <Image
        src={AFLEX_LOGO_SRC}
        alt="African Leadership Excellence Academy — AFLEX"
        width={size}
        height={size}
        priority={priority}
        className="brand-logo-img"
        style={{ width: "auto", height: "auto" }}
      />
    </span>
  );
}
