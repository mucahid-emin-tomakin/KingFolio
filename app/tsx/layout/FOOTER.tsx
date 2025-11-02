import Link from 'next/link';
import Image from "next/image";
import Signature from "@/public/webp/Signature.webp";
export default function FOOTER() {
  return (
    <footer>
      <div>
        <ul className="footer-list">
          <li>&nbsp;Created By&nbsp;&nbsp;</li>
          <li>
            <Link href="/#home">
              <Image src={Signature.src} alt="Logo" width={0} height={0} sizes="100vw" loading="lazy" />
            </Link>
          </li>
          <li>&nbsp;|&nbsp;&nbsp;</li>
          <li className="far fa-copyright" id="copyright" />
          <li>&nbsp;&nbsp;2021 All rights reserved.&nbsp;</li>
        </ul>
      </div>
    </footer>
  );
}