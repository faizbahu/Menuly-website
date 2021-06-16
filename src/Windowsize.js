import React, {useEffect} from 'react';
const useWindowSize = () => {
  const isClient = typeof window === 'object';
  const getSize = () => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });
  const [size, setSize] = React.useState(getSize);
  useEffect(() => {
    if (!isClient) {
      return;
    }
    const onHandleResize = () => {
      setSize(getSize);
    };
    window.addEventListener('resize', onHandleResize);
    return () => {
      window.removeEventListener('resize', onHandleResize)
    };
  }, []);
  return size;
};
export default useWindowSize;