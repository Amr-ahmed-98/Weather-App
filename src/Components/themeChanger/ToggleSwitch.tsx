
import  { useState } from 'react';
import { FiMoon } from "react-icons/fi";
import { IoIosSunny } from "react-icons/io";
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className={`${styles['toggle-switch']} ${isToggled ? styles['toggled'] : ''}`} onClick={handleToggle}>
      <div className={`${styles['toggle-thumb']} ${isToggled ? styles['toggled'] : ''}`}>
        <IoIosSunny  className={`${styles['icon']} ${styles['sun']} ${isToggled ? styles['hidden'] : ''}`} />
        <FiMoon  className={`${styles['icon']} ${styles['moon']} ${isToggled ? '' : styles['hidden']}`} />
      </div>
    </div>
  );
};

export default ToggleSwitch;
