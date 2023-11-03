import Image from 'next/image';
import Highlighter, { HighlighterItem } from './highlighter';
import { IconMessageDots } from '@tabler/icons-react';

import FeatureImg01 from '@/public/images/feature-image-01.png';
import FeatureImg02 from '@/public/images/feature-image-02.png';
import FeatureImg03 from '@/public/images/feature-image-03.png';

export default function Examples() {
  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Highlighted boxes */}
        <div className="relative pb-12 md:pb-20">
          {/* Blurred shape */}
          <div
            className="absolute bottom-0 -mb-20 left-1/2 -translate-x-1/2 blur-2xl opacity-50 pointer-events-none"
            aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
              <defs>
                <linearGradient id="bs2-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                fill="url(#bs2-a)"
                fillRule="evenodd"
                d="m346 898 461 369-284 58z"
                transform="translate(-346 -898)"
              />
            </svg>
          </div>

          {/* Grid */}
          <Highlighter className="grid md:grid-cols-12 gap-6 group">
            {/* Box #1 */}
            <div className="md:col-span-12" data-aos="fade-down">
              <HighlighterItem>
                <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* Blurred shape */}
                    <div className="absolute right-0 top-0 blur-2xl" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="342" height="393">
                        <defs>
                          <linearGradient id="bs-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#bs-a)"
                          fillRule="evenodd"
                          d="m104 .827 461 369-284 58z"
                          transform="translate(0 -112.827)"
                          opacity=".7"
                        />
                      </svg>
                    </div>
                    {/* Radial gradient */}
                    <div
                      className="absolute flex items-center justify-center bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 h-full aspect-square"
                      aria-hidden="true">
                      <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-70" />
                      <div className="absolute w-1/4 h-1/4 translate-z-0 bg-purple-400 rounded-full blur-[40px]" />
                    </div>
                    {/* Text */}
                    <div className="md:max-w-[480px] shrink-0 order-1 md:order-none p-6">
                      <div className="mb-5">
                        <div>
                          <h3 className="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">
                            Try Confidential AI
                          </h3>
                          <p className="text-slate-400">
                            Talk to an confidential AI assistant in your browser. All exchanges are totally private.
                          </p>
                        </div>
                      </div>
                      {/* Button */}
                      <div>
                        <a
                          className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
                          href="#0">
                          <span className="relative inline-flex items-center">
                            Try now{' '}
                            <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                              -&gt;
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                    {/* Icon */}
                    {/* <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end pr-12">
                      <IconMessageDots className="w-12 h-12" />
                    </div> */}
                  </div>
                </div>
              </HighlighterItem>
            </div>
            {/* Box #2 */}
            <div className="md:col-span-7" data-aos="fade-down">
              <HighlighterItem>
                <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                  <div className="flex flex-col">
                    {/* Radial gradient */}
                    <div
                      className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                      aria-hidden="true">
                      <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]" />
                    </div>
                    {/* Text */}
                    <div className="md:max-w-[480px] shrink-0 order-1 md:order-none p-6">
                      <div>
                        <h3 className="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">
                          Strong proof for our strong claims.
                        </h3>
                        <div className="flex flex-col gap-6">
                          <p className="text-slate-400">
                            Blyss uses new hardware features of the NVIDIA Hopper GPU and the AMD Genoa CPU to establish
                            high-security trusted computing environments. Every connection to a Blyss model comes with a
                            cryptographically signed statement that attests exactly what code is running, and on what
                            hardware.
                          </p>
                          {/* <p className="text-slate-400">
                            It is impossible for Blyss (or any impersonator) to change anything about how requests are
                            handled without user consent.
                          </p> */}
                          {/* Button */}
                          <div>
                            <a
                              className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
                              href="#0">
                              <span className="relative inline-flex items-center">
                                Security deep dive{' '}
                                <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                                  -&gt;
                                </span>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </HighlighterItem>
            </div>
            {/* Box #3 */}
            <div className="md:col-span-5" data-aos="fade-down">
              <HighlighterItem>
                <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                  <div className="flex flex-col">
                    {/* Radial gradient */}
                    <div
                      className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                      aria-hidden="true">
                      <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]" />
                    </div>
                    {/* Text */}
                    <div className="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 ">
                      <div>
                        <h3 className="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">
                          Continuous Public Verification
                        </h3>
                        <p className="text-slate-400">
                          Every Blyss attestation is committed to an immutable public log. Anyone can inspect the log to
                          confirm that the confidentiality guarantee is currently intact, and was never previously
                          broken.
                        </p>
                      </div>
                    </div>
                    {/* Image */}
                    <div className="relative w-full h-64 md:h-auto overflow-hidden md:pb-8">
                      <Image
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 mx-auto max-w-none md:max-w-full md:relative md:left-0 md:translate-x-0"
                        src={FeatureImg03}
                        width={230}
                        height={230}
                        alt="Feature 03"
                      />
                    </div>
                  </div>
                </div>
              </HighlighterItem>
            </div>
          </Highlighter>
        </div>
      </div>
    </section>
  );
}
