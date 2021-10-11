import { utilityPrimary, defaultTransitionProps } from "theme/styles/mixins";

export default `
  .mode-button {
    ${utilityPrimary}
    display: inline-block;
    padding: 0.76em 1.7em;
    font-size: 11.18px;
    color: var(--header-foreground-color, var(--color-base-neutral75));
    text-decoration: none;
    letter-spacing: 0.134em;
    white-space: nowrap;
    border: 1px solid;
    border-radius: 4px;
    transition: color ${defaultTransitionProps},
      background-color ${defaultTransitionProps},
      border-color ${defaultTransitionProps};

    &:hover,
    &:focus-visible {
      color: var(--color-neutral-text-extra-dark);
      background-color: var(--color-interaction-light);
      border-color: var(--color-interaction-light);
      outline: 0;
    }

    .bg-neutral90 &,
    .user-links--dark &,
    .user-nav--dark & {
      &:hover,
      &:focus-visible {
        color: var(--color-base-neutral90);
      }
    }
  }
`;
