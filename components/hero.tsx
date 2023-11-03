import Image from 'next/image'
import Particles from './particles';
import { IconBook } from '@tabler/icons-react';

export default function Hero() {
  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* blobs */}
        <div
          className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true">
          <div className="relative w-full h-full">
            <div
              className="absolute w-96 h-32 bg-purple-500 blur-2xl opacity-20"
              style={{
                top: '30%',
                left: '60%',
                borderRadius: '50% 50% 46% 54% / 68% 31% 69% 32% ',
                transform: 'rotate(-10deg)'
              }}
            />
            <div
              className="absolute w-36 h-96 bg-purple-400 blur-2xl opacity-20"
              style={{
                top: '10%',
                left: '25%',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70% ',
                transform: 'rotate(20deg)'
              }}
            />
            <div
              className="absolute w-96 h-36 bg-purple-400 blur-2xl opacity-20"
              style={{
                top: '60%',
                left: '40%',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70% ',
                transform: 'rotate(10deg)'
              }}
            />
          </div>
        </div>

        <div className="pt-32 pb-16 md:pt-52">
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6" data-aos="fade-down">
              <div className="inline-flex relative before:absolute before:inset-0 before:bg-purple-500 before:blur-md">
                <a
                  className="btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.purple.500),_theme(colors.purple.500))_padding-box,_linear-gradient(theme(colors.purple.500),_theme(colors.purple.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow"
                  href="https://blog.blyss.dev/seed-raise/">
                  <span className="relative inline-flex items-center">
                    We raised a $2.2M seed round{' '}
                    <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <h1
              className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4"
              data-aos="fade-down">
              The most secure AI platform.
            </h1>
            <p className="text-lg text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">
              AI models hosted on ultrafast servers, <strong>encrypted end-to-end</strong>.&nbsp;
              <br className="max-md:hidden" />
              Designed for the data you can't afford to leak.
            </p>
            <div
              className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              data-aos="fade-down"
              data-aos-delay="400">
              <div>
                <a
                  className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                  href="https://calendar.app.google/n1zVWeURhzx21DJH6">
                  Learn more on a call{' '}
                  <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </a>
              </div>
              <div>
                <a
                  className="btn text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out"
                  href="https://blog.blyss.dev/confidential-ai-from-gpu-enclaves">
                  <IconBook className="mr-2" />
                  <span>Read Security Docs</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}