import { SVGProps } from 'react';

const ExtemLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 600 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" {...props}>
    <path d="M90.7 50H30v100h60.7V50z" fill="#006DAB" />
    <path d="M120.7 50L150 80l30-30h-59.3z" fill="#00AEEF" />
    <path d="M180 50h59.4l-15 25.5c-10-10-21.2-15-33.7-15v90H150V80c15 0 22.5 5 22.5 15l15-25.5L180 50z" fill="#006DAB" />
    <path d="M250 50h60v15h-40v25h35v15h-35v30h40v15h-60V50z" fill="#006DAB" />
    <path d="M380 50h-60v100h20V115h40c16.5 0 30-14.6 30-32.5S396.5 50 380 50zm0 50h-40V65h40c9.7 0 17.5 7.8 17.5 17.5S389.7 100 380 100z" fill="#006DAB" />
    <path d="M445 50h-25v100h25l50-67.5V150h20V50h-20l-50 65V50z" fill="#006DAB" />
    <path d="M90 160H50l10-10H30l20 20h40l-10-10h30l-20-20H50l20 20z" fill="#00AEEF" />
    <path d="M70 185 L548 185" stroke="#006DAB" strokeWidth="1" />
    <path d="M85 178 L534 178" stroke="#006DAB" strokeWidth="0.5" />
    <text x="150" y="195" fontSize="14" fontWeight="400" fill="#006DAB" fontFamily="'Arial', sans-serif">Life Education For Everyone</text>
  </svg>
);

export default ExtemLogo;
