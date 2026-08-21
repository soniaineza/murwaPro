"use client";

import { use, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft, Play, Pause, Volume2, VolumeX, Maximize,
  Settings, SkipBack, SkipForward, Subtitles
} from "lucide-react";

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState("auto");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [subtitles, setSubtitles] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const controlsTimeout = useRef<NodeJS.Timeout>(undefined);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/movies`)
      .then((r) => r.json())
      .then((data) => {
        const m = data.find((m: any) => m.id === id);
        setMovie(m);
        setDuration(m ? m.duration * 60 : 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Simulate playback
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return prev + playbackSpeed;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed]);

  useEffect(() => {
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setProgress(pct);
    setCurrentTime((pct / 100) * duration);
  }, [duration]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const qualities = ["auto", "360p", "480p", "720p", "1080p"];
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="h-8 w-32 skeleton rounded" /></div>;
  }

  return (
    <div className="min-h-screen bg-black" onMouseMove={handleMouseMove}>
      {/* Video Player Area */}
      <div
        className="relative aspect-video bg-[#0a0a0f] flex items-center justify-center cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* Movie Title Overlay */}
        {!isPlaying && movie && (
          <div className="text-center z-10">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
              <Play size={32} className="text-primary ml-1" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
            <p className="text-sm text-white/50">Click to play</p>
          </div>
        )}

        {/* Playing overlay */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/20 text-lg">Video playback placeholder</p>
          </div>
        )}

        {/* Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="w-full h-1.5 bg-white/20 cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div className="h-full bg-primary relative" style={{ width: `${progress}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-primary transition-colors">
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <SkipBack size={18} />
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <SkipForward size={18} />
            </button>

            <div className="flex items-center gap-2 group/vol">
              <button onClick={() => setIsMuted(!isMuted)} className="text-white/70 hover:text-white transition-colors">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                className="w-20 h-1 accent-primary cursor-pointer"
              />
            </div>

            <span className="text-xs text-white/60 ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex-1" />

            <button
              onClick={() => setSubtitles(!subtitles)}
              className={`p-1.5 transition-colors ${subtitles ? "text-primary" : "text-white/70 hover:text-white"}`}
            >
              <Subtitles size={18} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 transition-colors ${showSettings ? "text-primary" : "text-white/70 hover:text-white"}`}
              >
                <Settings size={18} />
              </button>

              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 bg-[#1a1a26] border border-white/10 rounded-lg p-3 min-w-[200px] space-y-3" onClick={(e) => e.stopPropagation()}>
                  <div>
                    <p className="text-xs text-white/50 mb-1.5">Quality</p>
                    <div className="flex flex-wrap gap-1">
                      {qualities.map((q) => (
                        <button key={q} onClick={() => setQuality(q)} className={`px-2 py-1 text-xs rounded ${quality === q ? "bg-primary text-black" : "bg-white/10 text-white/70 hover:text-white"}`}>
                          {q === "auto" ? "Auto" : q}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1.5">Speed</p>
                    <div className="flex flex-wrap gap-1">
                      {speeds.map((s) => (
                        <button key={s} onClick={() => setPlaybackSpeed(s)} className={`px-2 py-1 text-xs rounded ${playbackSpeed === s ? "bg-primary text-black" : "bg-white/10 text-white/70 hover:text-white"}`}>
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="text-white/70 hover:text-white transition-colors">
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Movie info below player */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-4">
        <Link
          href={movie ? `/movies/${movie.slug}` : "/movies"}
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors mb-4"
        >
          <ChevronLeft size={16} /> Back to {movie?.title || "Movies"}
        </Link>
        {movie && (
          <div>
            <h1 className="text-xl font-bold text-white mb-1">{movie.title}</h1>
            {movie.tagline && <p className="text-sm text-white/50 italic">{movie.tagline}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
