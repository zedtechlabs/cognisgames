import { SVGProps } from 'react';

const ZedLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="700" cy="100" r="100" fill="#22c55e" />
    <path d="M0 200H800V400C800 400 400 500 0 400V200Z" fill="#22c55e" />
    <path d="M400 400L0 400L0 600C0 600 400 700 400 600V400Z" fill="#86efac" />
    <path d="M800 800L0 800L0 600C0 600 800 700 800 600V800Z" fill="#22c55e" />
  </svg>
);

export default ZedLogo;
