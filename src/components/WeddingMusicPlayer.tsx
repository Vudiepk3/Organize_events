import React, { useEffect, useRef } from 'react';

interface WeddingMusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const WeddingMusicPlayer: React.FC<WeddingMusicPlayerProps> = ({
  isPlaying,
}) => {
  const audioElemRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);
  const isPlayingRef = useRef<boolean>(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Danh sách các tên file MP3 dự phòng trong thư mục public/
  const AUDIO_SOURCES = ['/wedding.mp3', '/wedding.mp3.mp3', '/music.mp3'];

  useEffect(() => {
    let sourceIndex = 0;

    if (!audioElemRef.current) {
      const audio = new Audio();
      audio.src = AUDIO_SOURCES[0];
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.7;

      // Nếu file đầu tiên bị lỗi (ví dụ Windows lưu nhầm wedding.mp3.mp3), tự thử nguồn kế tiếp
      audio.onerror = () => {
        if (sourceIndex < AUDIO_SOURCES.length - 1) {
          sourceIndex++;
          audio.src = AUDIO_SOURCES[sourceIndex];
          if (isPlayingRef.current) {
            audio.play().catch(() => {});
          }
        } else {
          // Nếu không tìm thấy file nào trong public/, dùng synthesizer dự phòng
          if (isPlayingRef.current) {
            startSynthesizer();
          }
        }
      };

      audioElemRef.current = audio;
    }

    const audio = audioElemRef.current;

    const tryPlayAudio = () => {
      if (!audio || !isPlayingRef.current) return;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            stopSynthesizer();
          })
          .catch((err) => {
            // Trình duyệt chặn autoplay do chính sách người dùng chưa tương tác (NotAllowedError)
            if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
              // Lắng nghe tương tác đầu tiên của người dùng để phát ngay
              const unlockAudio = () => {
                if (isPlayingRef.current && audio) {
                  audio.play().catch(() => {});
                }
                window.removeEventListener('click', unlockAudio);
                window.removeEventListener('touchstart', unlockAudio);
                window.removeEventListener('scroll', unlockAudio);
                window.removeEventListener('keydown', unlockAudio);
              };

              window.addEventListener('click', unlockAudio, { once: true, passive: true });
              window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
              window.addEventListener('scroll', unlockAudio, { once: true, passive: true });
              window.addEventListener('keydown', unlockAudio, { once: true, passive: true });
            } else {
              // Lỗi định dạng hoặc 404, thử synthesizer
              startSynthesizer();
            }
          });
      }
    };

    if (isPlaying) {
      tryPlayAudio();
    } else {
      audio.pause();
      stopSynthesizer();
    }

    return () => {
      audio.pause();
      stopSynthesizer();
    };
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
        { root: 146.83, notes: [146.83, 220.00, 293.66, 369.99, 440.00] }, // D major
        { root: 110.00, notes: [110.00, 164.81, 220.00, 277.18, 329.63] }, // A major
        { root: 123.47, notes: [123.47, 185.00, 246.94, 293.66, 369.99] }, // B minor
        { root: 92.50,  notes: [92.50, 138.59, 185.00, 220.00, 277.18] },  // F# minor
        { root: 98.00,  notes: [98.00, 146.83, 196.00, 246.94, 293.66] },  // G major
        { root: 146.83, notes: [146.83, 220.00, 293.66, 369.99, 440.00] }, // D major
        { root: 98.00,  notes: [98.00, 146.83, 196.00, 246.94, 293.66] },  // G major
        { root: 110.00, notes: [110.00, 164.81, 220.00, 277.18, 329.63] }, // A major
      ];

      // Beautiful romantic bell/piano notes
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

        // Soft triangle wave for gentle music box / acoustic piano tone
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

        // Play gentle arpeggiated harp/piano note
        const note = chord.notes[step % chord.notes.length];
        playPianoNote(note, 2.2, 0.9);

        // Every 2 beats, add romantic high melody note
        if (step % 2 === 0) {
          const melodyFreq = melodyNotes[(chordIndex * 2 + Math.floor(step / 2)) % melodyNotes.length];
          playPianoNote(melodyFreq, 1.8, 0.7);
        }

        step = (step + 1) % 4;
        if (step === 0) {
          chordIndex = (chordIndex + 1) % chordRoots.length;
        }
      };

      // Play note every 450ms (largo romantic tempo)
      tick();
      timerRef.current = setInterval(tick, 450);
    } catch (e) {
      console.warn('Web Audio playback error', e);
    }
  };

  // Headless audio component: doesn't block or cover any footer text!
  return null;
};
