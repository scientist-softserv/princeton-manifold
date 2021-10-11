import { listUnstyled } from "theme/styles/mixins";

export default `
  .search-results {
    .search-query + & {
      margin-top: 65px;
    }

    &__list {
      ${listUnstyled}
      margin: 14px 0;
      border-top: 1px solid var(--color-base-neutral40);
      border-bottom: 1px solid var(--color-base-neutral40);
    }
  }
`;
