import {
  AtomIcon,
  BrainIcon,
  FileCSharpIcon,
  FilePyIcon,
  FileRsIcon,
  FileTsxIcon,
  ShippingContainerIcon,
  type Icon,
} from "@phosphor-icons/react";

/** Keys as used in project frontmatter and cv.json. No icon: the tag shows the label alone. */
export const TECH: Record<string, { label: string; icon?: Icon }> = {
  csharp: { label: "C#", icon: FileCSharpIcon },
  react: { label: "React", icon: AtomIcon },
  typescript: { label: "TypeScript", icon: FileTsxIcon },
  rust: { label: "Rust", icon: FileRsIcon },
  docker: { label: "Docker", icon: ShippingContainerIcon },
  "machine-learning": { label: "Machine learning", icon: BrainIcon },
  python: { label: "Python", icon: FilePyIcon },
  "f#": { label: "F#" },
  scala: { label: "Scala" },
};

export function techLabel(key: string): string {
  return TECH[key]?.label ?? key;
}
