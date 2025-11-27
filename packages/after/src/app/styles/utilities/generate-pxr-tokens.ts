import { writeFileSync } from 'fs';
import { join } from 'path';

// 생성 범위 (원하면 200, 500, 1000 등으로 변경)
const MAX_PX = 200;

// px → rem 변환
const pxToRem = (px: number) => `${px / 16}rem`;

// pxr 토큰 생성
function generatePxrTokens(maxPx: number) {
  const lines = [];

  for (let px = 0; px <= maxPx; px++) {
    lines.push(`  --${px}pxr: ${pxToRem(px)};`);
  }

  return lines.join('\n');
}

// 출력 파일 경로
const OUTPUT = join(process.cwd(), './pxr-tokens.css');

// 최종 CSS 내용
const css = `
/* AUTO-GENERATED — DO NOT EDIT */
@theme {
${generatePxrTokens(MAX_PX)}
}
`.trim();

// 파일 생성
writeFileSync(OUTPUT, css);
console.log(`✓ pxr tokens generated → ${OUTPUT}`);
