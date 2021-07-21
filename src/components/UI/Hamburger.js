import {MdMenu} from 'react-icons/md';
import { IconContext } from 'react-icons';

const Hamburger = ({className, onClick}) => {
  return (
    <IconContext.Provider value={{size:"2.5em", color:"white"}}>
      <MdMenu className={className} onClick={onClick}/>
    </IconContext.Provider>
  );
};

export default Hamburger;