import { screenReaderText, show, hide } from "../mixins/appearance";

export default `
  .screen-reader-text {
    ${screenReaderText}
  }

  .bg-white {
    background-color: var(--color-base-neutral-white);
  }

  .bg-accent-primary {
    background-color: var(--color-accent-primary);
  }

  .bg-accent-secondary {
    background-color: var(--color-accent-primary-off-white);
  }

  .bg-neutral05 {
    background-color: var(--color-base-neutral05);
  }

  .bg-neutral10 {
    background-color: var(--color-base-neutral10);
  }

  .bg-neutral90 {
    background-color: var(--color-base-neutral90);
  }

  .bg-neutral95 {
    background-color: var(--color-base-neutral95);
  }

  .show-50 {
    ${show(50)}
  }

  .show-60 {
    ${show(60)}
  }

  .show-75 {
    ${show(75, "block")}
  }

  .hide-60 {
    ${hide(60)}
  }

  .hide-75 {
    ${hide(75)}
  }

  .rel {
    position: relative;
  }

  .no-focus-outline:focus-visible {
    outline: 0;
  }

  /* Icon styles */
  .icon-notes-unique {
    fill: transparent;

    &__foreground {
      fill: var(--strong-color);
    }

    &__background {
      fill: var(--box-medium-bg-color);
    }
  }
`;
