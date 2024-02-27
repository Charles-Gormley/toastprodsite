import Image from 'next/image';
import eggLoading from '../../public/loading_egg.gif'

const LoadingOverlay = () => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Image src={eggLoading} alt="Loading..." />
      <div>Loading...</div>

    </div>
  );
  
export default LoadingOverlay;
