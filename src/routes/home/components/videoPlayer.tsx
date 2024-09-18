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
          height: '56.25vw',
          maxWidth: '1280px',
          maxHeight: '720px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <iframe
          src="//player.bilibili.com/player.html?aid=241596420&bvid=BV1se411n7tD&cid=1413412972&p=1"
          style={{ width: '100%', height: '100%' }}
          scrolling="no"
          border="0"
          frameBorder="no"
          framespacing="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>,
    document.body,
  );
};

export default VideoPlayer;
