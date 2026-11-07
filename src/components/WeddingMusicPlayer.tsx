import React, { useEffect, useRef } from 'react';

interface WeddingMusicPlayerProps {
  isPlaying: boolean;
  onPlayStateChange: (isPlaying: boolean) => void;
}

export const WeddingMusicPlayer: React.FC<WeddingMusicPlayerProps> = ({
  isPlaying,
  onPlayStateChange,
}) => {
  const audioElemRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);
  const userExplicitlyPausedRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(isPlaying);

  // Sync ref
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Các nguồn file MP3 trong thư mục public/
  const AUDIO_SOURCES = ['/wedding.mp3', '/wedding.mp3.mp3', '/music.mp3'];

  useEffect(() => {
    let sourceIndex = 0;

    // Khởi tạo audio element một lần duy nhất
    if (!audioElemRef.current) {
      const audio = new Audio();
      audio.src = AUDIO_SOURCES[0];
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.7;

      // Đồng bộ trạng thái thực tế của audio với icon trên Header
      audio.addEventListener('play', () => {
        onPlayStateChange(true);
        stopSynthesizer();
      });

      audio.addEventListener('pause', () => {
        onPlayStateChange(false);
      });

      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      });

      // Nếu đường dẫn đầu tiên lỗi (ví dụ file bị đổi tên), thử tiếp các nguồn dự phòng
      audio.addEventListener('error', () => {
        if (sourceIndex < AUDIO_SOURCES.length - 1) {
          sourceIndex++;
          audio.src = AUDIO_SOURCES[sourceIndex];
          if (!userExplicitlyPausedRef.current) {
            audio.play().catch(() => {});
          }
        } else {
          // Nếu không tìm thấy file nào, dùng Web Audio synthesizer
          if (!userExplicitlyPausedRef.current && isPlayingRef.current) {
            startSynthesizer();
          }
        }
      });

      audioElemRef.current = audio;
    }

    const audio = audioElemRef.current;

    // Hàm mở khoá phát nhạc khi người dùng tương tác lần đầu tiên
    const unlockAndPlay = () => {
      if (userExplicitlyPausedRef.current) return;

      if (audio && audio.paused) {
        audio.play()
          .then(() => {
            // Phát thành công, gỡ bỏ các listener lắng nghe tương tác
            cleanupInteractionListeners();
          })
          .catch(() => {
            // Nếu vẫn bị chặn, giữ lại listener chờ lần tương tác tiếp theo
          });
      }
    };

    const cleanupInteractionListeners = () => {
      window.removeEventListener('pointerdown', unlockAndPlay);
      window.removeEventListener('touchstart', unlockAndPlay);
      window.removeEventListener('click', unlockAndPlay);
      window.removeEventListener('keydown', unlockAndPlay);
    };

    // Khi component mount lần đầu: thử gọi audio.play() ngay lập tức
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Trình duyệt cho phép phát tự động ngay khi vào web
          cleanupInteractionListeners();
        })
        .catch((err) => {
          // Trình duyệt chặn autoplay (NotAllowedError) do người dùng chưa chạm vào trang
          // Đăng ký sự kiện tương tác thật: pointerdown, touchstart, click (KHÔNG dùng scroll vì scroll không kích hoạt user activation)
          window.addEventListener('pointerdown', unlockAndPlay, { passive: true });
          window.addEventListener('touchstart', unlockAndPlay, { passive: true });
          window.addEventListener('click', unlockAndPlay, { passive: true });
          window.addEventListener('keydown', unlockAndPlay, { passive: true });
        });
    }

    return () => {
      cleanupInteractionListeners();
    };
  }, []);

  // Xử lý khi người dùng chủ động bấm nút Nhạc trên Header
  useEffect(() => {
    const audio = audioElemRef.current;
    if (!audio) return;

    if (isPlaying) {
      userExplicitlyPausedRef.current = false;
      if (audio.paused) {
        audio.play().catch(() => {
          startSynthesizer();
        });
      }
    } else {
      userExplicitlyPausedRef.current = true;
      if (!audio.paused) {
        audio.pause();
      }
      stopSynthesizer();
    }
  }, [isPlaying]);

  const stopSynthesizer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startSynthesizer = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;

      // Canon in D Chords frequencies (D - A - Bm - F#m - G - D - G - A)
      const chordRoots = [
        { root: 146.83, notes: [146.83, 220.00, 293.66, 369.99, 440.00] },
        { root: 110.00, notes: [110.00, 164.81, 220.00, 277.18, 329.63] },
        { root: 123.47, notes: [123.47, 185.00, 246.94, 293.66, 369.99] },
        { root: 92.50,  notes: [92.50, 138.59, 185.00, 220.00, 277.18] },
        { root: 98.00,  notes: [98.00, 146.83, 196.00, 246.94, 293.66] },
        { root: 146.83, notes: [146.83, 220.00, 293.66, 369.99, 440.00] },
        { root: 98.00,  notes: [98.00, 146.83, 196.00, 246.94, 293.66] },
        { root: 110.00, notes: [110.00, 164.81, 220.00, 277.18, 329.63] },
      ];

      const melodyNotes = [
        587.33, 554.37, 493.88, 440.00, 392.00, 369.99, 392.00, 440.00,
        587.33, 659.25, 739.99, 587.33, 659.25, 739.99, 880.00, 739.99,
      ];

      let chordIndex = 0;
      let step = 0;

      const playPianoNote = (freq: number, duration: number, gainMul: number = 1) => {
        if (!ctx || ctx.state !== 'running' || !isPlayingRef.current) return;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.05 * gainMul, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      };

      const tick = () => {
        if (!isPlayingRef.current) return;
        const chord = chordRoots[chordIndex % chordRoots.length];
        const note = chord.notes[step % chord.notes.length];
        playPianoNote(note, 2.2, 0.9);

        if (step % 2 === 0) {
          const melodyFreq = melodyNotes[(chordIndex * 2 + Math.floor(step / 2)) % melodyNotes.length];
          playPianoNote(melodyFreq, 1.8, 0.7);
        }

        step = (step + 1) % 4;
        if (step === 0) {
          chordIndex = (chordIndex + 1) % chordRoots.length;
        }
      };

      tick();
      timerRef.current = setInterval(tick, 450);
      onPlayStateChange(true);
    } catch (e) {
      console.warn('Web Audio playback error', e);
    }
  };

  return null;
};
