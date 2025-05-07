export const generateHTML = (): string => {
  const canvas = document.querySelector("#canvas");
  if (!canvas) return "";

  const canvasClone = canvas.cloneNode(true) as HTMLElement;

  // 모바일 반응형 스타일 _ Text
  const textElements = canvasClone.querySelectorAll("[data-element-id]");
  const textStyles = Array.from(textElements)
    .map((element) => {
      const elementId = element.getAttribute("data-element-id");
      const mobileFontSize = element.getAttribute("data-mobile-font-size");
      const mobileFontWeight = element.getAttribute("data-mobile-font-weight");

      if (!elementId || (!mobileFontSize && !mobileFontWeight)) return "";

      return `
      [data-element-id="${elementId}"] {
        ${mobileFontSize ? `font-size: ${mobileFontSize} !important;` : ""}
        ${
          mobileFontWeight ? `font-weight: ${mobileFontWeight} !important;` : ""
        }
      }
    `;
    })
    .join("\n");

  // 모바일 반응형 스타일 _ Section
  const sections = canvasClone.querySelectorAll("section");
  const sectionStyles = Array.from(sections)
    .map((section, index) => {
      const mobileTopBottom = section.getAttribute(
        "data-mobile-padding-top-bottom"
      );
      const mobileLeftRight = section.getAttribute(
        "data-mobile-padding-left-right"
      );
      const mobileColumns = section.getAttribute("data-mobile-columns");

      return `
      section:nth-child(${index + 1}) {
        ${
          mobileTopBottom
            ? `padding-top: ${mobileTopBottom}px !important; padding-bottom: ${mobileTopBottom}px !important;`
            : ""
        }
        ${
          mobileLeftRight
            ? `padding-left: ${mobileLeftRight}px !important; padding-right: ${mobileLeftRight}px !important;`
            : ""
        }
      }
      
      section:nth-child(${index + 1}) > div {
        ${
          mobileColumns
            ? `grid-template-columns: repeat(${mobileColumns}, 1fr) !important;`
            : ""
        }
        gap: 8px !important;
      }
    `;
    })
    .join("\n");

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
      
      @media (max-width: 768px) {
        body {
          padding: 0;
        }
        ${textStyles}
        ${sectionStyles}
      }
    </style>
</head>
<body>
    ${canvasClone.innerHTML}
</body>
</html>`;
};
