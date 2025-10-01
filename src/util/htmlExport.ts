export const generateHTML = (): string => {
  const canvas = document.querySelector("#canvas");
  if (!canvas) return "";

  const canvasClone = canvas.cloneNode(true) as HTMLElement;

  // 1. 인라인 스타일 정리
  cleanInlineStyles(canvasClone);

  // 2. 반응형 CSS 생성
  const textStyles = generateTextStyles(canvasClone);
  const sectionStyles = generateSectionStyles(canvasClone);

  const html = `<!DOCTYPE html>
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

      img {
        object-fit: contain;
      }
      
      /* 기본 섹션 스타일 */
      section {
        display: flex !important;
        gap: 16px !important;
        width: 100% !important;
        margin: 0 auto !important;
        position: relative !important;
      }
      
      section > div {
        display: grid !important;
        gap: 16px !important;
        width: 100% !important;
        align-items: stretch !important;
        padding-top: 4px !important;
      }
      
      /* 반응형 스타일 */
      ${sectionStyles}
      
      @media (max-width: 768px) {
        body {
          padding: 0;
        }
        ${textStyles}
      }
    </style>
</head>
<body>
    ${canvasClone.innerHTML}
</body>
</html>`;

  return html;
};

// 인라인 스타일 정리 함수
const cleanInlineStyles = (element: HTMLElement) => {
  const sections = element.querySelectorAll("section");
  sections.forEach((section) => {
    // 각 섹션의 첫 번째 div (grid container) 찾기
    const gridDiv = section.querySelector(":scope > div");
    if (gridDiv) {
      const currentStyle = gridDiv.getAttribute("style") || "";
      const cleanedStyle = currentStyle
        .replace(/display:\s*grid[^;]*;?/g, "")
        .replace(/grid-template-columns:[^;]*;?/g, "")
        .replace(/align-items:\s*stretch[^;]*;?/g, "")
        .replace(/gap:\s*16px[^;]*;?/g, "")
        .replace(/width:\s*100%[^;]*;?/g, "")
        .replace(/padding-top:\s*4px[^;]*;?/g, "")
        .replace(/;+/g, ";")
        .replace(/^;|;$/g, "");

      if (cleanedStyle.trim()) {
        gridDiv.setAttribute("style", cleanedStyle);
      } else {
        gridDiv.removeAttribute("style");
      }
    }
  });
};

// 텍스트 스타일 생성 함수
const generateTextStyles = (element: HTMLElement): string => {
  const textElements = element.querySelectorAll("[data-element-id]");
  return Array.from(textElements)
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
};

// 섹션 스타일 생성 함수
const generateSectionStyles = (element: HTMLElement): string => {
  const sections = element.querySelectorAll("section");

  return Array.from(sections)
    .map((section, index) => {
      // 데스크톱 설정 추출
      const desktopColumns =
        section.getAttribute("data-desktop-columns") || "1";
      const desktopTopBottom = section.getAttribute(
        "data-desktop-padding-top-bottom"
      );
      const desktopLeftRight = section.getAttribute(
        "data-desktop-padding-left-right"
      );

      // 모바일 설정 추출
      const mobileColumns = section.getAttribute("data-mobile-columns") || "1";
      const mobileTopBottom = section.getAttribute(
        "data-mobile-padding-top-bottom"
      );
      const mobileLeftRight = section.getAttribute(
        "data-mobile-padding-left-right"
      );

      // 사용자가 설정한 실제 모바일 컬럼 사용
      const finalMobileColumns = mobileColumns;

      return `
      /* 섹션 ${index + 1} - 기본 스타일 (데스크톱) */
      section[data-section-id="${section.getAttribute("data-section-id")}"] {
        ${
          desktopTopBottom
            ? `padding-top: ${desktopTopBottom}px !important; padding-bottom: ${desktopTopBottom}px !important;`
            : ""
        }
        ${
          desktopLeftRight
            ? `padding-left: ${desktopLeftRight}px !important; padding-right: ${desktopLeftRight}px !important;`
            : ""
        }
      }
      
      section[data-section-id="${section.getAttribute(
        "data-section-id"
      )}"] > div {
        grid-template-columns: ${getGridTemplateColumns(desktopColumns)};
      }
      
      /* 섹션 ${index + 1} - 모바일 스타일 */
      @media (max-width: 768px) {
        section[data-section-id="${section.getAttribute("data-section-id")}"] {
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
        
        section[data-section-id="${section.getAttribute(
          "data-section-id"
        )}"] > div {
          grid-template-columns: ${getGridTemplateColumns(
            finalMobileColumns
          )} !important;
          gap: 8px !important;
        }
      }
        `;
    })
    .join("\n");
};

// Grid 템플릿 컬럼 변환 함수
const getGridTemplateColumns = (columns: string): string => {
  switch (columns) {
    case "1":
      return "1fr";
    case "1-1":
      return "1fr 1fr";
    default:
      return "1fr";
  }
};
