"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import { generateHTML } from "@/util/htmlExport";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { useIsEditingStore } from "@/app/store/useIsEditingStore";
import { useViewportStore } from "@/app/store/useViewportStore";

const DeployButton = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployDialog, setDeployDialog] = useState(false);
  const [deployUrl, setDeployUrl] = useState("");

  const setSelectedItemInfo = useBuilderStore((s) => s.setSelectedItemInfo);
  const setIsEditing = useIsEditingStore((s) => s.setIsEditing);
  const setMode = useViewportStore((s) => s.setMode);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployDialog(true);
    setDeployUrl("");
    setSelectedItemInfo(null);
    setIsEditing(false);
    setMode("desktop");

    setTimeout(async () => {
      try {
        const html = generateHTML();

        const response = await fetch("/api/deploy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html }),
        });

        const data = await response.json();
        const deployId = data.id;

        let deployStatus;
        do {
          const statusResponse = await fetch(
            `/api/deploy/status?id=${deployId}`
          );
          deployStatus = await statusResponse.json();
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } while (deployStatus.status === "pending");

        if (deployStatus.url) {
          setDeployUrl(deployStatus.url);
        } else {
          console.warn("❗️No URL from deploy status", deployStatus);
        }
      } catch (e) {
        console.error("Deployment error", e);
      } finally {
        setIsDeploying(false);
        setIsEditing(true);
      }
    }, 200);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleDeploy}>
        Deploy to Netlify
      </Button>

      <Dialog
        open={deployDialog}
        onClose={() => !isDeploying && setDeployDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        {isDeploying && <DialogTitle>Netlify에 배포 중...</DialogTitle>}

        <DialogContent>
          {isDeploying ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                사이트를 배포하고 있습니다...
              </Typography>
            </div>
          ) : deployUrl ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <CheckCircleOutlineIcon color="success" sx={{ fontSize: 48 }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                배포가 완료되었습니다!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={deployUrl}
                target="_blank"
                startIcon={<LaunchIcon />}
                sx={{ mt: 2 }}
              >
                사이트 열기
              </Button>
            </div>
          ) : (
            <Typography color="error" sx={{ p: 2 }}>
              배포에 실패했습니다. 다시 시도해주세요.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeployButton;
