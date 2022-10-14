import { Block } from "./db/db";
import { Div } from "./Div";
import { setStyle } from "./setStyle";

export const EditPage = () => {
  const el = Div();
  setStyle(el, {
    padding: "8px"
  })

  const title = Div();
  title.contentEditable = "true";
  setStyle(title, {
    outline: "none"
  })

  title.addEventListener("blur", () => {

  });

  el.append(title);

  const body = Div();
  body.contentEditable = "true";
  setStyle(body, {
    outline: "none"
  })

  function setBlock(block: Block) {
    title.innerText = block.body || "";
    body.innerHTML = block.content || "";
  }

  el.append(body);
  return {
    el,
    setBlock
  }
};