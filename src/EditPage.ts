import { Button } from "./Button";
import { Block, removeBlock } from "./db/db";
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
    width: "100%"
  });

  const topContent = Div();
  setStyle(topContent, {
    display: "flex",
    justifyContent: "space-between"
  });
  el.append(topContent);

  const title = Div();
  title.contentEditable = "true";
  setStyle(title, {
    outline: "none",
  });

  title.addEventListener("blur", () => {});

  const btnDelete = Button({
    text: "x",
    onClick() {
      removeBlock(state.block?.localId);
    },
  });
  setStyle(btnDelete, {
    visibility: "hidden"
  })

  topContent.append(title);
  topContent.append(btnDelete);

  const body = Div();
  body.contentEditable = "true";
  setStyle(body, {
    outline: "none",
  });

  function setBlock(block: Block) {
    state.block = block;

    title.innerText = block.body || "";
    body.innerHTML = block.content || "";

    setStyle(btnDelete, {
      visibility: ""
    })
  }

  el.append(body);
  return {
    el,
    setBlock,
  };
};
