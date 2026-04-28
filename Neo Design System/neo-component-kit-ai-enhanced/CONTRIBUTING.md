# Contributing to the Neo Component Kit

The following gitflow applies:

- [master](https://github.com/GBT-NEO/neo-component-kit/tree/master) is the main project branch. It is considered stable. No one is allowed to pushed directly to master.
- Each addition to "master" must be done through a merge request of a feature/defect branch.

The rules of the merge request are:

- [ ] Each merge request must be reviewed by a developper
- [ ] Each merge request must be tested and validated by QA (to ensure a high level of quality given that each version could be published at any moment)
- [ ] Each merge request must build successfully the library, the [test application](http://172.20.16.150/componentkit/#/) and the [documentation](https://neo-component-kit.kdsneo.kds.com/latest) ([it is enforced by CI server](https://teamcity.prod.build.kds.com/project/NeoGit_NeoComponentKit?mode=builds) and merge rule in GitHub)
- [ ] Each merge request must have all the automated tests passing

Additional note: it is advised to consider only one defect or feature per branch.

## Development contribution

Please read the following ressources to get acquainted with the NCK development:

- [the project structure](https://kdsjira.atlassian.net/wiki/spaces/WR/pages/2553545171/NCK+project+structure)
- [the translations process ](https://kdsjira.atlassian.net/wiki/spaces/WR/pages/2562064459/Handling+translations+within+the+NCK)
- [the documentation process](https://kdsjira.atlassian.net/wiki/spaces/WR/pages/2565406723/Documenting+the+NCK)

Note: The "Code guidelines" have not been written yet but should be soon.

- [ ] [Each feature must be documented](https://neo-component-kit.kdsneo.kds.com/latest). Bug should also lead to documentation in case of API modifications or known limitation of a given feature. The emphasis is put on public API and interfaces, private code does not require in depth documentation.

- [ ] Each component must have documented examples showing some of its capabilities.

- [ ] Each contribution must produce a result respecting Accessibility standards & requirements as defined by [WCAG](https://www.w3.org/WAI/WCAG22/quickref/?levels=aaa) & [RGAA](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/) (level A & AA are BOTH required).

- [ ] Each contribution must be tested (please refer to "Test contribution" section), it relies on the developper to provide anything needed for the QA engineer to be able to understand their changes and test them (both manually and automatically). It will generally require augmenting the set of test cases for the considered component on [the test application](http://172.20.16.150/componentkit/#/). This includes notifying the QA about any impact changes may have outside of the direct effect expected by the feature or the bug (for instance, modifying the "focus" class of the style could impact every component).

- [ ] The developper must create or modify the new test cases for the test page following the discussion with the QA engineer, based on the [pairwise testing](https://en.wikipedia.org/wiki/All-pairs_testing) matrix.

## Test contribution

- [ ] In order to create or modify a test page, the developper must cooperate with the QA engineer upon the needed test cases resulting from the [pairwise testing](https://en.wikipedia.org/wiki/All-pairs_testing) matrix done by the QA engineer.

- [ ] Each contribution made by a developper must be tested. Tests are both manual and automatic.

- [ ] Each contribution must be tested against Accessibility standards & requirements as defined by [WCAG](https://www.w3.org/WAI/WCAG22/quickref/?levels=aaa) & [RGAA](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/) (level A & AA are BOTH required).
      You can use the following checklist https://kdsjira.atlassian.net/wiki/spaces/WR/pages/2403434497/Basic+accessibility+checklist to assess the contribution.

- [ ] Each contribution leading to a design or behavior change, or a new component must be accompanied by automatic testing (Visual Regression Testing), whether it is new tests or modification of existing ones.
      The testing tool is [BackstopJS](https://github.com/garris/BackstopJS).

- [ ] After everything is done and tested, full regression automatic tests on all existing components are required to be run and pass right before the merge (note that there is work in progress to include that in the Continuous integration process).
