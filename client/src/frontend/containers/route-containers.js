import NotFound from "global/containers/NotFound";
import ApiDocs from "frontend/containers/Api";
import Frontend from "frontend/containers/Frontend";
import ProjectsWrapper from "frontend/containers/ProjectsWrapper";
import Projects from "frontend/containers/Projects";
import ProjectCollections from "frontend/containers/ProjectCollections";
import ProjectCollectionDetail from "frontend/containers/ProjectCollectionDetail";
import ProjectWrapper from "frontend/containers/ProjectWrapper";
import ProjectDetail from "frontend/containers/ProjectDetail";
import ProjectSearch from "frontend/containers/ProjectSearch";
import ProjectResources from "frontend/containers/ProjectResources";
import ResourceDetail from "frontend/containers/ResourceDetail";
import ProjectResourceCollections from "frontend/containers/ProjectResourceCollections";
import ResourceCollectionDetail from "frontend/containers/ResourceCollectionDetail";
import EventList from "frontend/containers/EventList";
import Featured from "frontend/containers/Featured";
import Search from "frontend/containers/Search";
import Contact from "frontend/containers/Contact";
import PasswordReset from "frontend/containers/PasswordReset";
import Page from "frontend/containers/Page";
import Subscriptions from "frontend/containers/Subscriptions";
import Unsubscribe from "frontend/containers/Unsubscribe";
import Home from "frontend/containers/Home";
import ReadingGroups from "frontend/containers/ReadingGroups";
import ReadingGroupsList from "frontend/containers/ReadingGroups/List";
import ReadingGroupsNew from "frontend/containers/ReadingGroups/New";
import ReadingGroup from "frontend/containers/ReadingGroup";
import ReadingGroupMembers from "frontend/containers/ReadingGroup/Members";
import ReadingGroupMemberEdit from "frontend/containers/ReadingGroup/MemberEdit";
import ReadingGroupAnnotations from "frontend/containers/ReadingGroup/Annotations";
import ReadingGroupHomepage from "frontend/containers/ReadingGroup/Homepage";
import Login from "frontend/containers/Login";
import SignUp from "frontend/containers/SignUp";
import MyStarred from "frontend/containers/MyStarred";
import MyAnnotations from "frontend/containers/MyAnnotations";

export default {
  NotFound,
  ApiDocs,
  Frontend,
  ProjectsWrapper,
  Projects,
  ProjectCollections,
  ProjectCollectionDetail,
  ProjectWrapper,
  ProjectDetail,
  ProjectSearch,
  ProjectResources,
  ResourceDetail,
  ProjectResourceCollections,
  ResourceCollectionDetail,
  EventList,
  Featured,
  Search,
  Contact,
  PasswordReset,
  Page,
  Subscriptions,
  Unsubscribe,
  Home,
  ReadingGroups,
  ReadingGroupsList,
  ReadingGroupsNew,
  ReadingGroup,
  ReadingGroupMembers,
  ReadingGroupMemberEdit,
  ReadingGroupAnnotations,
  ReadingGroupHomepage: ReadingGroupHomepage.Wrapper,
  ReadingGroupHomepageStatic: ReadingGroupHomepage.Static,
  ReadingGroupHomepageEdit: ReadingGroupHomepage.Edit,
  Login,
  SignUp,
  MyStarred,
  MyAnnotations
};
