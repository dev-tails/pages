import { Button } from "./Button";
import { Block, removeBlock, updateBlock } from "./db/db";
import { Div } from "./Div";
import { setStyle } from "./setStyle";

type EditPageState = {
  block: Block | null;
};

export const EditPage = () => {
  const state: EditPageState = {
    block: null,
  };

  const el = Div();
  setStyle(el, {
    padding: "8px",
    width: "100%",
  });

  const topContent = Div();
  setStyle(topContent, {
    display: "flex",
    justifyContent: "space-between",
  });
  el.append(topContent);

  const title = Div();
  title.contentEditable = "true";
  setStyle(title, {
    outline: "none",
    fontWeight: "bold",
    fontSize: "1.2em",
    whiteSpace: "pre-wrap",
  });

  title.addEventListener("blur", async () => {
    const newTitleText = title.innerText;
    if (newTitleText !== state.block?.body) {
      const newBlock = {
        ...state.block,
        body: newTitleText,
      };
      updateBlock(newBlock);
      await updateBlock(newBlock);
      state.block = newBlock;
    }
  });

  const btnDelete = Button({
    text: "x",
    onClick() {
      removeBlock(state.block?.localId);
      setBlock(null);
    },
  });
  setStyle(btnDelete, {
    visibility: "hidden",
  });

  topContent.append(title);
  topContent.append(btnDelete);

  const body = Div();
  body.contentEditable = "true";
  setStyle(body, {
    outline: "none",
    whiteSpace: "pre-wrap",
  });

  body.addEventListener("blur", async () => {
    const newContentText = body.innerText;
    if (newContentText !== state.block?.content) {
      const newBlock = {
        ...state.block,
        content: newContentText,
      };
      await updateBlock(newBlock);
      state.block = newBlock;
    }
  });

  function setBlock(block: Block | null) {
    state.block = block;

    title.innerText = block?.body || "";
    body.innerHTML = block?.content || "";

    setStyle(btnDelete, {
      visibility: "",
    });
  }

  el.append(body);
  return {
    el,
    setBlock,
  };
};
