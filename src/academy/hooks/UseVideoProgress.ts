import { useEffect, useRef } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

interface UseVideoProgressProps {
  videoId: string;           // id do documento no Firestore
  videoUrl: string;
  onProgressUpdate?: (percent: number) => void;
  onVideoComplete?: () => void;
}

export const useVideoProgress = ({
  videoId,
  videoUrl,
  onProgressUpdate,
  onVideoComplete,
}: UseVideoProgressProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSavedPercent = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !auth.currentUser) return;

    const saveProgress = async (percent: number) => {
      if (Math.abs(percent - lastSavedPercent.current) < 5) return; // evita spam

      try {
        const userDoc = doc(db, "usuarios", auth.currentUser!.uid);
        const userSnap = await getDoc(userDoc);

        const progressAtual = userSnap.exists() ? userSnap.data().progresso || {} : {};
        progressAtual[videoId] = {
          percent: Math.round(percent),
          lastWatched: new Date().toISOString(),
          concluido: percent >= 90,
        };

        await updateDoc(userDoc, { progresso: progressAtual });

        lastSavedPercent.current = percent;
        onProgressUpdate?.(percent);

        if (percent >= 90) {
          onVideoComplete?.();
        }
      } catch (err) {
        console.error("Erro ao salvar progresso:", err);
      }
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const percent = (video.currentTime / video.duration) * 100;
      saveProgress(percent);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", () => saveProgress(100));

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", () => saveProgress(100));
    };
  }, [videoId, videoUrl]);

  return videoRef;
};