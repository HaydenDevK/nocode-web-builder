"use client";

import styles from "./page.module.scss";
import { Box, Button, Typography } from "@mui/material";
import Card from "@/components/Card";
import { useState, useEffect } from "react";
import { TDraft } from "./model/types";
import { useRouter } from "next/navigation";

const sampleThumbnail =
  "https://img-wixmp-09d1505942a280459f0fa212.wixmp.com/images/site-snapshotter-web/9942c07d-5870-4eaa-b813-23ec87f4eb28/v1/fit/w_370,h_370/file.jpg";

const TemplateList = [
  { id: 1, title: "프로모션 페이지", thumbnail: sampleThumbnail },
  { id: 2, title: "과정 안내 페이지", thumbnail: sampleThumbnail },
  { id: 3, title: "과정 안내 페이지", thumbnail: sampleThumbnail },
  { id: 4, title: "과정 안내 페이지", thumbnail: sampleThumbnail },
];

const DeployedList = [
  {
    id: 3,
    title: "2025 프론트엔드 과정 안내",
    thumbnail: sampleThumbnail,
  },
  { id: 4, title: "2025 백엔드 과정 안내", thumbnail: sampleThumbnail },
];

export default function Home() {
  const [drafts, setDrafts] = useState<TDraft[]>([]);
  const router = useRouter();

  const loadDrafts = () => {
    const saveDrafts = JSON.parse(
      localStorage.getItem("builder-drafts") || "[]"
    );
    setDrafts(saveDrafts);
  };

  useEffect(() => {
    const saveDrafts = JSON.parse(
      localStorage.getItem("builder-drafts") || "[]"
    ) as TDraft[];
    setDrafts(saveDrafts);
  }, []);

  return (
    <Box className={styles.container}>
      <header className={styles.header}>
        <Typography variant="h1" color="primary">
          Codelt Web Builder
        </Typography>
        <Button
          variant="contained"
          color="info"
          size="large"
          onClick={() => router.push("/builder")}
        >
          새로 만들기
        </Button>
      </header>

      <Box className={styles.contentWrapper}>
        {/* 템플릿 저장 가능 시 활성화 */}
        {/* <Box className={styles.section}>
          <Typography variant="h4" color="mono" gutterBottom>
            템플릿
          </Typography>
          <Box className={styles.grid}>
            {TemplateList.map((item) => (
              <Card key={item.id} item={{ ...item, type: "template" }} />
            ))}
          </Box>
        </Box> */}

        {/* 배포된 사이트 관리 가능 시 활성화 */}
        {/* <Box className={styles.section}>
          <Typography variant="h4" color="mono" gutterBottom>
            배포된 사이트
          </Typography>
          <Box className={styles.grid}>
            {DeployedList.map((item) => (
              <Card key={item.id} item={{ ...item, type: "deployed" }} />
            ))}
          </Box>
        </Box> */}
        <Box className={styles.section}>
          <Typography variant="h4" color="mono" gutterBottom>
            임시 저장 목록
          </Typography>
          <Box className={styles.grid}>
            {drafts.map((item) => (
              <Card
                key={item.id}
                item={{ ...item, type: "draft" }}
                loadDrafts={loadDrafts}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
