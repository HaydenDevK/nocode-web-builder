"use client";

import { Box } from "@mui/material";
import styles from "./card.module.scss";

type CardProps = {
  item: {
    id: number;
    title: string;
    thumbnail: string;
    type: "template" | "deployed";
  };
};

export default function Card({ item }: CardProps) {
  const baseButtons = (
    <>
      <button className={styles.actionBtn}>편집</button>
      <button className={styles.actionBtn}>삭제</button>
    </>
  );

  return (
    <Box className={styles.cardWrapper}>
      <Box className={styles.card}>
        <Box
          className={styles.thumbnail}
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        >
          <Box className={styles.overlay}>
            <Box className={styles.buttonGroup}>
              {baseButtons}
              {item.type === "template" && (
                <button className={styles.actionBtn}>
                  이 템플릿으로 만들기
                </button>
              )}
            </Box>
          </Box>
        </Box>
        <p className={styles.cardTitle}>{item.title}</p>
      </Box>
    </Box>
  );
}
