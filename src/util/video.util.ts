export function convertToEmbedURL(url = ""): string {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([\w-]+)/;
  const match = url?.match(youtubeRegex);
  const videoId = match?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}
