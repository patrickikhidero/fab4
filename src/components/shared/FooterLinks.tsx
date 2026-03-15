import React from "react";

type FooterLinksProps = {
  className?: string;
};

export function FooterLinks({ className }: FooterLinksProps) {
  return (
    <div
      className={
        className ??
        "mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[rgba(39,38,53,0.5)] lg:justify-end"
      }
    >
      <span>Terms</span>
      <span>Legal</span>
      <span>Privacy policy</span>
      <span>Cookie policy</span>
    </div>
  );
}
