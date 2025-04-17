"use client";

import styles from "../styles/Canvas.module.scss";

export default function Canvas() {
  return (
    <div className={styles.canvas}>
      <div className={styles.section}>
        <h2>내용</h2>
        <p>이곳은 섹션입니다.</p>
      </div>

      <div className={styles.section}>
        <h3>이곳은 이미지 섹션입니다.</h3>
      </div>
    </div>
  );
}
