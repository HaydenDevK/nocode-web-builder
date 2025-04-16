"use client";

import { Box, Button, Typography } from "@mui/material";
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
      <Button variant="outlined" color="primary" className={styles.actionBtn}>
        편집
      </Button>
      <Button variant="outlined" color="warning" className={styles.actionBtn}>
        삭제
      </Button>
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
                <Button
                  variant="outlined"
                  color="primary"
                  className={styles.actionBtn}
                >
                  이 템플릿으로 만들기
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Typography
          variant="body1"
          color="text.primary"
          className={styles.cardTitle}
        >
          {item.title}
        </Typography>
      </Box>
    </Box>
  );
}
