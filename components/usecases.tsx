import Image from 'next/image';
import Particles from './particles';
import { IconCode, IconSearch, IconCalendar } from '@tabler/icons-react';

export default function UseCases() {
  return (
    <section className="relative">
      <div className="text-center py-12">
        <h3 className="h3 text-white">Use Cases</h3>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Copilot */}
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <IconCode className="fill-slate-300" size={24} />
              <h4 className="font-medium text-slate-50">Code Copilots</h4>
            </div>
            <p className="text-sm text-slate-400">
              Intelligent assistance for developers working on proprietary codebases.
            </p>
          </div>
          {/* Search */}
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <IconSearch />
              <h4 className="font-medium text-slate-50">Semantic Search</h4>
            </div>
            <p className="text-sm text-slate-400">Deep embedding-based search over private documents and images.</p>
          </div>
          {/* Assistants */}
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <IconCalendar />
              <h4 className="font-medium text-slate-50">Personal Assistants</h4>
            </div>
            <p className="text-sm text-slate-400">
              Personalized AI helpers that can be trusted with emails and calendars.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
