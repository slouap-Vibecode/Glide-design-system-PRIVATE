<template>
  <nck-modal modalTitle="Simple text" :size="ModalSize.FULL" ref="modal" :confirmDismissal="confirmDismissal">
    <template v-slot:modal-body>
      <a href="#">Hello I'm a link</a>
      <div class="button-group">
        <nck-button class="test-outside-event" label="Even I can be here" @click="emitEventInside" />
        <nck-button class="hidden-button" label="Display none button" @click="emitEventInside" />
        <nck-button data-open-other-modal label="open other modal" @click="openOtherModal" ref="buttonForOtherModal" />
        <nck-button data-open-other-modal-without-trigger label="open other modal without getting back to trigger" @click="openOtherModalWithoutTrigger" />
        <nck-button data-open-alertdialog-modal label="open alertdialog modal" @click="openAlertDialogModal" />
        <nck-button data-use-router-button label="test routeur" @click="navigateToHome" />
      </div>
      <p class="test-app-style">
        In user interface design for computer applications, a modal window is a
        graphical control element subordinate to an application's main window.
        It creates a mode that disables the main window but keeps it visible,
        with the modal window as a child window in front of it. Users must
        interact with the modal window before they can return to the parent
        application. This avoids interrupting the workflow on the main window.
        Modal windows are sometimes called heavy windows or modal dialogs
        because they often display a dialog box. User interfaces typically use
        modal windows to command user awareness and to display emergency states,
        though interaction designers argue they are ineffective for that use.[1]
        Modal windows are prone to mode errors.[1][2][3] On the Web, they often
        show images in detail, such as those implemented by Lightbox library, or
        are used for hover ads.[4][5] The opposite of modal is modeless.
        Modeless windows don't block the main window, so the user can switch
        their focus between them, treating them as palette windows.
      </p>
      <h2 class="test-app-style">Relevance and usage</h2>
      Use cases Frequent uses of modal windows include: Drawing attention to
      vital pieces of information. This use has been criticized as ineffective
      because users are bombarded with too many dialog boxes, and habituate to
      simply clicking "Close", "Cancel", or "OK" without reading or
      understanding the message.[6][7][8] Blocking the application flow until
      information required to continue is entered, as for example a password in
      a login process. Another example are file dialogs to open and save files
      in an application. Collecting application configuration options in a
      centralized dialog. In such cases, typically the changes are applied upon
      closing the dialog, and access to the application is disabled while the
      edits are being made. Warning that the effects of the current action are
      not reversible. This is a frequent interaction pattern for modal dialogs,
      but some usability experts criticize it as ineffective for its intended
      use (protection against errors in destructive actions) due to habituation.
      They recommend making the action reversible (providing an "undo" option)
      instead.[1] Control of interaction flow Modal windows are common in GUI
      toolkits for guiding user workflow. Alan Cooper contends that the
      importance of requiring the user to attend to important issues justifies
      restricting the user's freedom and that the alternative would increase
      user frustration.[9] Unexpected interruptions Unexpected alert dialogs are
      particular culprits of mode errors[1] with potentially severe
      consequences. Usability practitioners prescribe that dangerous actions
      should be undoable wherever possible; an alert box that appears
      unexpectedly or is dismissed by habituation doesn't protect from the
      dangerous action.[10] A modeless infobar is increasingly seen as
      preferable to a dialog box because it does not interrupt the user's
      activities, but rather allows the user to read extra information in their
      own time. One proposed approach is to design every input element as a
      self-contained, task-oriented interaction, guided by its own specific
      requirements rather than by the global state of the entire application.
      For example, required elements might be preceded with an asterisk,
      elements with invalid data might acquire a red border, and so on. With
      this approach, users actually benefit from seeing many input elements at
      once — they can enter data in a way that makes sense to them, instead of
      having all the other unrelated elements blocked until a predefined
      data-entry sequence is completed. Problems See also: Assessment of modes
      in computer interfaces A modal window blocks all other workflows in the
      top-level program until the modal window is closed, as opposed to modeless
      dialogs that allow users to operate with other windows.[11] Modal windows
      are intended to grab the user's full attention.[12] Users may not
      recognize that a modal window requires their attention, leading to
      confusion about the main window being non-responsive, or causing loss of
      the user's data input intended for the main window (see Mode error). In
      severe cases, the modal window appears behind another window controlled by
      the same program, potentially rendering the entire program unresponsive
      until the modal window can be located manually. However, many interface
      designers have recently taken steps to make modal windows more obvious and
      user friendly by darkening the background behind the window or allowing
      any mouse click outside of the modal window to force the window to close –
      a design called a Lightbox[5] – thus alleviating those problems. Jakob
      Nielsen states as an advantage of modal dialogs that it improves user
      awareness: "When something does need fixing, it's better to make sure that
      the user knows about it." For this goal, the Lightbox design provides
      strong visual contrast of the dialog over the rest of the visuals. The
      Lightbox technique is now a common tool in website design. Modal windows
      are commonly implemented in ways that block the possibility to move,
      minimize, iconify, or push that window back, and they grab input focus,
      which often prevents use of a system's cut, copy, and paste facilities.
      This can interfere with the use of their parent applications by blocking
      access to other windows and data within the same application, particularly
      in cases where the modal window is requiring the user to input information
      only available in one of the windows it's covering. For users using
      virtual work areas larger than their actual screens, modal windows can
      cause further undesirable behavior, including creating the modal on a
      portion of the virtual screen not currently on the display, or abruptly
      switching the display from what the user was working on to an entirely
      different section. Modal windows tend to create an abrupt diversion of
      text input, especially typed input intended for other programs, into
      themselves. Further, modals usually interpret actuation of the enter key
      (or in rare cases the presence of a newline in pasted input) as a cue to
      accept the input and process it—or, in rare cases, may intercept a mouse
      click intended for a different application that has suddenly been covered.
      Such interception, called focus stealing (or stealing focus) can
      compromise privacy and security practices, as well as capture
      inappropriate, out-of-context input that can cause undefined, arbitrary
      results in the program that generated the modal window. Depending on the
      specifics of implementation, modal windows can violate the principle of
      least surprise. Recommendations See also: Mode (user interface) § Design
      recommendations Modal dialogs are part of a task flow, and recommendations
      are given to place them where the focus is in that flow. For example, the
      window could be placed near the graphical control element that triggers
      its activation.[13] Using a semi-transparent dark background can obscure
      information in the main window, so it is best used only when that
      information would be distracting. A semi-transparent background can be
      made less intrusive by having the whole background area function as a
      close button: this is standard on most mobile operating systems, avoids
      making the user feel trapped, and makes modal windows feel less like
      malicious pop-ups. Design should follow common practices in the platform
      the program is running on. Microsoft Windows uses standard controls for
      modal window dialogs, with affirmative action buttons at the lower right
      of the panel. Mac OS X uses modal sheets with affirmative action buttons
      being the right-most command.[14]
    </template>
    <template v-slot:modal-footer-additional-content>
      <nck-icon iconName="hotel" iconAltText="" iconSize="xs" />
      Hello there.
    </template>
    <template v-slot:modal-footer-action-buttons>
      <nck-button color="light" label="Bye modal" @click="dismissModal" />
      <nck-button color="primary" label="Confirm" @click="closeModal" />
    </template>
  </nck-modal>
</template>

<style lang="less" scoped>
  .hidden-button {
    display: none !important;
  }
  .button-group .nck-button {
    margin: .25rem;
  }
</style>

<script setup lang="ts">
import { ref, getCurrentInstance, ComponentPublicInstance } from "vue";
import { NckModal, INckModal, ModalService, NckButton, NckIcon, ModalSize } from "@neotechnologygroup/neo-component-kit";
import SimpleModal from "./SimpleModal.vue";
import { useRouter } from "vue-router";
import ExtraSmallModal from "@/components/modals/ExtraSmallModal.vue";

const modal = ref<INckModal | null>(null);
const confirmDismissal = ref<boolean>(false);
const router = useRouter();

function closeModal() {
  if (modal.value) {
    modal.value.closeModal();
  }
}

function dismissModal() {
  if (modal.value) {
    modal.value.dismissModal();
  }
}

const emits = defineEmits<{
  (e: "event-inside"): void;
}>();

function emitEventInside() {
  emits("event-inside");
}

const buttonForOtherModal = ref<ComponentPublicInstance | null>(null);

const componentInstance = getCurrentInstance()?.proxy;

function openOtherModal() {
  let triggerElement: HTMLElement | undefined;
  if (buttonForOtherModal.value) {
    triggerElement = buttonForOtherModal.value.$el;
  }
  void ModalService.showModal(SimpleModal, componentInstance as ComponentPublicInstance, triggerElement, { extraButton: true })
    .catch(() => {
      // don't care about dismissal
    });
}

function openOtherModalWithoutTrigger() {
  void ModalService.showModal(SimpleModal, componentInstance as ComponentPublicInstance)
    .catch(() => {
      // don't care about dismissal
    });
}

function openAlertDialogModal() {
  void ModalService.showModal(ExtraSmallModal, componentInstance as ComponentPublicInstance)
    .catch(() => {
      // don't care about dismissal
    });
}

function navigateToHome() {
  confirmDismissal.value = true;
  void router.push({ name: "404" });
}
</script>
