import annotation from "./annotation";
import buttons from "./buttons";
import checkboxes from "./checkboxes";
import collapse from "./collapse";
import commentMore from "./commentMore";
import confirmableButton from "./confirmableButton";
import contentPlaceholder from "./contentPlaceholder";
import demoAnimation from "./demoAnimation";
import dialog from "./dialog";
import drawer from "./drawer";
import fatalError from "./fatalError";
import forms from "./forms";
import header from "./header";
import instructionalCopy from "./instructionalCopy";
import listTotal from "./listTotal";
import loadingBar from "./loadingBar";
import nestedNav from "./nestedNav";
import notifications from "./notifications";
import overlay from "./overlay";
import paginationCount from "./paginationCount";
import search from "./search";
import sectionHeading from "./sectionHeading";
import sectionHeadingSecondary from "./sectionHeadingSecondary";
import signInUpUpdate from "./signInUpUpdate";
import shareNavPrimary from "./shareNavPrimary";
import skipToMain from "./skipToMain";
import table from "./table";
import userMenu from "./userMenu";
import utility from "./utility";

export default `
  ${forms}
  ${fatalError}
  ${buttons}
  ${confirmableButton}
  ${contentPlaceholder}
  ${demoAnimation}
  ${drawer}
  ${utility}
  ${listTotal}
  ${overlay}
  ${checkboxes}
  ${header}
  ${notifications}
  ${loadingBar}
  ${sectionHeading}
  ${sectionHeadingSecondary}
  ${shareNavPrimary}
  ${userMenu}
  ${instructionalCopy}
  ${search}
  ${nestedNav}
  ${skipToMain}
  ${signInUpUpdate}
  ${table}
  ${paginationCount}
  ${annotation}
  ${commentMore}
  ${dialog}
  ${collapse}
`;
