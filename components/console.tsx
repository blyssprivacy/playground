'use client';
import { useState, useEffect } from 'react';
import { GrayOutlineGradient, CallLink } from './buttons';
import { IconCopy, IconEdit, IconTrash } from '@tabler/icons-react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

interface Key {
  id: string;
  secret: string;
}

interface Usage {
  id: string;
  date: string;
  usage: number;
}

// Helper function to fetch API keys and usage data
async function fetchData() {
  // Replace these with your actual API calls
  const keys = new Promise<Key[]>(resolve =>
    setTimeout(
      () =>
        resolve([
          { id: '1', secret: 'dummyKey1' },
          { id: '2', secret: 'dummyKey2' }
        ]),
      1000
    )
  );

  const usage = new Promise<Usage[]>(resolve =>
    setTimeout(
      () =>
        resolve([
          { id: '1', date: '2022-01-01', usage: 100 },
          { id: '2', date: '2022-02-01', usage: 200 }
        ]),
      1000
    )
  );

  const quota = new Promise<number>(resolve => setTimeout(() => resolve(1000), 1000));

  return Promise.all([keys, usage, quota]);
}

const dummyKeys = [
  {
    id: 'AAPS0L',
    secret: 'dummyKey1'
  }
];

function ApiKeyDisplay({ keys }: { keys: Key[] }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-xl mx-auto">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-0">
                    Key ID
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-200">
                    Secret
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {keys.map(k => (
                  <tr key={k.id}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-300 sm:pl-0">{k.id}</td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-300">{k.secret}</td>

                    {/* action icons */}
                    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <div className="flex gap-3 items-center justify-end">
                        <a href="#" className="text-gray-300 hover:text-white">
                          <IconCopy />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                          <IconEdit />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                          <IconTrash />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Apology() {
  return (
    <div className="rounded-md bg-yellow-50 p-4 pr-8 max-w-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">API Service Currently Full</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              New API key issuance temporarily disabled. For exploratory users that can accept instability, we have
              capacity available on our development servers (usage is free).{' '}
              <a className="underline" href="mailto:founders@blyss.dev">
                Email us
              </a>{' '}
              or{' '}
              <a className="underline" href={CallLink}>
                book a call
              </a>{' '}
              for access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [keys, setKeys] = useState<Key[]>([]);
  const [usage, setUsage] = useState<Usage[]>([]);
  const [quota, setQuota] = useState(0);

  useEffect(() => {
    fetchData().then(([keys, usage, quota]) => {
      setKeys(keys);
      setUsage(usage);
      setQuota(quota);
    });
  }, []);

  return (
    <div className="flex flex-col mt-32 items-center mx-8 pb-36">
      <div className="flex gap-4 items-center pb-8">
        <h4 className="h4 ">Confidential AI API</h4>
        <GrayOutlineGradient buttonText="Beta" linkTarget="#0" arrow={false} />
      </div>

      {/* <div className="h5">API Service Currently Full</div> */}
      <Apology />
      {/* <ApiKeyDisplay keys={[]} /> */}
    </div>
  );
}
