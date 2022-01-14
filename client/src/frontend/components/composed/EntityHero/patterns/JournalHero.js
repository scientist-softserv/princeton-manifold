import React, { useRef } from "react";
import PropTypes from "prop-types";
import { CalloutList, Meta, Social, Title } from "../parts";
import EntityMasthead from "frontend/components/composed/EntityMasthead";
import EntityHero from "../EntityHero";
import { getAuth, getPartsData } from "../helpers";
import Authorization from "helpers/authorization";

export default function JournalHero({ entity, mock }) {
  const authorization = useRef(new Authorization());
  const { showErrors, authorized } = getAuth(entity, authorization);
  const {
    callouts,
    orderedCallouts,
    twitter,
    instagram,
    facebook,
    hashtag,
    social,
    description,
    creators,
    contributors
  } = getPartsData(entity);
  return (
    <>
      <EntityMasthead entity={entity} />
      <EntityHero
        theme={"journal"}
        TitleComponent={({ isStandalone }) => (
          <Title entity={entity} isStandalone={isStandalone} />
        )}
        TopLeftComponent={
          <>
            {(creators || contributors || description) && (
              <Meta
                creators={creators}
                contributors={contributors}
                description={description}
              />
            )}
            {callouts && (
              <CalloutList
                authorized={authorized || mock}
                callouts={orderedCallouts}
                showErrors={showErrors || mock}
                mobileVisible
                buttonSize="sm"
              />
            )}
          </>
        }
        BottomLeftComponent={
          social && (
            <Social
              twitter={twitter}
              facebook={facebook}
              instagram={instagram}
              hashtag={hashtag}
            />
          )
        }
        TopRightComponent={
          <>
            {callouts && (
              <CalloutList
                authorized={authorized || mock}
                callouts={callouts}
                showErrors={showErrors || mock}
                buttonSize="sm"
              />
            )}
          </>
        }
      />
    </>
  );
}

JournalHero.displayName = "Frontend.Composed.EntityHero.Journal";

JournalHero.propTypes = {
  entity: PropTypes.object.isRequired
};
