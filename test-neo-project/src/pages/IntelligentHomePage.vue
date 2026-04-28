<template>
  <div class="home-page">
    <nck-header class="page-header">
      <template #title>
        <h1>{{ pageTitle }}</h1>
      </template>
      <template #actions>
        <nck-button
          :label="'Get Started'"
          :buttonType="ButtonType.PRIMARY"
          @click="handleGetStarted"
        />
      </template>
    </nck-header>

    <main class="page-content">
      <section class="hero-section">
        <nck-card class="hero-card">
          <template #content>
            <div class="hero-content">
              <nck-icon
                :iconName="'star'"
                :iconSize="IconSize.XL"
                :primaryColor="'@bright-blue-300'"
                class="hero-icon"
              />
              <h2>{{ heroTitle }}</h2>
              <p>{{ heroDescription }}</p>

              <div class="hero-actions">
                <nck-button
                  :label="'Get Started'"
                  :buttonType="ButtonType.PRIMARY"
                  @click="handleGetStarted"
                />
              </div>
            </div>
          </template>
        </nck-card>
      </section>

      <section class="features-section">
        <h3>Key Features</h3>
        <div class="features-grid">
          <nck-card
            v-for="feature in features"
            :key="feature.id"
            class="feature-card"
          >
            <template #content>
              <div class="feature-content">
                <nck-icon
                  :iconName="feature.icon"
                  :iconSize="IconSize.L"
                  :primaryColor="feature.color"
                  class="feature-icon"
                />
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.description }}</p>
                <nck-badge :type="feature.badgeType">{{ feature.badge }}</nck-badge>
              </div>
            </template>
          </nck-card>
        </div>
      </section>

      <section class="form-section">
        <nck-card>
          <template #header>
            <h3>{{ formTitle }}</h3>
          </template>
          <template #content>
            <nck-form @submit="handleFormSubmit">
              <div class="form-field">
                <nck-text-input
                  :label="'Full Name'"
                  v-model="formData.fullname"
                  :required="true"
                  :placeholder="'Enter your full name'"
                />
              </div>

              <div class="form-field">
                <nck-text-input
                  :label="'Email Address'"
                  v-model="formData.email"
                  :type="'email'"
                  :required="true"
                  :placeholder="'Enter your email'"
                />
              </div>

              <div class="form-field">
                <nck-text-area
                  :label="'Message'"
                  v-model="formData.message"
                  :placeholder="'Tell us about your project'"
                  :rows="4"
                />
              </div>

              <div class="form-actions">
                <nck-button
                  :label="'Submit'"
                  :buttonType="ButtonType.PRIMARY"
                  type="submit"
                  :loading="isSubmitting"
                />
                <nck-button
                  :label="'Reset'"
                  :buttonType="ButtonType.SECONDARY"
                  @click="handleReset"
                />
              </div>
            </nck-form>
          </template>
        </nck-card>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  nckHeader,
  nckButton,
  nckCard,
  nckIcon,
  nckBadge,
  nckForm,
  nckTextInput,
  nckTextArea
} from '@neotechnologygroup/neo-component-kit'
import { ButtonType } from '@neotechnologygroup/neo-component-kit/constants/buttonType'
import { IconSize } from '@neotechnologygroup/neo-component-kit/constants/iconSize'
import { ref, reactive } from 'vue'

// Component interfaces for type safety
interface Feature {
  id: string
  title: string
  description: string
  icon: string
  color: string
  badge: string
  badgeType: 'success' | 'info' | 'warning' | 'error'
}

interface FormData {
  fullname: string
  email: string
  message: string
}

// Reactive data - intelligently generated based on page type
const pageTitle = ref('Neo Design System Platform')
const heroTitle = ref('Welcome to Our Platform')
const heroDescription = ref('Experience the power of intelligent component generation and real Neo Design System integration.')
const formTitle = ref('Get in Touch')

const isSubmitting = ref(false)

const formData = reactive<FormData>({
  fullname: '',
  email: '',
  message: ''
})

const features = ref<Feature[]>([
  {
    id: '1',
    title: 'Real Components',
    description: 'Uses actual Neo Design System components, not simulations.',
    icon: 'check-circle',
    color: '@green-300',
    badge: 'Authentic',
    badgeType: 'success'
  },
  {
    id: '2',
    title: 'Intelligent Selection',
    description: 'AI-powered component recommendations based on context.',
    icon: 'flash',
    color: '@bright-blue-300',
    badge: 'Smart',
    badgeType: 'info'
  },
  {
    id: '3',
    title: 'Cross-Project Access',
    description: 'Works seamlessly across multiple Vue 3 projects.',
    icon: 'global',
    color: '@orange-300',
    badge: 'Distributed',
    badgeType: 'warning'
  },
  {
    id: '4',
    title: 'Design System Compliance',
    description: 'Automatically follows Neo Design System best practices.',
    icon: 'security',
    color: '@purple-300',
    badge: 'Compliant',
    badgeType: 'info'
  }
])

// Methods - intelligently generated based on components used
const handleGetStarted = (): void => {
  // Navigate to getting started flow
  console.log('Initiating user onboarding process...')

  // Example: Show welcome tour or navigate to setup
  showWelcomeTour()
}

const handleFormSubmit = async (data: any): Promise<void> => {
  isSubmitting.value = true

  try {
    // Simulate API call with form data
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Form submitted successfully:', {
      ...formData,
      timestamp: new Date().toISOString()
    })

    // Show success message
    showSuccessMessage('Thank you! We\'ll get back to you soon.')

    // Reset form
    handleReset()

  } catch (error) {
    console.error('Form submission failed:', error)
    showErrorMessage('Submission failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const handleReset = (): void => {
  formData.fullname = ''
  formData.email = ''
  formData.message = ''
}

const showWelcomeTour = (): void => {
  // Implementation for welcome tour
  console.log('Starting welcome tour...')
}

const showSuccessMessage = (message: string): void => {
  // Implementation for success toast/notification
  console.log('Success:', message)
}

const showErrorMessage = (message: string): void => {
  // Implementation for error toast/notification
  console.log('Error:', message)
}

// Lifecycle hooks
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Neo Design System home page mounted successfully')

  // Initialize any required services or analytics
  initializeAnalytics()
})

const initializeAnalytics = (): void => {
  // Track page view
  console.log('Page view tracked: Home Page')
}
</script>

<style lang="less" scoped>
// Import real Neo Design System tokens
@import '@neotechnologygroup/neo-component-kit/src/styles/colorsVariables.less';
@import '@neotechnologygroup/neo-component-kit/src/styles/radiusVariables.less';
@import '@neotechnologygroup/neo-component-kit/src/styles/typographyVariables.less';

.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  background: @bright-blue-300;
  color: @white;
  padding: 1rem 2rem;
  box-shadow: var(--box-shadow-level-2);
}

.page-content {
  flex: 1;
  padding: 2rem;
  background: @blue-grey-100;
}

// Hero Section - Intelligently styled based on Neo patterns
.hero-section {
  margin-bottom: 4rem;

  .hero-card {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    box-shadow: var(--box-shadow-level-3);
  }

  .hero-content {
    padding: 3rem 2rem;

    .hero-icon {
      margin-bottom: 1.5rem;
      display: block;
    }

    h2 {
      color: @deep-blue-400;
      font-size: 2.75rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }

    p {
      font-size: 1.25rem;
      color: @blue-grey-600;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }
}

// Features Section - Grid layout with Neo components
.features-section {
  margin-bottom: 4rem;

  h3 {
    text-align: center;
    color: @deep-blue-400;
    font-size: 2.25rem;
    font-weight: 600;
    margin-bottom: 3rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--box-shadow-level-4);
    }
  }

  .feature-content {
    text-align: center;
    padding: 1rem;

    .feature-icon {
      margin-bottom: 1rem;
      display: block;
    }

    h4 {
      color: @deep-blue-400;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
    }

    p {
      color: @blue-grey-600;
      margin-bottom: 1rem;
      line-height: 1.5;
    }
  }
}

// Form Section - Using Neo form components
.form-section {
  max-width: 600px;
  margin: 0 auto;

  .form-field {
    margin-bottom: 1.5rem;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid @blue-grey-300;
  }
}

// Responsive Design - Mobile-first approach
@media (max-width: 768px) {
  .page-content {
    padding: 1rem;
  }

  .hero-content {
    padding: 2rem 1rem;

    h2 {
      font-size: 2rem;
    }
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 1rem;
  }

  .hero-content {
    h2 {
      font-size: 1.75rem;
    }

    p {
      font-size: 1rem;
    }
  }
}

// Accessibility enhancements
@media (prefers-reduced-motion: reduce) {
  .feature-card {
    transition: none;
  }

  .hero-actions * {
    transition: none;
  }
}

// High contrast mode support
@media (prefers-contrast: high) {
  .feature-card {
    border: 2px solid @blue-grey-600;
  }

  .hero-card {
    border: 2px solid @deep-blue-400;
  }
}
</style>