"use client";

import { Box, Button, Typography } from "@mui/material";
import styles from "./card.module.scss";
import { useRouter } from "next/navigation";
import { useBuilderStore } from "@/app/store/useBuilderStore";

type CardProps = {
  item: {
    id: number | string;
    title: string;
    thumbnail?: string;
    type: "template" | "deployed" | "draft";
  };
};

export default function Card({ item }: CardProps) {
  const router = useRouter();
  const { loadDraft } = useBuilderStore();

  const handleEdit = () => {
    if (item.type === "draft") {
      loadDraft(item.id.toString());
      router.push("/builder");
    }
  };

  const baseButtons = (
    <>
      <Button
        variant="outlined"
        color="info"
        className={styles.actionBtn}
        onClick={handleEdit}
      >
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
          style={{
            backgroundImage: item.thumbnail ? `url(${item.thumbnail})` : "none",
          }}
        >
          <Box className={styles.overlay}>
            <Box className={styles.buttonGroup}>
              {baseButtons}
              {item.type === "template" && (
                <Button
                  variant="outlined"
                  color="info"
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
