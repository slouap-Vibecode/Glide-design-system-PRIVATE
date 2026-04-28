<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <PreloadFontComponent />
    <PreloadIconComponent :iconsToPreload="[
      'close-dark',
      'hotel'
    ]" />
    <div class="zindex">
      I have a z-index (of 1)
    </div>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        <i>A Drawer with a short sized text and a header</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger1"
          @click="launchDrawer('Hello Drawer', testTextShort, false, trigger1, 0)">
          Launch drawer
        </button>
      </p>
      <p class="test-app-style">{{ messages[0] }}</p>
    </div>

    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        <i>A Drawer with a medium sized text and a header</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger2"
          @click="launchDrawer('Hello Drawer', testTextMedium, false, trigger2, 1)">
          Launch drawer
        </button>
      </p>
      <p class="test-app-style">{{ messages[1] }}</p>
    </div>

    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        <i>A Drawer with a long sized text and a header</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger3"
          @click="launchDrawer('Hello Drawer', testTextLong, false, trigger3, 2)">
          Launch drawer
        </button>
      </p>
      <p class="test-app-style">{{ messages[2] }}</p>
    </div>

    <div data-test-case="3">
      <b>Test case 3</b>
      <p class="test-app-style">
        <i>A Drawer with a short sized text and a header, no body padding</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger4"
          @click="launchDrawer('Hello Drawer', testTextShort, true, trigger4, 3)">
          Launch drawer
        </button>
      </p>
      <p class="test-app-style">{{ messages[3] }}</p>
    </div>

    <div data-test-case="4">
      <b>Test case 4</b>
      <p class="test-app-style">
        <i>A Drawer opening from the top, medium text and a header</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger5"
                @click="launchDrawer('Hello Drawer', testTextMedium, false, trigger5, 4, DrawerPosition.TOP)">
          Launch drawer
        </button>
      </p>
      <p class="test-app-style">{{ messages[4] }}</p>
    </div>

    <div data-test-case="5">
      <b>Test case 5</b>
      <p class="test-app-style">
        <i>A Drawer opening from the right, medium text, no body padding</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger6"
                @click="launchDrawer('Hello Drawer', testTextMedium, true, trigger6, 5, DrawerPosition.RIGHT)">
          Launch drawer
        </button>
      </p>
      <p class="test-app-style">{{ messages[5] }}</p>
    </div>

    <div data-test-case="6">
      <b>Test case 6</b>
      <p class="test-app-style">
        <i>A Drawer opening from the left, long text and a header</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger7"
                @click="launchDrawer('Hello Drawer', testTextLong, false, trigger7, 6, DrawerPosition.LEFT)">
          Launch drawer
        </button>
      </p>
      <p class="test-app-style">{{ messages[6] }}</p>
    </div>

    <p v-for="i in 30" :key="i" class="test-app-style hide-on-mobile">
      Making sure the page is scrollable, so we can see that when a drawer is opened and
      you scroll inside it, then background is not scrolling
    </p>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  margin-bottom: 56px;
}

[data-shadow-dom-anchor] {
  display: inline-block;
}

.zindex {
  z-index: 1;
  background: brown;
  position: fixed;
  top: 0;
}

@media screen and (max-width: 45rem) {
  .hide-on-mobile {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { DrawerPosition, ModalService } from "@neotechnologygroup/neo-component-kit";
import { ComponentPublicInstance, getCurrentInstance, ref } from "vue";
import SimpleDrawer from "../components/modals/SimpleDrawer.vue";
import PreloadFontComponent from "../components/PreloadFontComponent.vue";
import PreloadIconComponent from "../components/PreloadIconComponent.vue";

const messages = ref<string[]>([]);
const trigger1 = ref<HTMLButtonElement | null>(null);
const trigger2 = ref<HTMLButtonElement | null>(null);
const trigger3 = ref<HTMLButtonElement | null>(null);
const trigger4 = ref<HTMLButtonElement | null>(null);
const trigger5 = ref<HTMLButtonElement | null>(null);
const trigger6 = ref<HTMLButtonElement | null>(null);
const trigger7 = ref<HTMLButtonElement | null>(null);
const testTextShort = "Hello this is a drawer with a short text.";
const testTextMedium = `Hello this is a drawer with a medium size text.
  Hello this is a drawer with a medium size text. Hello this is a drawer with a medium size text.
  Hello this is a drawer with a medium size text. Hello this is a drawer with a medium size text.
  Hello this is a drawer with a medium size text. Hello this is a drawer with a medium size text.`;

const testTextLong = `Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.Hello this is a regular size drawer with a lot of text which
    makes appeaera a scrollbar.Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Vestibulum mattis bibendum nunc non fermentum. Nullam
    nibh ipsum, pharetra in cursus eu, bibendum nec magna. Integer efficitur
    leo id mollis interdum. Sed laoreet mattis lectus vel finibus. Donec
    maximus erat nibh, vitae rutrum urna efficitur id. Quisque tempus ac metus
    quis blandit. Fusce et turpis justo. Nunc tempus pellentesque magna, a
    pharetra ex maximus eu. Ut molestie odio leo, auctor egestas purus euismod
    quis. Ut vestibulum, metus quis dignissim commodo, nibh augue laoreet
    purus, ac mattis justo felis a quam. In rhoncus, arcu vitae placerat
    placerat, urna erat elementum felis, gravida dapibus magna felis non
    magna. Nulla vel arcu magna. Orci varius natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus. Aenean volutpat ante quis elit
    viverra efficitur. Proin ornare euismod turpis at facilisis. Suspendisse
    sagittis lacus vitae libero maximus sollicitudin. Quisque vel metus
    euismod, suscipit eros at, fringilla felis. Suspendisse faucibus neque
    pulvinar cursus vehicula. Ut pellentesque, dui ut consectetur consequat,
    mi tellus aliquam magna, quis efficitur lectus eros id justo. In nisi mi,
    rhoncus et augue vitae, pharetra malesuada nisi. Sed hendrerit risus ac
    rutrum dapibus. Nunc interdum massa at finibus varius. In condimentum,
    lectus quis sollicitudin aliquet, magna diam varius massa, varius
    vestibulum urna leo quis lorem. Cras maximus enim a erat pretium sodales.
    Proin lobortis purus nulla, ac mattis ipsum pulvinar ut. Curabitur
    tincidunt auctor ante, non malesuada justo dapibus quis. Nunc rhoncus
    efficitur risus ut convallis. Nam dignissim fringilla erat nec posuere.
    Nulla facilisi. Nulla dapibus imperdiet augue, vel luctus ligula aliquam
    quis. Sed nec posuere est. Praesent at tristique nibh. Morbi commodo nisi
    odio, vitae viverra sapien interdum ac. Pellentesque ac tellus ut justo
    semper laoreet at ac turpis. Maecenas vel nibh sit amet justo accumsan
    interdum. Class aptent taciti sociosqu ad litora torquent per conubia
    nostra, per inceptos himenaeos. Vivamus nec pulvinar magna. Vivamus mattis
    diam sed orci finibus, at imperdiet diam efficitur. Aliquam erat volutpat.
    Donec nec ante neque. Aenean laoreet nisl mauris, a interdum magna
    consectetur ac. Vestibulum quis dapibus arcu. Mauris et leo varius,
    tincidunt diam vulputate, molestie nisi. Ut ante turpis, volutpat at
    pellentesque sit amet, imperdiet at lectus. Maecenas sodales turpis ac
    orci bibendum, a sodales dolor imperdiet. Aliquam justo massa, viverra
    condimentum interdum a, eleifend eget libero. Mauris quis sem enim. Nunc
    fermentum justo et nulla dignissim, eu viverra metus tincidunt. Morbi quis
    est eu magna maximus laoreet egestas quis nibh. Proin et elementum mi.
    Nulla gravida ex a dolor luctus, vitae maximus nisi commodo. Etiam
    pellentesque augue et velit mattis, at ultricies enim interdum. Nullam ac
    eleifend est. Etiam sit amet ullamcorper quam. Nam placerat rhoncus quam
    ac maximus. Phasellus ultricies ligula congue magna tincidunt, sed mattis
    sapien convallis. Nunc aliquet et elit et finibus. Cras varius porttitor
    viverra. Aenean sed mattis lorem. Integer lectus lacus, tempus quis
    molestie in, efficitur in dui. Etiam in tristique nulla. Maecenas suscipit
    nisl a neque interdum ornare. Nunc congue tellus in diam accumsan posuere.
    Etiam interdum, sem sed tempus lacinia, nunc sem sodales dolor, at
    fringilla nunc ante sed ex. Donec quis egestas ipsum. Maecenas dignissim
    velit vitae nisi faucibus scelerisque.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.Hello this is a regular size drawer with a lot of text which
    makes appeaera a scrollbar.Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Vestibulum mattis bibendum nunc non fermentum. Nullam
    nibh ipsum, pharetra in cursus eu, bibendum nec magna. Integer efficitur
    leo id mollis interdum. Sed laoreet mattis lectus vel finibus. Donec
    maximus erat nibh, vitae rutrum urna efficitur id. Quisque tempus ac metus
    quis blandit. Fusce et turpis justo. Nunc tempus pellentesque magna, a
    pharetra ex maximus eu. Ut molestie odio leo, auctor egestas purus euismod
    quis. Ut vestibulum, metus quis dignissim commodo, nibh augue laoreet
    purus, ac mattis justo felis a quam. In rhoncus, arcu vitae placerat
    placerat, urna erat elementum felis, gravida dapibus magna felis non
    magna. Nulla vel arcu magna. Orci varius natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus. Aenean volutpat ante quis elit
    viverra efficitur. Proin ornare euismod turpis at facilisis. Suspendisse
    sagittis lacus vitae libero maximus sollicitudin. Quisque vel metus
    euismod, suscipit eros at, fringilla felis. Suspendisse faucibus neque
    pulvinar cursus vehicula. Ut pellentesque, dui ut consectetur consequat,
    mi tellus aliquam magna, quis efficitur lectus eros id justo. In nisi mi,
    rhoncus et augue vitae, pharetra malesuada nisi. Sed hendrerit risus ac
    rutrum dapibus. Nunc interdum massa at finibus varius. In condimentum,
    lectus quis sollicitudin aliquet, magna diam varius massa, varius
    vestibulum urna leo quis lorem. Cras maximus enim a erat pretium sodales.
    Proin lobortis purus nulla, ac mattis ipsum pulvinar ut. Curabitur
    tincidunt auctor ante, non malesuada justo dapibus quis. Nunc rhoncus
    efficitur risus ut convallis. Nam dignissim fringilla erat nec posuere.
    Nulla facilisi. Nulla dapibus imperdiet augue, vel luctus ligula aliquam
    quis. Sed nec posuere est. Praesent at tristique nibh. Morbi commodo nisi
    odio, vitae viverra sapien interdum ac. Pellentesque ac tellus ut justo
    semper laoreet at ac turpis. Maecenas vel nibh sit amet justo accumsan
    interdum. Class aptent taciti sociosqu ad litora torquent per conubia
    nostra, per inceptos himenaeos. Vivamus nec pulvinar magna. Vivamus mattis
    diam sed orci finibus, at imperdiet diam efficitur. Aliquam erat volutpat.
    Donec nec ante neque. Aenean laoreet nisl mauris, a interdum magna
    consectetur ac. Vestibulum quis dapibus arcu. Mauris et leo varius,
    tincidunt diam vulputate, molestie nisi. Ut ante turpis, volutpat at
    pellentesque sit amet, imperdiet at lectus. Maecenas sodales turpis ac
    orci bibendum, a sodales dolor imperdiet. Aliquam justo massa, viverra
    condimentum interdum a, eleifend eget libero. Mauris quis sem enim. Nunc
    fermentum justo et nulla dignissim, eu viverra metus tincidunt. Morbi quis
    est eu magna maximus laoreet egestas quis nibh. Proin et elementum mi.
    Nulla gravida ex a dolor luctus, vitae maximus nisi commodo. Etiam
    pellentesque augue et velit mattis, at ultricies enim interdum. Nullam ac
    eleifend est. Etiam sit amet ullamcorper quam. Nam placerat rhoncus quam
    ac maximus. Phasellus ultricies ligula congue magna tincidunt, sed mattis
    sapien convallis. Nunc aliquet et elit et finibus. Cras varius porttitor
    viverra. Aenean sed mattis lorem. Integer lectus lacus, tempus quis
    molestie in, efficitur in dui. Etiam in tristique nulla. Maecenas suscipit
    nisl a neque interdum ornare. Nunc congue tellus in diam accumsan posuere.
    Etiam interdum, sem sed tempus lacinia, nunc sem sodales dolor, at
    fringilla nunc ante sed ex. Donec quis egestas ipsum. Maecenas dignissim
    velit vitae nisi faucibus scelerisque.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Hello this is a regular size drawer with a lot of text which makes appear a
    scroolbar. Hello this is a regular size drawer with a lot of text which'
    makes appeaera a scrollbar. Hello this is a regular size drawer with a lot
    of text which makes appeaera a scrollbar. Hello this is a regular size
    drawer with a lot of text which makes appeaera a scrollbar.Hello this is a
    regular size drawer with a lot of text which makes appeaera a scrollbar
    Hello this is a regular size drawer with a lot of text which makes appeaera
    a scrollbar.
    Adding more text in odrer ot test the
    scroll down on the tablet view because the scroll bar does not appear with the previous text.
    Adding more text in odrer ot test the
    scroll down on the tablet view because the scroll bar does not appear with the previous text.
    Adding more text in odrer ot test the
    scroll down on the tablet view because the scroll bar does not appear with the previous text.
    Adding more text in odrer ot test the
    scroll down on the tablet view because the scroll bar does not appear with the previous text.
    Adding more text in odrer ot test the
    scroll down on the tablet view because the scroll bar does not appear with the previous text.
    Adding more text in odrer ot test the
    scroll down on the tablet view because the scroll bar does not appear with the previous text.
    Adding more text in odrer ot test the
    scroll down on the tablet view because the scroll bar does not appear with the previous text.
    Adding more text in odrer ot test the
    scroll down on the tablet view because the scroll bar does not appear with the previous text.`;
const currentInstance = getCurrentInstance()?.proxy;

function launchDrawer(title: string, text: string, noBodyPadding: boolean, trigger: HTMLButtonElement | null, index: number, position?: DrawerPosition) {
  ModalService.showModal((SimpleDrawer), currentInstance as ComponentPublicInstance, trigger ?? undefined,
    { testTitle: title, testText: text, noBodyPadding, position })
    .then(() => {
      messages.value[index] = "Drawer has been closed";
    }).catch(() => {
      messages.value[index] = "Drawer has been dismissed";
    });
}
</script>
