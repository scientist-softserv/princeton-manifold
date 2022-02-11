import React, { useState, useCallback } from "react";
import lh from "helpers/linkHandler";
import HeadContent from "global/components/HeadContent";
import EntityCollection from "frontend/components/composed/EntityCollection";
import CollectionNavigation from "frontend/components/composed/CollectionNavigation";
import { getEntityCollection } from "frontend/components/collecting/helpers";

import {
  useDispatchMyCollected,
  useSelectMyCollected,
  useCurrentUser
} from "hooks";
import Authorize from "hoc/Authorize";

function MyStarredContainer() {
  const [fetchVersion, setFetchVersion] = useState({
    projects: 1,
    texts: 1,
    text_sections: 1,
    resource_collections: 1,
    resources: 1
  });

  useDispatchMyCollected("projects", fetchVersion.projects);
  useDispatchMyCollected("texts", fetchVersion.texts);
  useDispatchMyCollected("text_sections", fetchVersion.text_sections);
  useDispatchMyCollected(
    "resource_collections",
    fetchVersion.resource_collections
  );
  useDispatchMyCollected("resources", fetchVersion.resources);

  const responses = {
    projects: useSelectMyCollected("projects"),
    texts: useSelectMyCollected("texts"),
    textSections: useSelectMyCollected("text_sections"),
    resourceCollections: useSelectMyCollected("resource_collections"),
    resources: useSelectMyCollected("resources")
  };
  const currentUser = useCurrentUser();
  const collection = getEntityCollection(currentUser);

  const onUncollect = useCallback(type => {
    setFetchVersion(prevState => {
      return {
        ...prevState,
        [type]: prevState[type] + 1
      };
    });
  }, []);

  return (
    <Authorize
      kind="any"
      failureRedirect={lh.link("frontendLogin")}
      failureNotification
    >
      <HeadContent title="My Starred" appendTitle />
      <EntityCollection.MyStarred
        collection={collection}
        responses={responses}
        onUncollect={onUncollect}
      />
      <CollectionNavigation />
    </Authorize>
  );
}

export default MyStarredContainer;
