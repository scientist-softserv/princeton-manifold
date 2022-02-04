import React from "react";
import PropTypes from "prop-types";
import CollectionNavigation from "frontend/components/composed/CollectionNavigation";
import EntityCollection from "frontend/components/composed/EntityCollection/EntityCollection";
import EntityHero from "frontend/components/composed/EntityHero";
import ContentBlockList from "frontend/components/content-block-list/List";
import { Warning } from "frontend/components/content-block/parts";
import { useFromStore } from "hooks";
import { useFrontendModeContext } from "hooks";
import Authorize from "hoc/Authorize";

function Detail({ issue }) {
  const { isStandalone } = useFrontendModeContext();
  const settings = useFromStore("settings", "select");
  const libraryDisabled = settings?.attributes?.general?.libraryDisabled;

  return (
    <>
      <EntityHero.Issue entity={issue} />
      <Authorize entity={issue} ability="fullyRead" successBehavior="hide">
        <EntityCollection
          BodyComponent={() => <Warning.AccessDenied entity={issue} />}
        />
      </Authorize>
      <ContentBlockList entity={issue} />
      {!isStandalone && !libraryDisabled && (
        <CollectionNavigation entityType="journals" bgColor="neutral05" />
      )}
    </>
  );
}

Detail.displayName = "Issue.Detail";

Detail.propTypes = {
  issue: PropTypes.object.isRequired
};

export default Detail;
