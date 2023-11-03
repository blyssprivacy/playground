'use client'
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';

function IconCheckBranded() {
  return <IconCheck className="mr-3 stroke-purple-500" />;
}

export default function Pricing() {
  const [annual, setAnnual] = useState<boolean>(true);

  return (
    <section className="relative">
      {/* Radial gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute flex items-center justify-center top-0 -translate-y-3/4 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-50" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12">
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div>
              {/* <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">
                Pricing
              </div> */}
            </div>
            <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              Pricing
            </h3>
            <p className="text-lg text-slate-400">From hobbyists to enterprises, privacy is for everyone.</p>
          </div>
          {/* Pricing tabs */}
          <div className="relative">
            {/* Content */}
            <div className="grid md:grid-cols-4 xl:-mx-6 text-sm [&>div:nth-of-type(-n+4)]:py-6 [&>div:nth-last-of-type(-n+4)]:pb-6 max-md:[&>div:nth-last-of-type(-n+4)]:mb-8 max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl md:[&>div:nth-of-type(2)]:rounded-tl-3xl md:[&>div:nth-of-type(4)]:rounded-tr-3xl md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl md:[&>div:nth-last-of-type(1)]:rounded-br-3xl [&>div]:bg-slate-700/20 [&>div:nth-of-type(4n+1)]:bg-transparent max-md:[&>div:nth-of-type(4n+5)]:hidden max-md:[&>div:nth-of-type(4n+2)]:order-1 max-md:[&>div:nth-of-type(4n+3)]:order-2 max-md:[&>div:nth-of-type(4n+4)]:order-3 max-md:md:[&>div:nth-of-type(n)]:mb-0 [&>div:nth-of-type(4n+3)]:relative before:[&>div:nth-of-type(4n+3)]:absolute before:[&>div:nth-of-type(4n+3)]:-inset-px before:[&>div:nth-of-type(4n+3)]:rounded-[inherit] before:[&>div:nth-of-type(4n+3)]:border-x-2 before:[&>div:nth-of-type(3)]:border-t-2 before:[&>div:nth-last-of-type(2)]:border-b-2 before:[&>div:nth-of-type(4n+3)]:border-purple-500 before:[&>div:nth-of-type(4n+3)]:-z-10 before:[&>div:nth-of-type(4n+3)]:pointer-events-none">
              {/* Pricing toggle */}
              <div className="px-6 flex flex-col justify-end">
                <div className="pb-5 md:border-b border-slate-800">
                  {/* Toggle switch */}
                  <div className="max-md:text-center">
                    <div className="inline-flex items-center whitespace-nowrap">
                      <div className="text-sm text-slate-500 font-medium mr-2 md:max-lg:hidden">Monthly</div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="toggle"
                          className="peer sr-only"
                          checked={annual}
                          onChange={() => setAnnual(!annual)}
                        />
                        <label
                          htmlFor="toggle"
                          className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-150 peer-checked:bg-purple-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-purple-500">
                          <span className="sr-only">Pay Yearly</span>
                        </label>
                      </div>
                      <div className="text-sm text-slate-500 font-medium ml-2">
                        Yearly <span className="text-teal-500">(-20%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Free price */}
              <div className="px-6 flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-medium text-slate-50 pb-0.5">Free</div>
                  <div className="mb-1">
                    <span className="text-lg font-medium text-slate-500">$</span>
                    <span className="text-3xl font-bold text-slate-50">0</span>
                    <span className="text-sm text-slate-600 font-medium">/mo</span>
                  </div>
                  <div className="text-slate-500">For testing and individual usage.</div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a
                    className="btn-sm text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                    href="#0">
                    <span className="inline md:hidden lg:inline">Get Started</span>{' '}
                    <span className="hidden md:inline lg:hidden">Go</span>{' '}
                    <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </a>
                </div>
              </div>
              {/* Plus price */}
              <div className="px-6 flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-medium text-purple-500 pb-0.5">Plus</div>
                  <div className="mb-1">
                    <span className="text-lg font-medium text-slate-500">$</span>
                    <span className="text-3xl font-bold text-slate-50">{annual ? '19' : '25'}</span>
                    <span className="text-sm text-slate-600 font-medium">/mo</span>
                  </div>
                  <div className="text-slate-500">Predictable pricing for small projects.</div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a
                    className="btn-sm text-white bg-purple-500 hover:bg-purple-600 w-full transition duration-150 ease-in-out group"
                    href="#0">
                    <span className="inline md:hidden lg:inline">Get Started</span>{' '}
                    <span className="hidden md:inline lg:hidden">Go</span>{' '}
                    <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </a>
                </div>
              </div>
              {/* Enterprise price */}
              <div className="px-6 flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-100 pb-0.5">
                    Enterprise
                  </div>
                  <div className="mb-1"> </div>
                  <div className="text-slate-500">
                    Custom models, integrations, and more. Dedicated capacity and SLAs.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a
                    className="btn-sm text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                    href="mailto:founders@blyss.dev">
                    Contact{' '}
                    <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </a>
                </div>
              </div>
              {/* # Usage */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4">Usage</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">Usage</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">Usage</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">Usage</div>
              </div>

              {/* Usage Limit */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">Usage Limit</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  {/* <IconCheckBranded /> */}
                  <span>10k tokens/day</span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  {/* <IconCheckBranded /> */}
                  <span>100k tokens/day</span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  {/* <IconCheckBranded /> */}
                  usage-based billing
                </div>
              </div>

              {/* Generation Speed */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">Generation Speed</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  {/* <IconCheckBranded /> */}
                  <span>10 token/sec</span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  {/* <IconCheckBranded /> */}
                  <span>30 token/sec</span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  {/* <IconCheckBranded /> */}
                  <span>
                    Unlimited <span className="md:hidden">Generation Speed</span>
                  </span>
                </div>
              </div>

              {/* Request Latency */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">Request Latency</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  {/* <IconCheckBranded /> */}
                  <span>
                    best-effort <span className="md:hidden"> latency</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  {/* <IconCheckBranded /> */}
                  <span>
                    up to 1 sec <span className="md:hidden">latency</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  {/* <IconCheckBranded /> */}
                  <span>
                    100ms <span className="md:hidden">latency</span>
                  </span>
                </div>
              </div>

              {/* # Features */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4">Features</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">Features</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">Features</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">Features</div>
              </div>

              {/* Prebuilt models */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">Prebuilt models</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <IconCheckBranded />
                  <span>
                    <span className="md:hidden">Prebuilt models</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <IconCheckBranded />
                  <span>
                    <span className="md:hidden">Prebuilt models</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <IconCheckBranded />
                  <span>
                    <span className="md:hidden">Prebuilt models</span>
                  </span>
                </div>
              </div>

              {/* BYO model */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">Custom models</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Custom models</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <IconCheckBranded />
                  <span>
                    <span className="md:hidden">Custom models</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <IconCheckBranded />
                  <span>
                    <span className="md:hidden">Custom models</span>
                  </span>
                </div>
              </div>

              {/* Automatic Finetuning */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">Automatic Finetuning</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Automatic Finetuning</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Automatic Finetuning</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <IconCheckBranded />
                  <span>
                    <span className="md:hidden">Automatic Finetuning</span>
                  </span>
                </div>
              </div>

              {/* # Reliability */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 ">Reliability</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">Reliability</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">Reliability</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">Reliability</div>
              </div>

              {/* Uptime SLA*/}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">Uptime SLA</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Uptime SLA</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Uptime SLA</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <IconCheckBranded /> Customizable
                  <span>
                    <span className="md:hidden">&nbsp;SLA</span>
                  </span>
                </div>
              </div>

              {/* Dedicated Capacity */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">Dedicated Capacity</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Dedicated Capacity</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Dedicated Capacity</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <IconCheckBranded />
                  <span>
                    <span className="md:hidden">Dedicated Capacity</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}