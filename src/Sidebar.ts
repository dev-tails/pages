import { Button } from "./Button";
import { addBlock, Block, getAllBlocks, onBlockRemoved } from "./db/db";
import { Div } from "./Div";
import { setStyle } from "./setStyle";

type SidebarProps = {
  onPageSelected: (block: Block) => void;
};

export const Sidebar = async ({ onPageSelected }: SidebarProps) => {
  const blocks = await getAllBlocks();

  const el = Div();
  setStyle(el, {
    maxWidth: "200px",
    width: "30%",
    borderRight: "1px solid black",
    padding: "8px",
  });

  const nav = Div();
  setStyle(nav, {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid black",
  });
  el.append(nav);

  const btnHideSidebar = Button({
    text: "x",
    onClick() {},
  });
  nav.append(btnHideSidebar);

  const btnAddPage = Button({
    text: "+",
    async onClick() {
      const newBlock = await addBlock({ body: "New Page" });
      onPageSelected(newBlock);
    },
  });
  nav.append(btnAddPage);

  const sidebarItems: HTMLDivElement[] = [];
  for (const block of blocks) {
    const sidebarItem = SidebarItem({ block });
    sidebarItems.push(sidebarItem);

    sidebarItem.addEventListener("click", onPageSelected.bind(this, block));

    el.append(sidebarItem);
  }

  onBlockRemoved((id) => {
    const blockIndex = blocks.findIndex((b) => {
      return b.localId === id;
    });
    if (blockIndex >= 0) {
      blocks.splice(blockIndex, 1);
      sidebarItems[blockIndex].remove();
      sidebarItems.splice(blockIndex, 1);
    }
  });

  return el;
};

function SidebarItem({ block }: { block: Block }) {
  const el = Div();

  el.innerText = block.body || "";

  return el;
}
