import React from 'react';
import Header from './Header'; // רכיב Header נפרד
import Footer from './Footer'; // רכיב Footer מוכן

import { ReactNode } from 'react';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main>
        {children} {/* התוכן הייחודי של כל עמוד יוצג כאן */}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;