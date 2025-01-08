import React from 'react';

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);
          setIsButtonDisabled(true);

          setTimeout(() => {
            setIsCopied(false);
            setIsButtonDisabled(false);
          }, 2000);
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
        });
    } else {
      // Альтернативный метод копирования для старых браузеров
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand('copy');
        setIsCopied(true);
        setIsButtonDisabled(true);

        setTimeout(() => {
          setIsCopied(false);
          setIsButtonDisabled(false);
        }, 2000);
      } catch (err) {
        console.error('Fallback: Failed to copy:', err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return { isCopied, isButtonDisabled, copyToClipboard };
};
