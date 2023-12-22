import React from 'react';

const Navbar = () => {
  return (<>
    <header className="bg-blue-500 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">ChatApp</div>
        <h1>All Messages will appear here</h1>
      </nav>
    </header>
  </>
  );
}

export default Navbar;