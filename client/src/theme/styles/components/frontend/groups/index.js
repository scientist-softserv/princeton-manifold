import actionPanel from "./actionPanel";
import pageHeading from "./pageHeading";
import pageBody from "./pageBody";
import removeMember from "./removeMember";
import childRouteNav from "./childRouteNav";
import homepageModeToggle from "./homepageModeToggle";
import settingsFormGroup from "./settingsFormGroup";
import settingsFormMember from "./settingsFormMember";
import collectionCategory from "./collectionCategory";
import collectablePlaceholderContent from "./collectablePlaceholderContent";
import homepageEditor from "./homepageEditor";
import groupsPageContainer from "./groupsPageContainer";

export default `
${actionPanel}
${collectablePlaceholderContent}
${collectionCategory}
${groupsPageContainer}
${homepageEditor}
${homepageModeToggle}
${pageBody}
${removeMember}
${settingsFormGroup}
${settingsFormMember}
${childRouteNav}
${pageHeading}
`;
