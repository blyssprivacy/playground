'use client'

import { useState } from 'react'

import Image from 'next/image'
import { Transition } from '@headlessui/react'
import Particles from './particles'
import Illustration from '@/public/images/glow-top.svg'

import { IconBolt, IconLock, IconRefresh } from '@tabler/icons-react';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';
const themeColors = resolveConfig(tailwindConfig)?.theme?.colors ?? {};

export default function Features() {
  const [tab, setTab] = useState<number>(1);

  const blyssC1 = (themeColors.pink as any)['500']; // light
  const blyssC2 = (themeColors.purple as any)['700']; // dark

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Blobs */}
        <div
          className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true">
          <div className="relative w-full h-full">
            <div
              className="absolute w-3/4 h-1/4   blur-2xl opacity-20"
              style={{
                top: '20%',
                left: '20%',
                borderRadius: '50% 50% 46% 54% / 68% 31% 69% 32% ',
                transform: 'rotate(-10deg)',
                backgroundColor: blyssC2,
                background: `radial-gradient(circle at 50% 50%, ${blyssC1}, transparent)`
              }}
            />

            <div
              className="absolute w-96 h-36 blur-2xl opacity-20"
              style={{
                top: '65%',
                left: '15%',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70% ',
                transform: 'rotate(10deg)',
                backgroundColor: blyssC2,
                background: `radial-gradient(circle at 50% 50%, ${blyssC1}, transparent)`
              }}
            />
          </div>
        </div>

        <div className="pt-16 pb-12 ">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto flex flex-col items-center lg:max-w-none lg:flex-row lg:items-end lg:space-x-8 xl:space-x-20 space-y-8 lg:space-y-0">
              {/* Content */}
              <div className="lg:w-1/2 max-lg:text-center" data-aos="fade-down">
                {/* Content #1 */}
                <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">
                    Confidential AI
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  Don't just reduce leaks.<br></br>Make them impossible.
                </h3>
                <p className="text-lg max-w-xs  max-lg:mx-auto lg:max-w-md text-slate-400  mb-8">
                  Most AI companies only promise to be careful with your data.{' '}
                  <strong className="text-white whitespace-nowrap">We prove it.</strong> Our Confidential AI models run
                  inside secure enclaves, which keep data encrypted even while in use. No one - not even us - ever gets
                  a chance to see your data.
                </p>
                <div className="mt-8 max-w-xs max-lg:mx-auto space-y-2">
                  <button
                    className={`flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${
                      tab !== 1 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(1)}>
                    <IconLock className="mr-2" />
                    <span>Simplify your security</span>
                  </button>
                  <button
                    className={`flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${
                      tab !== 2 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(2)}>
                    <IconBolt className="mr-2" />
                    <span>Rapid responses</span>
                  </button>
                  <button
                    className={`flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${
                      tab !== 3 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(3)}>
                    <IconRefresh className="mr-2" />
                    <span>Continuous improvement</span>
                  </button>
                </div>
                {/* <div style={{ height: '5vh' }}></div> */}
              </div>

              {/* Description Cards */}
              <div className="lg:w-1/2 " data-aos="fade-up" data-aos-delay="100">
                <div className="relative py-24 -mt-12">
                  {/* Particles animation */}
                  <Particles className="absolute inset-0 -z-10" quantity={8} staticity={30} />

                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48 flex justify-center items-center">
                      {/* Grid */}
                      <div className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[500px] h-[500px] rounded-full overflow-hidden [mask-image:_radial-gradient(black,_transparent_60%)]">
                        <div className="h-[200%] animate-endless">
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20" />
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.purple.500)_48px,_theme(colors.purple.500)_49px)]" />
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20" />
                          <div className="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.purple.500)_48px,_theme(colors.purple.500)_49px)]" />
                        </div>
                      </div>

                      {/* Cards */}
                      <Transition
                        show={tab === 1}
                        className="absolute"
                        enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="relative flex flex-col items-left justify-center w-96 p-6 border border-transparent rounded-2xl shadow-2xl [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.purple.400),_theme(colors.purple.700)_25%,_theme(colors.purple.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
                          <h3 className="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">
                            Browser-enforced security.
                          </h3>
                          We tie confidentiality proofs to TLS certificates, so most browsers are safe by default - the
                          connection fails if the attestation is not corroborated in the public Certificate Transparency
                          log.
                        </div>
                      </Transition>
                      <Transition
                        show={tab === 2}
                        className="absolute"
                        enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="relative flex-col items-left justify-center w-96 p-6 border border-transparent rounded-2xl shadow-2xl [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
                          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">
                            Fastest servers money can buy.
                          </h3>
                          We use the NVIDIA H100 for all Confidential AI servers. The security features we use are
                          hardware-based and impose zero overhead on AI performance.
                        </div>
                      </Transition>
                      <Transition
                        show={tab === 3}
                        className="absolute"
                        enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="relative flex-col items-left justify-center w-96 p-6 border border-transparent rounded-2xl shadow-2xl [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
                          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">
                            Agility with security.
                          </h3>
                          Confidential AI can learn from its own usage automatically, when opted-in. Customers retain
                          sole ownership over the resulting model, which is kept strictly confidential under the same
                          guarantees that protect the data used to train it.
                        </div>
                      </Transition>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}