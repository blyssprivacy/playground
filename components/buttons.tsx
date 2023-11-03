import Link from 'next/link';

export function GrayOutlineGradient({
  buttonText,
  linkTarget,
  arrow
}: {
  buttonText: string;
  linkTarget: string;
  arrow: boolean;
}) {
  return (
    <Link
      className="btn text-slate-300 hover:text-white transition duration-150 ease-in-out w-auto group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
      href={linkTarget}>
      <span className="relative inline-flex items-center flex-shrink-0 whitespace-nowrap">
        {buttonText}{' '}
        {arrow && (
          <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1 flex-shrink-0 whitespace-nowrap">
            -&gt;
          </span>
        )}
      </span>
    </Link>
  );
}

export const CTACall = ({ buttonText = 'Learn more on a call' }: { buttonText?: string }) => {
  return (
    <a
      className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-auto transition duration-150 ease-in-out group"
      href="https://calendar.app.google/n1zVWeURhzx21DJH6">
      <span className="relative inline-flex items-center flex-shrink-0 whitespace-nowrap">{buttonText}</span>
      <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1 flex-shrink-0 whitespace-nowrap">
        -&gt;
      </span>
    </a>
  );
};
