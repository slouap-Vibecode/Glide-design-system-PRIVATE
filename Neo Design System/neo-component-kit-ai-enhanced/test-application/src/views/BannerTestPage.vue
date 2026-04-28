<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/banner-errors">another page right here</router-link>
    </div>

    <div :data-test-case="0">
      <div>
        <b>Test case 0</b>
        Color: default
      </div>
      <nck-banner heading="This is just a default banner"></nck-banner>
    </div>

    <div :data-test-case="1">
      <div>
        <b>Test case 1</b>
        Color: success, dismissable (no event)
      </div>
      <nck-banner :type="BannerType.SUCCESS" heading="This success banner is dismissable" dismissable></nck-banner>
    </div>

    <div :data-test-case="2">
      <div>
        <b>Test case 2</b>
        Color: info, heading link (aria role: link), dismissible
      </div>
      <nck-banner :type="BannerType.INFORMATION"
          heading="This is a banner with a very very long text that should wrap.
            It also ends with a link but we'll come to that later. Has it wrapped already?
            I don't know yet but I keep wondering. And now ? Is it enough? Enough or not enough that is the question!
            Well the desktop is very very wide. Like 1920 px (I don't know what it makes in REM? REM like the band? No the unit!).
            Do you imagine? That makes a lot of text to write if we want to wrap.
            So be ready to read more and more. Are you still reading there?
            Anyway, I guess now's the time to repeat that this banner ends"
          linkLabel="with a link" linkAriaRole="link" @link-clicked="handleEvent" dismissable @banner-dismissed="handleEvent"></nck-banner>
    </div>

    <div :data-test-case="3">
      <div>
        <b>Test case 3</b>
        Color: warning, heading link (aria role: button)
      </div>
      <nck-banner :type="BannerType.WARNING" heading="This banner also ends with a link, but it behaves like a" linkLabel="button" linkAriaRole="button" @link-clicked="handleEvent">
      </nck-banner>
    </div>

    <div :data-test-case="4">
      <div>
        <b>Test case 4</b>
        Color: critical, list of body items, item link (aria role: link)
      </div>
      <nck-banner :type="BannerType.ERROR" heading="This banner has a list of items">
        <nck-banner-item-group>
          <nck-banner-item text="That's when you need" />
          <nck-banner-item text="to say a little more" />
          <nck-banner-item text="than just a few words... By the way, check this" linkLabel="link" linkAriaRole="link" @link-clicked="handleEvent" />
        </nck-banner-item-group>
      </nck-banner>
    </div>

    <div :data-test-case="5">
      <div>
        <b>Test case 5</b>
        Color: default (by design), heading link (aria role: link), list of body items, item link (aria role: link), dismissable
      </div>
      <nck-banner :type="BannerType.NEUTRAL" heading="This banner has a list of items." linkLabel="It is dismissable." linkAriaRole="link" @link-clicked="handleEvent"
          dismissable @banner-dismissed="handleEvent">
        <nck-banner-item-group>
          <nck-banner-item text="Are all those banners..." />
          <nck-banner-item text="really trying to say something important ? What is all this verbiage, this apalling verbosity ?
              I feel they're just trying to gain some time, cover some space, just for the sake of having their content wrapped in the end.
              Those banners don't behave. Hey, grow up banners ! You know what ? Maybe they should be dismissed. Or better : banned !" />
          <nck-banner-item text="Well, whatever. By the way, check this" linkLabel="link" linkAriaRole="link" @link-clicked="handleEvent" />
        </nck-banner-item-group>
      </nck-banner>
    </div>

    <div :data-test-case="6">
      <div>
        <b>Test case 6</b>
        Color: success, heading link (aria role: button), list of body items, item links (aria role: link &amp; button)
      </div>
      <nck-banner :type="BannerType.SUCCESS" heading="This is yet another very very long text that should wrap. It also has a list of items.
          But it is a lazy one that just utters some latin nonsense. Check it out : Suspendisse maximus, quam eget porta scelerisque,
          dolor magna vehicula tellus, a blandit orci sem ut ex. Nunc ultrices felis at mauris eleifend laoreet.
          Curabitur lacinia tristique lectus eu vestibulum. Maecenas cursus nunc eu turpis lacinia, in pellentesque leo ornare."
        linkLabel="Anyway, this last piece of text behaves like a button." linkAriaRole="button" @link-clicked="handleEvent">
        <nck-banner-item-group>
          <nck-banner-item text="Again, here are some pieces of body text." />
          <nck-banner-item text="One with a link at the end." linkLabel="Click me." linkAriaRole="link" @link-clicked="handleEvent" />
          <nck-banner-item text="Another one with a button at the end." linkLabel="Click me." linkAriaRole="button" @link-clicked="handleEvent" />
        </nck-banner-item-group>
      </nck-banner>
    </div>

    <div :data-test-case="7">
      <div>
        <b>Test case 7</b>
        Color: critical, no radius
      </div>
      <nck-banner :type="BannerType.ERROR" heading="This critical banner has no radius." noRadius></nck-banner>
    </div>

    <div :data-test-case="8">
      <div>
        <b>Test case 8</b>
        Color: critical, no radius, dismissible
      </div>
      <nck-banner :type="BannerType.ERROR" heading="This critical banner has no radius and is dismissible." noRadius dismissable></nck-banner>
    </div>

    <div :data-test-case="9">
      <div>
        <b>Test case 9</b>
        Color: success, with specific icon and alternative text
      </div>
      <nck-banner :type="BannerType.SUCCESS" heading="This success banner has a specific icon, its alt text should be 'Leaf'." leading-icon="eco-outline" leading-icon-alt-text="Leaf"></nck-banner>
    </div>
  </div>

  <div :data-test-case="10">
    <div>
      <b>Test case 10</b>
      Color: warning, with specific icon but default alternative text, dismissable
    </div>
    <nck-banner :type="BannerType.WARNING" heading="This warning banner has a specific icon, its alt text should be 'Warning'." leading-icon="gas-station" dismissable></nck-banner>
  </div>
</template>

<script setup lang="ts">
import { NckBanner, NckBannerItemGroup, NckBannerItem, BannerType } from "@neotechnologygroup/neo-component-kit";

function handleEvent(event: Event) {
  if (event?.target) {
    const testCase = (event.target as HTMLElement).closest("[data-test-case]");
    if (testCase) {
      const testCaseHeader = testCase.querySelector("div:first-child");
      if (testCaseHeader) {
        const testCaseHeaderStyle = (testCaseHeader as HTMLElement).style;
        if (testCaseHeaderStyle.color === "limegreen") {
          testCaseHeaderStyle.color = "black";
        } else {
          testCaseHeaderStyle.color = "limegreen";
        }
      }
    }
  }
}
</script>

<style scoped>
[data-test-case] {
  margin-bottom: 55px;
}

.separator {
  border: 1px solid black;
}
</style>
