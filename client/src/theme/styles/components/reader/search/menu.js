import {
  defaultTransitionProps,
  defaultHoverStyle,
  respond,
  rgba,
  fluidScale,
  tailUp
} from "theme/styles/mixins";
import { headerLayout } from "theme/styles/variables/crossComponent";

export default `
  /* Search Menu button and panel global styles (see header styles for context specific styles) */
  .button-search {
    height: 100%;
    color: var(--color-neutral-text-dark);
    color: var(--header-foreground-color, var(--color-neutral-text-dark));
    vertical-align: middle;
    background: transparent;
    border: 0;
    border-radius: 0;
    outline: none;
    appearance: none;

    .header-app & {
      --tail-height: 17px;
      transition: color ${defaultTransitionProps};

      &.button-active,
      &:focus-visible {
        ${defaultHoverStyle}
        outline: 0;
      }

      &::after {
        ${tailUp()}
        position: absolute;
        top: calc(100% - var(--tail-height));
        bottom: 14px;
        left: 50%;
        display: block;
        margin-left: -15px;
        content: "";
        opacity: 0;
        transition: transform ${defaultTransitionProps},
          opacity ${defaultTransitionProps};
        transform: translateY(-1 * ${headerLayout.menuSlideDistance});
      }

      &.button-active::after {
        z-index: 1;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .search-menu {
    --focus-color: var(--color-neutral-ui-dark);

    position: absolute;
    right: calc(-1 * var(--container-padding-responsive-global));
    width: 100vw;
    max-width: 100vw;
    white-space: nowrap;
    background-color: var(--color-base-neutral10);

    .header-app & {
      z-index: 1; /* ensure menu is on top of .header-app */
      padding: 28px 22px 22px;
      border-radius: var(--box-border-radius);
      box-shadow: 5px 15px 35px 8px ${rgba("neutralBlack", 0.13)};

      ${respond(`padding: 20px 24px 22px;`, 40)}
    }

    .reader-header & {
      width: auto;
      padding: 20px ${fluidScale("30px", "18px")} ${fluidScale("19px", "12px")};
    }

    ${respond(`width: auto;`, 70)}

    ${respond(`right: calc(-1 * var(--container-padding-full));`, 120)}
  }
`;
