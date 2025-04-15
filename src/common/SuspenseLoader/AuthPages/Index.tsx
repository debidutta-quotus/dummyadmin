import { HashLoader } from 'react-spinners';
import './SuspenseLoader.css';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

const SuspenseLoader = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div className={`suspense-loader-container ${isDarkMode ? 'dark' : ''}`}>
      <HashLoader color={isDarkMode ? '#ccc' : '#333'} />
    </div>
  );
};

export default SuspenseLoader;
