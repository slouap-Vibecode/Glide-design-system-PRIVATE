<template>
  <div class="user-profile-card">
    <!-- Header Section with Neo Card -->
    <nck-card class="profile-header">
      <template #header>
        <div class="header-content">
          <nck-icon
            :iconName="'account-filled'"
            :iconSize="IconSize.L"
            :primaryColor="'@bright-blue-300'"
            :iconAltText="'User profile'"
            class="profile-avatar"
          />
          <div class="user-info">
            <h2 class="user-name">{{ user.name }}</h2>
            <nck-badge
              :type="user.status === 'active' ? 'success' : 'warning'"
              :label="user.status"
            />
          </div>
        </div>
      </template>

      <template #content>
        <div class="profile-details">
          <div class="detail-item">
            <nck-icon
              :iconName="'email'"
              :iconSize="IconSize.S"
              :primaryColor="'@blue-grey-500'"
              :iconAltText="'Email'"
            />
            <span>{{ user.email }}</span>
          </div>

          <div class="detail-item">
            <nck-icon
              :iconName="'location'"
              :iconSize="IconSize.S"
              :primaryColor="'@blue-grey-500'"
              :iconAltText="'Location'"
            />
            <span>{{ user.location }}</span>
          </div>

          <div class="detail-item">
            <nck-icon
              :iconName="'calendar'"
              :iconSize="IconSize.S"
              :primaryColor="'@blue-grey-500'"
              :iconAltText="'Member since'"
            />
            <span>Member since {{ formatDate(user.memberSince) }}</span>
          </div>
        </div>
      </template>

      <template #actions>
        <nck-button
          :label="'Edit Profile'"
          :buttonType="ButtonType.SECONDARY"
          :leftIcon="'edit-pencil'"
          @click="handleEditProfile"
        />
        <nck-button
          :label="'Send Message'"
          :buttonType="ButtonType.PRIMARY"
          :leftIcon="'email'"
          @click="handleSendMessage"
        />
      </template>
    </nck-card>

    <!-- Statistics Section -->
    <div class="stats-grid">
      <nck-card
        v-for="stat in userStats"
        :key="stat.id"
        class="stat-card"
      >
        <template #content>
          <div class="stat-content">
            <nck-icon
              :iconName="stat.icon"
              :iconSize="IconSize.M"
              :primaryColor="stat.color"
              :iconAltText="stat.label"
              class="stat-icon"
            />
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </template>
      </nck-card>
    </div>

    <!-- Actions Section -->
    <nck-card class="actions-section">
      <template #header>
        <h3>Quick Actions</h3>
      </template>

      <template #content>
        <div class="action-buttons">
          <nck-button
            :label="'Download Report'"
            :buttonType="ButtonType.SECONDARY"
            :leftIcon="'download'"
            :loading="isDownloading"
            @click="handleDownload"
          />
          <nck-button
            :label="'Share Profile'"
            :buttonType="ButtonType.SECONDARY"
            :leftIcon="'share'"
            @click="handleShare"
          />
          <nck-button
            :label="'Settings'"
            :buttonType="ButtonType.SECONDARY"
            :leftIcon="'setting'"
            @click="handleSettings"
          />
        </div>
      </template>
    </nck-card>

    <!-- Modal for editing profile -->
    <nck-modal
      v-if="showEditModal"
      :isOpen="showEditModal"
      :modalTitle="'Edit Profile'"
      @close="closeEditModal"
    >
      <template #content>
        <nck-form @submit="handleSubmitProfile">
          <div class="form-group">
            <nck-text-input
              v-model="editForm.name"
              :label="'Full Name'"
              :placeholder="'Enter your full name'"
              :required="true"
              :validation="nameValidation"
            />
          </div>

          <div class="form-group">
            <nck-text-input
              v-model="editForm.email"
              :label="'Email Address'"
              :placeholder="'Enter your email'"
              :type="'email'"
              :required="true"
              :validation="emailValidation"
            />
          </div>

          <div class="form-group">
            <nck-text-input
              v-model="editForm.location"
              :label="'Location'"
              :placeholder="'Enter your location'"
              :leftIcon="'location'"
            />
          </div>

          <div class="form-actions">
            <nck-button
              :label="'Cancel'"
              :buttonType="ButtonType.SECONDARY"
              @click="closeEditModal"
            />
            <nck-button
              :label="'Save Changes'"
              :buttonType="ButtonType.PRIMARY"
              :leftIcon="'check'"
              :loading="isSaving"
              type="submit"
            />
          </div>
        </nck-form>
      </template>
    </nck-modal>

    <!-- Toast notifications -->
    <nck-toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
      :duration="3000"
      @dismiss="dismissToast"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  nckCard,
  nckButton,
  nckBadge,
  nckIcon,
  nckModal,
  nckForm,
  nckTextInput,
  nckToast
} from '@/components/index';
import { ButtonType } from '@/constants/buttonType';
import { IconSize } from '@/constants/iconSize';
import type { User, UserStats, ValidationRule } from '@/types';

// Props
interface Props {
  userId: string;
}

const props = defineProps<Props>();

// Reactive data
const user = ref<User>({
  id: props.userId,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  location: 'San Francisco, CA',
  status: 'active',
  memberSince: new Date('2022-01-15'),
});

const userStats = ref<UserStats[]>([
  {
    id: 'trips',
    value: '24',
    label: 'Total Trips',
    icon: 'plane',
    color: '@bright-blue-300'
  },
  {
    id: 'points',
    value: '15,420',
    label: 'Reward Points',
    icon: 'star',
    color: '@green-300'
  },
  {
    id: 'savings',
    value: '$2,340',
    label: 'Total Savings',
    icon: 'dollar',
    color: '@orange-300'
  }
]);

// Form state
const showEditModal = ref(false);
const editForm = ref({
  name: '',
  email: '',
  location: ''
});

// Loading states
const isDownloading = ref(false);
const isSaving = ref(false);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref<'success' | 'error' | 'warning' | 'info'>('success');

// Form validation
const nameValidation = computed((): ValidationRule[] => [
  {
    rule: (value: string) => !!value.trim(),
    message: 'Name is required'
  },
  {
    rule: (value: string) => value.length >= 2,
    message: 'Name must be at least 2 characters'
  }
]);

const emailValidation = computed((): ValidationRule[] => [
  {
    rule: (value: string) => !!value.trim(),
    message: 'Email is required'
  },
  {
    rule: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address'
  }
]);

// Methods
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const handleEditProfile = (): void => {
  editForm.value = {
    name: user.value.name,
    email: user.value.email,
    location: user.value.location
  };
  showEditModal.value = true;
};

const closeEditModal = (): void => {
  showEditModal.value = false;
  editForm.value = { name: '', email: '', location: '' };
};

const handleSubmitProfile = async (): Promise<void> => {
  isSaving.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update user data
    user.value = {
      ...user.value,
      name: editForm.value.name,
      email: editForm.value.email,
      location: editForm.value.location
    };

    closeEditModal();
    showSuccessToast('Profile updated successfully!');
  } catch (error) {
    showErrorToast('Failed to update profile. Please try again.');
  } finally {
    isSaving.value = false;
  }
};

const handleSendMessage = (): void => {
  showInfoToast('Message composer opened');
};

const handleDownload = async (): Promise<void> => {
  isDownloading.value = true;

  try {
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));
    showSuccessToast('Report downloaded successfully!');
  } catch (error) {
    showErrorToast('Download failed. Please try again.');
  } finally {
    isDownloading.value = false;
  }
};

const handleShare = (): void => {
  if (navigator.share) {
    navigator.share({
      title: `${user.value.name}'s Profile`,
      text: 'Check out this user profile',
      url: window.location.href
    });
  } else {
    // Fallback for browsers without native sharing
    navigator.clipboard.writeText(window.location.href);
    showSuccessToast('Profile link copied to clipboard!');
  }
};

const handleSettings = (): void => {
  showInfoToast('Navigating to settings...');
};

// Toast methods
const showSuccessToast = (message: string): void => {
  toastMessage.value = message;
  toastType.value = 'success';
  showToast.value = true;
};

const showErrorToast = (message: string): void => {
  toastMessage.value = message;
  toastType.value = 'error';
  showToast.value = true;
};

const showInfoToast = (message: string): void => {
  toastMessage.value = message;
  toastType.value = 'info';
  showToast.value = true;
};

const dismissToast = (): void => {
  showToast.value = false;
};

// Lifecycle
onMounted(() => {
  // Component initialization logic
  console.log('User profile component mounted for user:', user.value.name);
});
</script>

<style lang="less" scoped>
@import '@/styles/colorsVariables.less';
@import '@/styles/typographyVariables.less';
@import '@/styles/radiusVariables.less';

.user-profile-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-m);
}

.profile-header {
  .header-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-l);

    .profile-avatar {
      background: @bright-blue-150;
      border-radius: var(--nck-radius-l);
      padding: var(--spacing-m);
    }

    .user-info {
      flex: 1;

      .user-name {
        margin: 0 0 var(--spacing-s) 0;
        color: @deep-blue-400;
        font-size: var(--font-size-xl);
        font-weight: 600;
      }
    }
  }

  .profile-details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    margin-top: var(--spacing-l);

    .detail-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-s);
      color: @blue-grey-600;
      font-size: var(--font-size-s);
    }
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-m);

  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-m);

      .stat-icon {
        background: @blue-grey-100;
        border-radius: var(--nck-radius-m);
        padding: var(--spacing-s);
      }

      .stat-info {
        .stat-value {
          font-size: var(--font-size-l);
          font-weight: 700;
          color: @deep-blue-400;
          margin-bottom: var(--spacing-xs);
        }

        .stat-label {
          font-size: var(--font-size-s);
          color: @blue-grey-500;
        }
      }
    }
  }
}

.actions-section {
  .action-buttons {
    display: flex;
    gap: var(--spacing-m);
    flex-wrap: wrap;
  }
}

.form-group {
  margin-bottom: var(--spacing-l);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-m);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-l);
  border-top: 1px solid @blue-grey-300;
}

/* Responsive design */
@media (max-width: 768px) {
  .user-profile-card {
    padding: var(--spacing-s);
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .form-actions {
    flex-direction: column-reverse;
  }
}

/* Focus and hover states for accessibility */
.nck-button:focus-visible {
  outline: 2px solid @bright-blue-300;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .stat-icon {
    border: 1px solid @blue-grey-500;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>