import React from 'react';
import Navbar from './components/navbar';
import ChatOutlet from './components/chatoutlet';
import Footer from './components/footer';

function App() {
  return (
    <div className="font-sans bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-4">
        <ChatOutlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
