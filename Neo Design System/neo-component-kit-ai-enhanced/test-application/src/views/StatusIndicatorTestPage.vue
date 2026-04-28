<template>
  <main>

    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <section data-test-case="0">
      <div class="test-case-description">
        <b>Test case 0</b>
        <div>A draft status indicator</div>
      </div>

      <div class="small-container">
        <NckStatusIndicator
          :status="Status.DRAFT"
          label="Draft status"
        />
      </div>
    </section>

    <section data-test-case="1">
      <div class="test-case-description">
        <b>Test case 1</b>
        <div>A warning status indicator</div>
      </div>

      <div class="small-container">
        <NckStatusIndicator
          :status="Status.WARNING"
          label="Warning status"
        />
      </div>
    </section>

    <section data-test-case="2">
      <div class="test-case-description">
        <b>Test case 2</b>
        <div>A pending status indicator</div>
      </div>

      <div class="small-container">
        <NckStatusIndicator
          :status="Status.PENDING"
          label="Pending status"
        />
      </div>
    </section>

    <section data-test-case="3">
      <div class="test-case-description">
        <b>Test case 3</b>
        <div>An error status indicator</div>
      </div>

      <div class="small-container">
        <NckStatusIndicator
          :status="Status.ERROR"
          label="Error status"
        />
      </div>
    </section>

    <section data-test-case="4">
      <div class="test-case-description">
        <b>Test case 4</b>
        <div>A success status indicator</div>
      </div>

      <div class="small-container">
        <NckStatusIndicator
          :status="Status.SUCCESS"
          label="Success status"
        />
      </div>
    </section>

    <section data-test-case="5">
      <div class="test-case-description">
        <b>Test case 5</b>
        <div>A success status indicator, with additional information</div>
      </div>

      <div class="small-container">
        <NckStatusIndicator
          :status="Status.SUCCESS"
          label="Success status"
          informationText="another information"
        />
      </div>
    </section>

    <section data-test-case="6">
      <div class="test-case-description">
        <b>Test case 6</b>
        <div>A success status indicator, with additional information, very long texts</div>
      </div>

      <div class="small-container">
        <NckStatusIndicator
          :status="Status.SUCCESS"
          :label="lorem"
          :informationText="lorem"
        />
      </div>
    </section>

    <section data-test-case="7">
      <div class="test-case-description">
        <b>Test case 7</b>
        <div>A cancelled status indicator, with additional information</div>
      </div>

      <div class="small-container">
        <NckStatusIndicator
          :status="Status.CANCELLED"
          label="Cancelled"
          informationText="subtitle"
        />
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { NckStatusIndicator, Status } from "@neotechnologygroup/neo-component-kit";

const lorem = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem voluptatem deleniti ratione aspernatur. Saepe quia in nobis maxime. Voluptatum nostrum laboriosam vitae suscipit sint reiciendis est recusandae reprehenderit minima illo?";
</script>

<style lang="less" scoped>
.small-container {
  width: 10rem;
  margin: 1rem auto;
}
</style>
