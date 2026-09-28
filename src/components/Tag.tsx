import type { Icon } from "@phosphor-icons/react";

export default function Tag({
  label,
  icon: TagIcon,
}: {
  label: string;
  icon?: Icon;
}) {
  return (
    <li className="tag">
      {TagIcon && <TagIcon weight="light" className="ph-light" />}
      {label}
    </li>
  );
}
