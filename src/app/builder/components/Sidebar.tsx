"use client";

import styles from "../styles/Sidebar.module.scss";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>생성</h3>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="SECTION" className={styles.text} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="TEXT" className={styles.text} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="IMAGE" className={styles.text} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <h3 className={styles.title}>편집</h3>
      <List>
        <ListItemText className={styles.text}>배경색</ListItemText>
        <ListItemText className={styles.text}>그리드</ListItemText>
        <ListItemButton className={styles.deleteButton}>
          <ListItemText
            primary="삭제"
            className={styles.deleteText}
          ></ListItemText>
        </ListItemButton>
      </List>
    </div>
  );
}
