import React, { PropsWithChildren } from 'react';
import SideBar from '@/components/ui/SideBar';
import { Bars3Icon } from '@heroicons/react/16/solid';

type Props = PropsWithChildren

function MobileNavbar(props: Props) {
  return (
    <div className="md:hidden">
      <SideBar
        triggerButtonClassName="absolute top-2 sm:top-8 left-2 sm:left-8"
        triggerIcon={ <Bars3Icon className="w-4 sm:w-6"/> }
      >
        {props.children}
      </SideBar>
    </div>
  );
}

export default MobileNavbar;