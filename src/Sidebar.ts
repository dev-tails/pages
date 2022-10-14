import { Button } from "./Button";
import { addBlock, Block, getAllBlocks } from "./db/db";
import { Div } from "./Div";
import { setStyle } from "./setStyle";

type SidebarProps = {
  onCreatePage: (block: Block) => void;
}

export const Sidebar = async ({ onCreatePage }: SidebarProps) => {
  const blocks = await getAllBlocks();

  const el = Div();
  setStyle(el, {
    maxWidth: "200px",
    width: "30%",
    borderRight: "1px solid black",
    padding: "8px"
  });

  const nav = Div();
  setStyle(nav, {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid black"
  })
  el.append(nav);

  const btnHideSidebar = Button({
    text: "x",
    onClick() {

    }
  });
  nav.append(btnHideSidebar)

  const btnAddPage = Button({
    text: "+",
    async onClick() {
      const newBlock = await addBlock({ body: "New Page" });
      onCreatePage(newBlock);
    }
  });
  nav.append(btnAddPage);

  for (const block of blocks) {
    el.append(SidebarItem({ block }))
  }

  return el;
}

function SidebarItem({ block }: { block: Block }) {
  const el = Div();

  el.innerText = block.body || "";

  return el;
}