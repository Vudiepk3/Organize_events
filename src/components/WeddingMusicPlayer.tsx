import React, { useEffect, useRef } from 'react';

interface WeddingMusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay?: () => void;
  setIsPlaying: (playing: boolean) => void;
}

export const WeddingMusicPlayer: React.FC<WeddingMusicPlayerProps> = ({
  isPlaying,
  setIsPlaying,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(isPlaying);

  // Đồng bộ giá trị ref
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Khởi tạo audio 1 lần duy nhất khi component mount
  useEffect(() => {
    const audio = new Audio('/wedding.mp3');
    audio.loop = true;
    audio.volume = 0.65;
    audio.preload = 'auto';

    // Dự phòng trường hợp trên Windows file bị lưu nhầm tên wedding.mp3.mp3
    audio.addEventListener('error', () => {
      if (audio.src.endsWith('/wedding.mp3')) {
        audio.src = '/wedding.mp3.mp3';
        if (isPlayingRef.current && !userMutedRef.current) {
          audio.play().catch(() => {});
        }
      }
    });

    audioRef.current = audio;

    // Hàm kích hoạt nhạc 1 lần duy nhất khi người dùng chạm vào trang
    const handleFirstUserInteraction = () => {
      if (userMutedRef.current) return;

      if (audio.paused) {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(() => {
            // Nếu trình duyệt vẫn chặn, giữ listener để chờ cú click tiếp theo
          });
      } else {
        removeInteractionListeners();
      }
    };

    const removeInteractionListeners = () => {
      document.removeEventListener('click', handleFirstUserInteraction);
      document.removeEventListener('touchstart', handleFirstUserInteraction);
    };

    // Thử phát ngay khi vừa tải trang
    audio.play()
      .then(() => {
        // Trình duyệt cho phép autoplay
        setIsPlaying(true);
      })
      .catch(() => {
        // Trình duyệt chặn autoplay ban đầu -> lắng nghe chạm tay/click lần đầu tiên
        document.addEventListener('click', handleFirstUserInteraction, { once: true, passive: true });
        document.addEventListener('touchstart', handleFirstUserInteraction, { once: true, passive: true });
      });

    return () => {
      removeInteractionListeners();
      audio.pause();
      audio.src = '';
    };
  }, [setIsPlaying]);

  // Điều khiển phát/dừng MỘT CHIỀU theo trạng thái isPlaying (người dùng bấm nút Nhạc trên Header)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userMutedRef.current = false;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    } else {
      userMutedRef.current = true;
      if (!audio.paused) {
        audio.pause();
      }
    }
  }, [isPlaying]);

  return null;
};
