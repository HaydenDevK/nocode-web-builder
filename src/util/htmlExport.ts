// 편집 중에만 보이는 스타일을 제거하는 함수
export const removeEditorStyles = (html: string): string => {
  return html
    .replace(/cursor: pointer;/g, "")
    .replace(/outline: 2px dashed #2684FF;/g, "")
    .replace(/outline: 2px solid #2684FF;/g, "");
};

// 캔버스에서 HTML을 추출하고, 불필요한 스타일을 제거한 후, HTML을 반환하는 함수
export const generateHTML = (): string => {
  const canvas = document.querySelector("#canvas");
  if (!canvas) return "";

  const canvasClone = canvas.cloneNode(true) as HTMLElement;
  const cleanedHTML = removeEditorStyles(canvasClone.innerHTML);

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <link href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css" rel="stylesheet">
    <link href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-jp.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Spoqa Han Sans Neo', system-ui, -apple-system, sans-serif;
      }
      * {
        box-sizing: border-box;
      }
    </style>
</head>
<body>

    ${cleanedHTML}
</body>
</html>`;
};
