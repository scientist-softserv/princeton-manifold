import { defaultTransitionProps, textTruncate } from "theme/styles/mixins";

export default `
  .annotation-tag {
    display: flex;
    align-items: center;
    width: 166px;
    overflow: hidden;
    font-size: 14px;
    color: var(--color);
    background-color: var(--box-bg-color);
    border-radius: 12px;

    &__inner {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      min-width: 0;
      padding: 2px 10px 3px;
      line-height: 1.4;

      & + & {
        padding-left: 8px;
      }

      > * + * {
        margin-left: 4px;
      }

      &--dark {
        flex-shrink: 0;
        background-color: var(--darker-tag-bg-color);
        transition: background-color ${defaultTransitionProps};
      }
    }

    &__text {
      ${textTruncate}

      &--count {
        letter-spacing: 0.083em;
        transform: translateY(-0.5px);
      }
    }

    &__icon {
      flex-shrink: 0;

      &.svg-icon--interactComment16 {
        transform: translateY(0.5px);
      }
    }
  }
`;
