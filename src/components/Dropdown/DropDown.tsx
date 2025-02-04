import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

type DropDownProps = {
  label: string;
  options: string[];
  selected?: string; // nouvelle prop pour la valeur sélectionnée
  onSelect?: (value: string) => void;
};

export default function DropDown({ label, options, selected, onSelect }: DropDownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left z-40">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {/* Afficher la valeur sélectionnée si présente, sinon le label */}
          {selected && selected !== label ? selected : label}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </Menu.Button>
      </div>
      <Menu.Items
        className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div className="py-1">
          {options.map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  onClick={() => onSelect && onSelect(option)}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block w-full text-left px-4 py-2 text-sm`}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}
