import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';

export default function NavbarTitle() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  src={`${process.env.PUBLIC_URL}/logo.png`}
                  alt="PEC Impulse Logo"
                  style={{
                    height: '120px',  // Adjust the height to fit your navbar
                    width: 'auto',   // Maintain aspect ratio
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
