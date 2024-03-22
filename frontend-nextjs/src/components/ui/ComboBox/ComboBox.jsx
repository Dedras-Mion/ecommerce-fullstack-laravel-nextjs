'use client';

import {useState, useEffect, useRef} from 'react';
import {Check, ChevronsUpDown, Search, X} from 'lucide-react';

const ComboBox = ({
  title,
  options,
  placeholder,
  containerStyle = {},
  buttonStyle = {},
  dropdownStyle = {},
  inputStyle = {},
  listItemStyle = {},
  onSelect,
  optionKey = 'name',
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option[optionKey].toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleClear = () => {
    setValue('');
    setSearchTerm('');
    if (onSelect) onSelect('');
  };

  return (
    <div className='relative w-full max-w-[350px]' style={containerStyle}>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-md border border-black bg-black px-4 py-3 text-sm text-gray-300 transition-all duration-300 ease-in-out hover:bg-[#101010] focus:outline-none focus:ring-2 focus:ring-[#23282C] ${
          open ? 'ring-2 ring-[#23282C]' : ''
        }`}
        style={buttonStyle}
        aria-expanded={open}>
        {value
          ? options.find((option) => option.id.toString() === value)?.[optionKey]
          : placeholder || `Select ${title}...`}
        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
      </button>
      {open && (
        <div
          className='absolute z-50 mt-2 w-full overflow-hidden rounded-md border border-black bg-black text-gray-300 shadow-lg'
          style={dropdownStyle}>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500' />
            <input
              ref={inputRef}
              className='flex h-12 w-full rounded-t-md border-0 bg-[#030303] py-2 pl-10 pr-10 text-sm text-gray-300 placeholder-gray-500 outline-none focus:ring-2 focus:ring-inset focus:ring-[#23282C]'
              style={inputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${title}...`}
            />
            {searchTerm && (
              <button onClick={handleClear} className='absolute right-3 top-1/2 -translate-y-1/2 transform'>
                <X className='h-4 w-4 text-gray-500' />
              </button>
            )}
          </div>
          <ul className={`m-0 max-h-[240px] overflow-auto p-0 ${filteredOptions.length === 0 ? 'p-2' : ''}`}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`relative flex cursor-pointer select-none items-center px-4 py-3 text-sm outline-none transition-colors duration-300 ease-in-out hover:bg-[#101010] ${value === option.id.toString() ? 'bg-[#101010] text-white' : ''}`}
                  style={listItemStyle}
                  onClick={() => {
                    setValue(option.id.toString());
                    setOpen(false);
                    setSearchTerm('');
                    if (onSelect) onSelect(option.id.toString());
                  }}>
                  <span>{option[optionKey]}</span>
                  {value === option.id.toString() && <Check className='ml-auto h-4 w-4 opacity-100' />}
                </li>
              ))
            ) : (
              <li className='relative flex cursor-default select-none items-center px-4 py-3 text-sm text-gray-500 outline-none'>
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComboBox;
