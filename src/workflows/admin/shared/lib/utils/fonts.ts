export const loadFont = (fontId: string, fontFamily: string, unicodeRange: string) => {
  const linkId = `font-link-${fontId}`;
  if (document.getElementById(linkId)) return;

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.media = 'print';
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@400&text=${encodeURIComponent(
    unicodeRange,
  )}`;
  link.onload = () => {
    link.media = 'all'; // как только загрузится, применить к экрану
  };
  document.head.appendChild(link);
};

export const removeFont = (fontId: string) => {
  const link = document.getElementById(`font-link-${fontId}`);
  if (link) link.remove();
};
