import { addBlock, getAllBlocks, Block, getBlock } from "./db/db";
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
      async onPageSelected(block: Block) {
        const dbBlock = await getBlock(block.localId);
        if (dbBlock) {
          editPage.setBlock(dbBlock);
        }
      },
    })
  );

  root.append(editPage.el);
}

init();
