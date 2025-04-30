"use client";

import {
  Typography,
  Slider,
  TextField,
  Stack,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useBuilderStore } from "@/app/store/useBuilderStore";
import { nanoid } from "nanoid";
import {
  Columns2,
  Columns3,
  Columns4,
  PanelLeft,
  PanelRight,
  Square,
} from "lucide-react";
import { useViewportStore } from "@/app/store/useViewportStore";

const desktopColumnOptions = [
  { label: "1", value: "1", icon: Square },
  { label: "1:1", value: "1-1", icon: Columns2 },
  { label: "1:1:1", value: "1-1-1", icon: Columns3 },
  { label: "1:1:1:1", value: "1-1-1-1", icon: Columns4 },
  { label: "2:1", value: "2-1", icon: PanelLeft },
  { label: "1:2", value: "1-2", icon: PanelRight },
];

const mobileColumnOptions = [
  { label: "1", value: "1", icon: Square },
  { label: "1:1", value: "1-1", icon: Columns2 },
];

export default function SectionEditor({ sectionId }: { sectionId: string }) {
  const section = useBuilderStore((state) => state.sections.byId[sectionId]);
  const updateSectionProps = useBuilderStore(
    (state) => state.updateSectionProps
  );
  const addElement = useBuilderStore((state) => state.addElement);
  const elements = useBuilderStore((state) => state.elements.byId);
  const mode = useViewportStore((s) => s.mode);

  if (!section) return null;

  const handlePropsChange = (key: keyof typeof section.props, value: any) => {
    updateSectionProps(sectionId, { [key]: value });
  };

  const handleCloneSection = () => {
    const newSectionId = `section-${nanoid()}`;

    useBuilderStore.setState((state) => {
      state.sections.byId[newSectionId] = {
        id: newSectionId,
        props: { ...section.props },
        elementIds: [],
      };
      state.sections.allIds.push(newSectionId);
    });

    section.elementIds.forEach((elId) => {
      const originalElement = elements[elId];
      const newElementId = `element-${nanoid()}`;

      const clonedElement = {
        id: newElementId,
        sectionId: newSectionId,
        type: originalElement.type,
        props: { ...originalElement.props },
      };

      addElement(clonedElement);
    });
  };

  return (
    <Stack spacing={2}>
      {/* 컬럼 설정 */}
      <Typography variant="h6" color="mono">
        {mode === "desktop" ? "Desktop Columns" : "Mobile Columns"}
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={1}>
        {(mode === "desktop" ? desktopColumnOptions : mobileColumnOptions).map(
          ({ label, value, icon: Icon }) => (
            <Tooltip key={value} title={label}>
              <IconButton
                onClick={() =>
                  handlePropsChange(
                    mode === "desktop" ? "desktopColumns" : "mobileColumns",
                    value
                  )
                }
                color={
                  (mode === "desktop"
                    ? section.props.desktopColumns
                    : section.props.mobileColumns) === value
                    ? "primary"
                    : "default"
                }
                sx={{
                  border: "1px dashed #ccc",
                  width: "30%",
                  aspectRatio: "1 / 1",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#999",
                  },
                }}
              >
                {Icon ? (
                  <Icon size={28} />
                ) : (
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#ccc",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
          )
        )}
      </Stack>
      <Typography variant="h6" color="mono">
        Section Settings
      </Typography>
      <TextField
        fullWidth
        type="color"
        value={section.props.backgroundColor}
        onChange={(e) => handlePropsChange("backgroundColor", e.target.value)}
      />
      {mode === "desktop" && (
        <>
          <Typography variant="h6" color="mono">
            Desktop Vertical Padding
          </Typography>
          <Slider
            value={section.props.paddingDesktopTopBottom || 0}
            onChange={(_, value) =>
              handlePropsChange("paddingDesktopTopBottom", value)
            }
            step={1}
            min={0}
            max={100}
          />
          <Typography variant="body2" color="text.secondary">
            {section.props.paddingDesktopTopBottom || 0}px
          </Typography>

          <Typography variant="h6" color="mono">
            Desktop Horizontal Padding
          </Typography>
          <Slider
            value={section.props.paddingDesktopLeftRight || 0}
            onChange={(_, value) =>
              handlePropsChange("paddingDesktopLeftRight", value)
            }
            step={1}
            min={0}
            max={100}
          />
          <Typography variant="body2" color="text.secondary">
            {section.props.paddingDesktopLeftRight || 0}px
          </Typography>
        </>
      )}
      {mode === "mobile" && (
        <>
          <Typography variant="h6" color="mono">
            Mobile Vertical Padding
          </Typography>
          <Slider
            value={section.props.paddingMobileTopBottom || 0}
            onChange={(_, value) =>
              handlePropsChange("paddingMobileTopBottom", value)
            }
            step={1}
            min={0}
            max={100}
          />
          <Typography variant="body2" color="text.secondary">
            {section.props.paddingMobileTopBottom || 0}px
          </Typography>

          <Typography variant="h6" color="mono">
            Mobile Horizontal Padding
          </Typography>
          <Slider
            value={section.props.paddingMobileLeftRight || 0}
            onChange={(_, value) =>
              handlePropsChange("paddingMobileLeftRight", value)
            }
            step={1}
            min={0}
            max={100}
          />
          <Typography variant="body2" color="text.secondary">
            {section.props.paddingMobileLeftRight || 0}px
          </Typography>
        </>
      )}

      {/* Radius 설정 */}
      <Typography variant="h6" color="mono">
        Radius
      </Typography>
      <Slider
        value={section.props.radius || 0}
        onChange={(_, value) => handlePropsChange("radius", value)}
        step={1}
        min={0}
        max={100}
      />

      <Button variant="outlined" color="primary" onClick={handleCloneSection}>
        섹션 복제
      </Button>
    </Stack>
  );
}
