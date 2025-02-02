"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause } from "lucide-react";

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audioRef.current = new Audio("./vitaintro-comp.mp3");

    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    // Add event listeners
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    // Clean up
    return () => {
      audio.pause();
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onSliderChange = (value: number[]) => {
    const [newTime] = value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        <div className="flex flex-row justify-between items-center space-x-4 w-full">
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="icon"
            className="min-w-12 h-12 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          <div className="w-full">
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={onSliderChange}
            />
          </div>
          <div className="min-w-fit text-sm font-medium">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
