/* eslint-disable camelcase */
import { Transforms } from "slate";
import { html_beautify } from "js-beautify";

export const clearSlate = editor => {
  const count = Array(editor.children.length).keys();
  [...count].forEach(() => {
    try {
      Transforms.removeNodes(editor, { at: [0] });
    } catch (e) {
      console.log(e);
    }
  });
};

export const formatHtml = html => {
  const options = {
    indent_size: "4",
    indent_char: " ",
    max_preserve_newlines: "2",
    preserve_newlines: true,
    end_with_newline: false,
    wrap_line_length: "0",
    indent_inner_html: true,
    inline: []
  };

  return html_beautify(html, options);
};

export const isValidUrl = str => {
  try {
    return Boolean(new URL(str));
  } catch (e) {
    return false;
  }
};

export const isImageUrl = url => {
  if (!url) return false;
  if (!isValidUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return ["gif", "jpg", "jpeg", "png"].includes(ext);
};
