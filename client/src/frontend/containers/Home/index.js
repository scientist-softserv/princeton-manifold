import React from "react";
import PropTypes from "prop-types";
import Collections from "./Collections";
import Projects from "./Projects";
import Feature from "./Feature";
import CollectionNavigation from "frontend/components/composed/CollectionNavigation";
import EventTracker, { EVENTS } from "global/components/EventTracker";
import { useFromStore } from "hooks";
import { useLocation } from "react-router-dom";

export default function HomeContainer() {
  const settings = useFromStore("settings", "select");
  const { showProjects, hasVisibleProjects } =
    settings?.attributes?.calculated ?? {};
  const authentication = useFromStore("authentication");
  const location = useLocation();

  return (
    <div
      style={{
        overflowX: "hidden"
      }}
    >
      <EventTracker event={EVENTS.VIEW_LIBRARY} />
      <Feature authentication={authentication} />
      {showProjects ? (
        <Projects location={location} authentication={authentication} />
      ) : (
        <Collections />
      )}
      {hasVisibleProjects && <CollectionNavigation />}
    </div>
  );
}
