const path = require("path");
const express = require("express");
const version = process.env.npm_package_version;

module.exports = {
  // Enable separate pages per section instead of single scrolling page
  pagePerSection: true,
  // Keep sidebar visible for better navigation
  showSidebar: true,
  // Expand table of contents for easier navigation
  tocMode: "expand",
  theme: {
    base: "'Open Sans', 'Segoe UI', 'Arial', sans-serif",
    color: {
      sidebarBackground: "#F8F9FB",
      link: "#0056A0",
      linkHover: "#006FCF",
    },
  },
  template: {
    favicon: "Neo_Core_System.svg",
  },
  title: "Neo Component Kit Style Guide",
  version,
  styleguideDir: "./documentation/styleguide",
  styleguidePublicPath: "/" + version + "/",
  copyCodeButton: true,
  usageMode: "expand",
  exampleMode: "expand",
  getComponentPathLine(componentPath) {
    let name = path.basename(componentPath, ".vue");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return `import { ${name} } from '@neotechnologygroup/neo-component-kit';`;
  },
  sections: [
    {
      name: "Documentation structure",
      content: "documentation/documentation-structure.md",
    },
    {
      name: "Getting started",
      description: "How to setup the Neo Component Kit in your project and start using it.",
      sections: [
        {
          name: "Installation",
          content: "documentation/installation.md",
        },
        {
          name: "Translations",
          content: "documentation/translations.md",
        },
        {
          name: "Icons",
          content: "documentation/icons.md",
        },
        {
          name: "MCP Server Configuration",
          content: "documentation/mcp-configuration.md",
          description:
            "Configure Claude Code MCP server for enhanced AI-assisted development workflow with Neo Design System components",
        },
      ],
    },
    {
      name: "Foundations",
      description: "Basic styles to build the Neo UI",
      sections: [
        {
          name: "Typography",
          content: "documentation/typography.md",
        },
        {
          name: "Colors (font, shapes...)",
          content: "documentation/fontAndShapesColors.md",
        },
        {
          name: "Style utilities",
          content: "documentation/styleUtilities.md",
        },
        {
          name: "CSS variables",
          description: "Exposed CSS variables that can be reused in your project or customized",
          sections: [
            {
              name: "Radius & Border width",
              content: "documentation/cssVariables/radiusVariables.md",
            },
            {
              name: "Animation",
              content: "documentation/cssVariables/animationVariables.md",
            },
            {
              name: "Typography",
              content: "documentation/cssVariables/typographyVariables.md",
            },
            {
              name: "Colors (L1 palette)",
              content: "documentation/cssVariables/colorsVariables.md",
            },
            {
              name: "Semantic colors (L2)",
              content: "documentation/cssVariables/l2SemanticColors.md",
              description: "Named color aliases mapping the L1 palette to semantic roles. Use L3 contextual tokens in component code.",
            },
            {
              name: "Contextual tokens (L3)",
              content: "documentation/cssVariables/l3ContextualTokens.md",
              description: "Primary tokens for component code — surface, text, icon, border and effect tokens.",
            },
            {
              name: "Responsive tokens",
              content: "documentation/cssVariables/responsiveTokens.md",
              description: "Spacing, font-size, icon-size and focus-width tokens.",
            },
            {
              name: "Box shadows",
              content: "documentation/cssVariables/boxShadowsVariables.md",
            },
          ],
        },
      ],
    },
    // === FORM COMPONENTS CATEGORY ===
    {
      name: "Form Components",
      content: "documentation/categories/forms.md",
      description: "Interactive input components for data collection, user input, and form validation",
      sectionDepth: 1,
      components: [
        "src/components/nckAutocomplete.vue",
        "src/components/nckButton.vue",
        "src/components/nckCheckbox.vue",
        "src/components/nckContentSwitcher.vue",
        "src/components/nckDatepickerRange.vue",
        "src/components/nckDatepickerSingle.vue",
        "src/components/nckDropdown.vue",
        "src/components/nckForm.vue",
        "src/components/nckPhoneNumberInput.vue",
        "src/components/nckRadioButtons.vue",
        "src/components/nckSearchInput.vue",
        "src/components/nckSlider.vue",
        "src/components/nckSwitch.vue",
        "src/components/nckTextArea.vue",
        "src/components/nckTextInput.vue",
      ],
    },
    // === INTERACTIVE COMPONENTS CATEGORY ===
    {
      name: "Interactive Components",
      content: "documentation/categories/interactive.md",
      description: "Advanced user interactions, utilities, and visual elements",
      sectionDepth: 1,
      components: [
        "src/components/nckIcon.vue",
        "src/components/nckMenu.vue",
        "src/components/nckToggleChip.vue",
        "src/components/nckToggleChipGroup.vue",
      ],
    },
    {
      name: "Tooltips",
      description: "Non-intrusive elements to get additional information or actions",
      sections: [
        {
          name: "nck-dialog-tooltip",
          content: "documentation/dialog-tooltips.md",
          description:
            "<div class=\"as-path-line\">import { NckDialogTooltip } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "nck-info-tooltip",
          content: "documentation/info-tooltips.md",
          description:
            "<div class=\"as-path-line\">import { NckInfoTooltip } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
      ],
    },
    {
      name: "Modals, dialogs, popovers & drawers",
      description: "Intrusive elements subordinating main window to display information for user or get their choices",
      sections: [
        {
          name: "Modal guidelines",
          content: "documentation/modals.md",
        },
        {
          name: "ModalService",
          content: "documentation/controllers/modalService.md",
        },
      ],
      components: ["src/components/nckModal.vue", "src/components/nckPopover.vue", "src/components/nckDrawer.vue"],
    },
    {
      name: "Toasts",
      description: "A component to display an information to the user in an intrusive way",
      sections: [
        {
          name: "Toast guidelines",
          content: "documentation/toasts.md",
        },
        {
          name: "ToastService",
          content: "documentation/controllers/toastService.md",
        },
      ],
      components: ["src/components/nckToast.vue"],
    },
    // === FEEDBACK & STATUS COMPONENTS CATEGORY ===
    {
      name: "Feedback & Status Components",
      content: "documentation/categories/feedback.md",
      description: "Visual indicators, notifications, and user feedback components",
      sectionDepth: 1,
      components: [
        "src/components/nckBadge.vue",
        "src/components/nckBanner.vue",
        "src/components/nckBannerItem.vue",
        "src/components/nckBannerItemGroup.vue",
        "src/components/nckChip.vue",
        "src/components/nckChipPopover.vue",
        "src/components/nckCounterBadge.vue",
        "src/components/nckLoader.vue",
        "src/components/nckLoadingArea.vue",
        "src/components/nckRecommendedBadge.vue",
        "src/components/nckStatusIndicator.vue",
        "src/components/nckTimeline.vue",
      ],
    },
    // === LAYOUT COMPONENTS CATEGORY ===
    {
      name: "Layout Components",
      content: "documentation/categories/layout.md",
      description: "Structural components for organizing content and defining page layout hierarchy",
      sectionDepth: 1,
      components: [
        "src/components/nckBreadcrumb.vue",
        "src/components/nckCard.vue",
        "src/components/nckHeader.vue",
        "src/components/nckPlaceholder.vue",
        "src/components/nckTabs.vue",
      ],
    },
    // === DATA DISPLAY COMPONENTS CATEGORY ===
    {
      name: "Data Display Components",
      content: "documentation/categories/data-display.md",
      description: "Components for presenting and organizing data in accessible, scannable formats",
      sectionDepth: 1,
      components: ["src/components/nckList.vue", "src/components/nckTable.vue"],
    },
    // === NAVIGATION COMPONENTS CATEGORY ===
    {
      name: "Navigation Components",
      content: "documentation/categories/navigation.md",
      description: "Components that help users navigate through content and understand their location",
      sectionDepth: 1,
      components: ["src/components/nckPagination.vue"],
    },
    {
      name: "Constants & Enums",
      description: "All enums provided by the Neo Component kit",
      sections: [
        {
          name: "BackgroundColors",
          content: "documentation/constants/backgroundColors.md",
          description:
            "<div class=\"as-path-line\">import { BackgroundColors } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "BadgeColor",
          content: "documentation/constants/badgeColor.md",
          description:
            "<div class=\"as-path-line\">import { BadgeColor } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "BadgeType",
          content: "documentation/constants/badgeType.md",
          description:
            "<div class=\"as-path-line\">import { BadgeType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "BannerType",
          content: "documentation/constants/bannerType.md",
          description:
            "<div class=\"as-path-line\">import { BannerType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "ButtonColor",
          content: "documentation/constants/buttonColor.md",
          description:
            "<div class=\"as-path-line\">import { ButtonColor } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "ButtonSize",
          content: "documentation/constants/buttonSize.md",
          description:
            "<div class=\"as-path-line\">import { ButtonSize } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "ButtonControlType",
          content: "documentation/constants/buttonControlType.md",
          description:
            "<div class=\"as-path-line\">import { ButtonControlType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "ButtonType",
          content: "documentation/constants/buttonType.md",
          description:
            "<div class=\"as-path-line\">import { ButtonType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "CardBackgroundColor",
          content: "documentation/constants/cardBackgroundColor.md",
          description: "<div class=\"as-path-line\">import { CardBackgroundColor } from 'neo-component-kit';</div><br>",
        },
        {
          name: "CardType",
          content: "documentation/constants/cardType.md",
          description: "<div class=\"as-path-line\">import { CardType } from 'neo-component-kit';</div><br>",
        },
        {
          name: "Colors",
          content: "documentation/constants/colors.md",
          description:
            "<div class=\"as-path-line\">import { Colors } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "CounterBadgeSize",
          content: "documentation/constants/counterBadgeSize.md",
          description:
            "<div class=\"as-path-line\">import { CounterBadgeSize } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "DatepickerPopoverPosition",
          content: "documentation/constants/datepickerPopoverPosition.md",
          description:
            "<div class=\"as-path-line\">import { DatepickerPopoverPosition } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "DisplayContext",
          content: "documentation/constants/displayContext.md",
          description:
            "<div class=\"as-path-line\">import { DisplayContext } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "DIVIDER_TOKEN",
          content: "documentation/constants/dividerToken.md",
          description:
            "<div class=\"as-path-line\">import { DIVIDER_TOKEN } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "DrawerPosition",
          content: "documentation/constants/drawerPosition.md",
          description:
            "<div class=\"as-path-line\">import { DrawerPosition } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "GroupDirection",
          content: "documentation/constants/groupDirection.md",
          description:
            "<div class=\"as-path-line\">import { GroupDirection } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "HeaderType",
          content: "documentation/constants/headerType.md",
          description:
            "<div class=\"as-path-line\">import { HeaderType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "IconColors",
          content: "documentation/constants/iconColors.md",
          description:
            "<div class=\"as-path-line\">import { IconColors } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "IconSize",
          content: "documentation/constants/iconSize.md",
          description:
            "<div class=\"as-path-line\">import { IconSize } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "LoaderSize",
          content: "documentation/constants/loaderSize.md",
          description:
            "<div class=\"as-path-line\">import { LoaderSize } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "LoaderType",
          content: "documentation/constants/loaderType.md",
          description:
            "<div class=\"as-path-line\">import { LoaderType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "MenuPosition",
          content: "documentation/constants/menuPosition.md",
          description:
            "<div class=\"as-path-line\">import { MenuPosition } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "ModalRole",
          content: "documentation/constants/modalRole.md",
          description:
            "<div class=\"as-path-line\">import { ModalRole } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "ModalSize",
          content: "documentation/constants/modalSize.md",
          description:
            "<div class=\"as-path-line\">import { ModalSize } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "PopoverSize",
          content: "documentation/constants/popoverSize.md",
          description:
            "<div class=\"as-path-line\">import { PopoverSize } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "PopoverHidingEventType",
          content: "documentation/constants/popoverHidingEventType.md",
          description:
            "<div class=\"as-path-line\">import { PopoverHidingEventType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "RadioButtonsDisplay",
          content: "documentation/constants/radioButtonsDisplay.md",
          description:
            "<div class=\"as-path-line\">import { RadioButtonsDisplay } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "RecommendationLevel",
          content: "documentation/constants/recommendationLevel.md",
          description:
            "<div class=\"as-path-line\">import { RecommendationLevel } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "RecommendedBadgeType",
          content: "documentation/constants/recommendedBadgeType.md",
          description:
            "<div class=\"as-path-line\">import { RecommendedBadgeType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "SortOrder",
          content: "documentation/constants/sortOrder.md",
          description:
            "<div class=\"as-path-line\">import { SortOrder } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "Status",
          content: "documentation/constants/status.md",
          description: "<div class=\"as-path-line\">import { Status } from 'neo-component-kit';</div><br>",
        },
        {
          name: "SwitchLabelPosition",
          content: "documentation/constants/switchLabelPosition.md",
          description: "<div class=\"as-path-line\">import { SwitchLabelPosition } from 'neo-component-kit';</div><br>",
        },
        {
          name: "TabsType",
          content: "documentation/constants/tabsType.md",
          description:
            "<div class=\"as-path-line\">import { TabsType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "TextAlignment",
          content: "documentation/constants/textAlignment.md",
          description:
            "<div class=\"as-path-line\">import { TextAlignment } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "TimeInterval",
          content: "documentation/constants/timeInterval.md",
          description:
            "<div class=\"as-path-line\">import { TimeInterval } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "TimelineEventState",
          content: "documentation/constants/timelineEventState.md",
          description: "<div class=\"as-path-line\">import { TimelineEventState } from 'neo-component-kit';</div><br>",
        },
        {
          name: "TimelineType",
          content: "documentation/constants/timelineType.md",
          description:
            "<div class=\"as-path-line\">import { TimelineType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
        {
          name: "ToastType",
          content: "documentation/constants/toastType.md",
          description:
            "<div class=\"as-path-line\">import { ToastType } from '@neotechnologygroup/neo-component-kit';</div><br>",
        },
      ],
    },
    {
      name: "Deprecation",
      content: "documentation/deprecation.md",
      description: "List all deprecation and their replacement if any",
    },
    {
      name: "Migration guide",
      content: "documentation/migration.md",
      description: "Instructions to migrate accross major versions & breaking changes.",
    },
  ],
  assetsDir: "./documentation/assets",
  enhancePreviewApp: "./documentation/initialize.ts",
  require: ["./dist/neo-component-kit.css"],
  configureServer(server) {
    const app = server.app;
    app.use(`/${version}/`, express.static(this.styleguideDir));
  },
  // https://github.com/vue-styleguidist/vue-styleguidist/issues/1399#issuecomment-1406082169
  /**
   * Added a custom parser to handle Vue 3 Composition API for documenting components in vue-styleguidist
   */
  propsParser(filePath) {
    return require("vue-docgen-api").parse(filePath, {
      // See https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api#alias
      alias: { "@": path.resolve(__dirname, "src") },
      addScriptHandlers: [
        function (
          // The Documentation instance provided by vue-docgen-api
          documentation,
          // The component definition object, unused in this example
          __componentDefinition,
          // The abstract syntax tree path for the component file
          astPath,
        ) {
          const unWantedLinePart = /^(\s*\*\s?)/;

          // Find the first comment block that includes the @component directive
          const componentDoc = astPath.tokens
            .filter((token) => token.type === "CommentBlock" && token.value.includes("@component"))
            .find(() => true);

          // If a matching comment block is found, extract description and display name information
          if (componentDoc) {
            const lines = componentDoc.value.split("\n");

            // Set the component description on the Documentation instance
            documentation.set(
              "description",
              lines
                .filter((line) => !line.includes("@component"))
                .filter((line) => !line.includes("@displayName"))
                .map((line) => line.replace(unWantedLinePart, "").substring(componentDoc.loc.indent))
                .join("\n"),
            );

            // Set the component display name on the Documentation instance, if available
            const displayNameLine = lines.find((line) => line.includes("@displayName"));
            if (displayNameLine) {
              documentation.set(
                "displayName",
                displayNameLine
                  ?.replace("@displayName", "")
                  .replace(unWantedLinePart, "")
                  .substring(componentDoc.loc.indent)
                  .trim(),
              );
            }
          }
        },
      ],
    });
  },
};
