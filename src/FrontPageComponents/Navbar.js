import React, { useEffect, useState } from 'react';  
  
function Navbar() {  
  const [isSticky, setIsSticky] = useState(false);  
  
  useEffect(() => {  
    window.addEventListener('scroll', handleScroll);  
    return () => {  
      window.removeEventListener('scroll', handleScroll);  
    };  
  }, []);  
  
  const handleScroll = () => {  
    if (window.scrollY > 0) {  
      setIsSticky(true);  
    } else {  
      setIsSticky(false);  
    }  
  };  
  
  return (  
    <nav style={{ position: isSticky ? 'fixed' : 'static', top: 0, width: '100%', zIndex: 1 }}>  
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-evenly' }}>  
        <li><a href="#">Home</a></li>  
        <li><a href="#">About</a></li>  
        <li><a href="#">Services</a></li>  
        <li><a href="#">Contact</a></li>  
      </ul>  
    </nav>  
  );  
}  
  
export default Navbar;  
