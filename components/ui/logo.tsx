import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '@/public/logos/blyss-white.svg';

export default function Logo() {
  return (
    <Link className="block" href="/" aria-label="Blyss">
      <Image src={LogoImg} height={50} priority alt="Blyss" />
    </Link>
  );
}