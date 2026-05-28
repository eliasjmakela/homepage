import {
  BriefcaseIcon,
  FoldersIcon,
  CodeIcon,
  MailboxIcon,
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="row">
      <a
        className="block-main hover-accent footer-link column"
        href="https://linkedin.com/in/eliasjmakela"
      >
        LinkedIn
        <BriefcaseIcon size={32} weight="light" />
      </a>

      <a
        className="block-main hover-accent footer-link column"
        href="https://github.com/eliasjmakela"
      >
        Github
        <FoldersIcon size={32} weight="light" />
      </a>

      <a
        className="block-main hover-accent footer-link column"
        href="https://leetcode.com/u/eliasjmakela/"
      >
        LeetCode
        <CodeIcon size={32} weight="light" />
      </a>

      <a
        className="block-main hover-accent footer-link column"
        href="mailto:hello@eliasmakela.fi"
      >
        Email
        <MailboxIcon size={32} weight="light" />
      </a>
    </footer>
  );
}
