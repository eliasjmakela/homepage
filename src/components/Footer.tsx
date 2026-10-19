import {
  BriefcaseIcon,
  FoldersIcon,
  CodeIcon,
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer>
      <a
        className="block-main hover-accent footer-link footer-contact"
        href="mailto:hello@eliasmakela.fi"
      >
        <span className="footer-contact-text">
          <span>Say hi</span>
          hello@eliasmakela.fi
        </span>
      </a>

      <a
        className="block-main hover-accent footer-link column"
        href="https://github.com/eliasjmakela"
      >
        GitHub
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
        href="https://linkedin.com/in/eliasjmakela"
      >
        LinkedIn
        <BriefcaseIcon size={32} weight="light" />
      </a>
    </footer>
  );
}
