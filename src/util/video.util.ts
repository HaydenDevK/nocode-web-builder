// src/app/util/video.util.ts
export function convertToEmbedURL(url: string): string {
  // 유튜브 링크를 임베드 형식으로 변환하는 예시
  const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
  const videoId = videoIdMatch?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}
