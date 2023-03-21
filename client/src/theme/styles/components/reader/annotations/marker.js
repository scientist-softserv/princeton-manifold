import { styledUnderline } from "../../../mixins/typography";
import { annotationHighlightColors } from "../../../variables/colors";

const underlineStyleKeys = ["solid", "dashes", "dots", "wavy"];

const underlineStyles = color => {
  return underlineStyleKeys
    .map(
      style => `
        &.annotation-${style} {
          ${styledUnderline(style, color)}
        }
     `
    )
    .join("");
};

const defaultUnderline = (color = annotationHighlightColors.primaryBase) => `
  ${styledUnderline("solid", color)}
`;

export default `
  .annotation-underline {
    cursor: pointer;

    &:hover {
      color: inherit;
    }

    &.primary {
      ${defaultUnderline()}
      ${underlineStyles(annotationHighlightColors.primaryBase)}

      .scheme-dark & {
        ${defaultUnderline(annotationHighlightColors.primaryLight)}
        ${underlineStyles(annotationHighlightColors.primaryLight)}
      }
    }

    &.secondary {
      ${defaultUnderline(annotationHighlightColors.secondaryBase)}
      ${underlineStyles(annotationHighlightColors.secondaryBase)}

      .scheme-dark & {
        ${defaultUnderline(annotationHighlightColors.secondaryLight)}
        ${underlineStyles(annotationHighlightColors.secondaryLight)}
      }
    }

    &.tertiary {
      ${defaultUnderline(annotationHighlightColors.tertiaryBase)}
      ${underlineStyles(annotationHighlightColors.tertiaryBase)}

      .scheme-dark & {
        ${defaultUnderline(annotationHighlightColors.tertiaryLight)}
        ${underlineStyles(annotationHighlightColors.tertiaryLight)}
      }
    }
  }

  .annotation-highlight {
    cursor: pointer;

    &:hover {
      color: inherit;
    }

    &.primary {
      background-color: var(--color-annotation-primary-pale);

      .scheme-dark & {
        background-color: var(--color-annotation-primary-pale-low-contrast);
      }
    }

    &.secondary {
      background-color: var(--color-annotation-secondary-pale);

      .scheme-dark & {
        background-color: var(--color-annotation-secondary-pale-low-contrast);
      }
    }

    &.tertiary {
      background-color: var(--color-annotation-tertiary-pale);

      .scheme-dark & {
        background-color: var(--color-annotation-tertiary-pale-low-contrast);
      }
    }

    &.mixed {
      background-color: var(--color-annotation-mixed);
    }
  }

  .annotation-pending {
    background: var(--color-base-yellow20);

    .scheme-dark & {
      background: var(--color-base-yellow75);
    }
  }
`;
