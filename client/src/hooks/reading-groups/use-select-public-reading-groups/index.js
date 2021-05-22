import { useSelector } from "react-redux";
import { requests } from "api";
import { select, meta, loaded } from "utils/entityUtils";

export default function useSelectPublicReadingGroups() {
  const request = requests.fePublicReadingGroups;
  const readingGroups = useSelector(state =>
    select(request, state.entityStore)
  );
  const readingGroupsMeta = useSelector(state =>
    meta(request, state.entityStore)
  );
  const readingGroupsLoaded = useSelector(state =>
    loaded(request, state.entityStore)
  );

  return { readingGroups, readingGroupsMeta, readingGroupsLoaded };
}
