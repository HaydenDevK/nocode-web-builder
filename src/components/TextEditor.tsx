"use client";

import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const TextEditor = () => (
  <Stack spacing={2}>
    <Typography variant="h4" color="mono">
      편집
    </Typography>

    <Divider />

    <Typography variant="h6" color="mono">
      Font
    </Typography>
    <FormControl fullWidth>
      <Select id="font-select" value={"sans"}>
        <MenuItem value="sans">Sans-serif</MenuItem>
        <MenuItem value="serif">Serif</MenuItem>
        <MenuItem value="mono">Monospace</MenuItem>
      </Select>
    </FormControl>
    <Typography variant="h6" color="mono">
      Text Size
    </Typography>
    <FormControl fullWidth>
      <Select id="text-size-select" value={"h1"}>
        <MenuItem value="h1">Heading 1</MenuItem>
        <MenuItem value="h2">Heading 2</MenuItem>
        <MenuItem value="h3">Heading 3</MenuItem>
        <MenuItem value="h4">Heading 4</MenuItem>
        <MenuItem value="h5">Heading 5</MenuItem>
        <MenuItem value="h6">Heading 6</MenuItem>
        <MenuItem value="body1">Body 1</MenuItem>
        <MenuItem value="body2">Body 2</MenuItem>
      </Select>
    </FormControl>
    <Typography variant="h6" color="mono">
      Font Weight
    </Typography>
    <FormControl fullWidth>
      <Select id="font-weight-select" value={"normal"}>
        <MenuItem value="normal">Normal</MenuItem>
        <MenuItem value="bold">Bold</MenuItem>
        <MenuItem value="lighter">Lighter</MenuItem>
      </Select>
    </FormControl>
    <Typography variant="h6" color="mono">
      Text Color
    </Typography>
    <TextField id="text-color" fullWidth type="color" />
    <Typography variant="h6" color="mono">
      Background Color
    </Typography>
    <TextField id="bg-color" fullWidth type="color" />
    <Typography variant="h6" color="mono">
      Padding
    </Typography>
    <TextField id="padding" type="number" defaultValue="0" />
    <Typography variant="h6" color="mono">
      Radius
    </Typography>
    <TextField id="radius" type="number" defaultValue="0" />
    <Typography variant="h6" color="mono">
      Content
    </Typography>
    <TextField id="content" multiline maxRows={10} />

    <Divider />

    <Button variant="contained" color="warning" size="large" onClick={() => {}}>
      삭제
    </Button>
  </Stack>
);

export default TextEditor;
