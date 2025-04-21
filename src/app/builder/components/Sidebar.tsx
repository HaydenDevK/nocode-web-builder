"use client";

import Editor from "@/components/Editor";
import styles from "../styles/Sidebar.module.scss";

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
        <div className={styles.deletePosition}>
          <button className={styles.deleteButton}>삭제</button>
        </div>
      </List>

      <Editor />
    </div>
  );
}
