import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '@/public/images/logo.svg'

export default function Logo() {
  return (
    <Link className="block" href="/" aria-label="Cruip">
      <Image src={LogoImg} width={38} height={38} priority alt="Stellar" />
    </Link>
  )
}