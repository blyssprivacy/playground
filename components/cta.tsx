import { CTACall, GrayOutlineGradient } from './buttons';

export default function Cta() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative px-8 py-12 md:py-20 rounded-[3rem] overflow-hidden">
          {/* Blurred shape */}
          <div
            className="absolute bottom-0 translate-y-1/2 left-0 blur-2xl opacity-50 pointer-events-none -z-10"
            aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
              <defs>
                <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path fill="url(#bs5-a)" fillRule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)" />
            </svg>
          </div>
          {/* Content */}
          <div className="flex flex-col items-center max-w-3xl text-center mx-auto">
            <div>
              <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">
                Confidential AI
              </div>
            </div>
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              Take back control of your data
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-lg">
              Ship AI features faster and with less risk. Get on a call with a Blyss founder and we'll show you how much
              simpler and safer Confidential AI can be.
            </p>
            <div className="flex w-auto gap-4 justify-around">
              <CTACall />
              <GrayOutlineGradient buttonText="Try now" linkTarget="/signup" arrow={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
