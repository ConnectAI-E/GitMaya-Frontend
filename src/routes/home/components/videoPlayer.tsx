import ReactDOM from 'react-dom';

const VideoPlayer = ({ onClose }) => {
  const handleCloseClick = (e) => {
    // 确保点击的是背景层而不是播放器内部
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
        zIndex: 9998, // 比视频播放器层级低一层
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={handleCloseClick}
    >
      <div
        style={{
          width: '100vw',
          maxWidth: '1280px',
          maxHeight: '720px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <video
          style={{ width: '100%', height: '100%', borderRadius: '20px' }}
          controls
          autoPlay
          src="./videoMaya.mp4"
        />
      </div>
    </div>,
    document.body,
  );
};

export default VideoPlayer;
