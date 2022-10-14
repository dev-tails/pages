import { addBlock, getAllBlocks, Block } from "./db/db";
import { Div } from "./Div";
import { EditPage } from "./EditPage";
import { setStyle } from "./setStyle";
import { Sidebar } from "./Sidebar";

async function init() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceworker.js");
  }

  const root = document.getElementById("root");
  if (!root) {
    return;
  }

  setStyle(root, {
    display: "flex",
    height: "100vh",
  });

  const editPage = EditPage();

  root.append(
    await Sidebar({
      onPageSelected(block) {
        editPage.setBlock(block);
      },
    })
  );

  root.append(editPage.el);
}

init();
