/**
 * Neo Component Kit - AI-Optimized Template Library
 * Pre-built templates for rapid prototyping and AI-assisted development
 */

export const CommonUIPatterns = {
  /**
   * Complete user login form with validation
   */
  loginForm: `
    <nck-form @submit="handleLogin" :loading="isLoading">
      <nck-text-input
        name="email"
        label="Email Address"
        type="email"
        required
        rules="required|email"
        placeholder="Enter your email"
        v-model="credentials.email"
      />
      <nck-text-input
        name="password"
        label="Password"
        type="password"
        required
        rules="required|min:8"
        placeholder="Enter your password"
        v-model="credentials.password"
      />
      <div class="form-actions">
        <nck-button
          label="Sign In"
          type="filled"
          :loading="isLoading"
          @click="handleLogin"
        />
        <nck-button
          label="Cancel"
          type="outline"
          @click="handleCancel"
        />
      </div>
    </nck-form>
  `,

  /**
   * User registration form with comprehensive validation
   */
  registrationForm: `
    <nck-form @submit="handleRegister" :loading="isSubmitting">
      <nck-text-input
        name="firstName"
        label="First Name"
        required
        rules="required|min:2"
        v-model="user.firstName"
      />
      <nck-text-input
        name="lastName"
        label="Last Name"
        required
        rules="required|min:2"
        v-model="user.lastName"
      />
      <nck-text-input
        name="email"
        label="Email Address"
        type="email"
        required
        rules="required|email"
        v-model="user.email"
      />
      <nck-text-input
        name="password"
        label="Password"
        type="password"
        required
        rules="required|min:8"
        v-model="user.password"
      />
      <nck-text-input
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        required
        rules="required|confirmed:password"
        v-model="user.confirmPassword"
      />
      <nck-checkbox
        name="terms"
        label="I agree to the Terms and Conditions"
        required
        v-model="user.acceptedTerms"
      />
      <div class="form-actions">
        <nck-button
          label="Create Account"
          type="filled"
          :loading="isSubmitting"
          @click="handleRegister"
        />
        <nck-button
          label="Cancel"
          type="outline"
          @click="handleCancel"
        />
      </div>
    </nck-form>
  `,

  /**
   * Data table with actions and pagination
   */
  dataTableWithPagination: `
    <div class="data-table-container">
      <div class="table-header">
        <h2>{{ tableTitle }}</h2>
        <div class="table-actions">
          <nck-search-input
            placeholder="Search..."
            v-model="searchQuery"
            @input="handleSearch"
          />
          <nck-button
            label="Add New"
            type="filled"
            leftIcon="add-plus"
            @click="handleAdd"
          />
        </div>
      </div>

      <nck-table
        :columns="columns"
        :data="filteredData"
        @row-click="handleRowClick"
      >
        <template #actions="{ row }">
          <nck-button
            label="Edit"
            type="outline"
            size="s"
            leftIcon="edit"
            @click="handleEdit(row)"
          />
          <nck-button
            label="Delete"
            type="ghost"
            size="s"
            color="danger"
            leftIcon="delete"
            @click="handleDelete(row)"
          />
        </template>
      </nck-table>

      <nck-pagination
        :total="totalItems"
        :current-page="currentPage"
        :page-size="pageSize"
        @page-change="handlePageChange"
      />
    </div>
  `,

  /**
   * User profile card with edit functionality
   */
  userProfileCard: `
    <nck-card elevated class="user-profile-card">
      <template #header>
        <div class="profile-header">
          <nck-icon
            iconName="account-filled"
            :iconSize="IconSize.L"
            iconAltText=""
            class="profile-avatar"
          />
          <div class="profile-info">
            <h2>{{ user.name }}</h2>
            <p class="profile-role">{{ user.role }}</p>
          </div>
        </div>
      </template>

      <div class="profile-content">
        <div class="profile-detail">
          <strong>Email:</strong> {{ user.email }}
        </div>
        <div class="profile-detail">
          <strong>Department:</strong> {{ user.department }}
        </div>
        <div class="profile-detail">
          <strong>Status:</strong>
          <nck-badge
            :label="user.status"
            :type="getStatusBadgeType(user.status)"
          />
        </div>
        <div class="profile-detail">
          <strong>Last Login:</strong> {{ formatDate(user.lastLogin) }}
        </div>
      </div>

      <template #actions>
        <nck-button
          label="Edit Profile"
          type="outline"
          leftIcon="edit"
          @click="handleEditProfile"
        />
        <nck-button
          label="Change Password"
          type="outline"
          leftIcon="key"
          @click="handleChangePassword"
        />
        <nck-menu
          :items="profileMenuItems"
          @item-click="handleMenuAction"
        >
          <nck-button
            label="More Actions"
            type="ghost"
            rightIcon="chevron-down"
          />
        </nck-menu>
      </template>
    </nck-card>
  `,

  /**
   * Confirmation modal for destructive actions
   */
  confirmationModal: `
    <nck-modal
      :title="confirmationTitle"
      v-model:displayed="showConfirmation"
      size="small"
      role="alertdialog"
    >
      <div class="confirmation-content">
        <nck-icon
          :iconName="confirmationType === 'danger' ? 'warning-filled' : 'info-support-filled'"
          :iconSize="IconSize.L"
          :primaryColor="confirmationType === 'danger' ? IconColors.RED_300 : IconColors.BRIGHT_BLUE_300"
          iconAltText=""
          class="confirmation-icon"
        />
        <div class="confirmation-message">
          <p>{{ confirmationMessage }}</p>
          <p v-if="confirmationDetails" class="confirmation-details">
            {{ confirmationDetails }}
          </p>
        </div>
      </div>

      <template #actions>
        <nck-button
          :label="confirmButtonLabel"
          type="filled"
          :color="confirmationType === 'danger' ? 'danger' : 'primary'"
          :loading="isConfirming"
          @click="handleConfirm"
        />
        <nck-button
          label="Cancel"
          type="outline"
          @click="handleCancel"
        />
      </template>
    </nck-modal>
  `,

  /**
   * Contact form with validation and submission
   */
  contactForm: `
    <nck-form @submit="handleSubmit" :loading="isSubmitting">
      <div class="form-header">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div class="form-row">
        <nck-text-input
          name="firstName"
          label="First Name"
          required
          rules="required|min:2"
          v-model="contact.firstName"
        />
        <nck-text-input
          name="lastName"
          label="Last Name"
          required
          rules="required|min:2"
          v-model="contact.lastName"
        />
      </div>

      <nck-text-input
        name="email"
        label="Email Address"
        type="email"
        required
        rules="required|email"
        v-model="contact.email"
      />

      <nck-text-input
        name="phone"
        label="Phone Number"
        type="tel"
        placeholder="(555) 123-4567"
        v-model="contact.phone"
      />

      <nck-dropdown
        name="subject"
        label="Subject"
        :options="subjectOptions"
        required
        v-model="contact.subject"
      />

      <nck-text-area
        name="message"
        label="Message"
        required
        rules="required|min:10"
        placeholder="Please describe how we can help you..."
        :rows="6"
        v-model="contact.message"
      />

      <div class="form-actions">
        <nck-button
          label="Send Message"
          type="filled"
          leftIcon="send"
          :loading="isSubmitting"
          @click="handleSubmit"
        />
        <nck-button
          label="Clear Form"
          type="outline"
          @click="handleClear"
        />
      </div>
    </nck-form>
  `,

  /**
   * Search interface with results and pagination
   */
  searchInterface: `
    <div class="search-interface">
      <div class="search-header">
        <nck-search-input
          placeholder="Search for anything..."
          v-model="searchQuery"
          @input="handleSearch"
          class="search-main"
        />
        <nck-button
          label="Advanced Search"
          type="outline"
          leftIcon="filter"
          @click="showAdvancedSearch = true"
        />
      </div>

      <div v-if="searchQuery" class="search-results">
        <div class="results-header">
          <p class="results-count">
            {{ totalResults }} results for "{{ searchQuery }}"
          </p>
          <nck-dropdown
            :options="sortOptions"
            v-model="sortBy"
            placeholder="Sort by..."
          />
        </div>

        <div v-if="isSearching" class="search-loading">
          <nck-loader :size="LoaderSize.M" loadingText="Searching..." />
        </div>

        <div v-else-if="searchResults.length > 0" class="results-list">
          <nck-card
            v-for="result in searchResults"
            :key="result.id"
            class="result-item"
            @click="handleResultClick(result)"
          >
            <div class="result-content">
              <h3 class="result-title">{{ result.title }}</h3>
              <p class="result-description">{{ result.description }}</p>
              <div class="result-meta">
                <nck-badge :label="result.category" />
                <span class="result-date">{{ formatDate(result.updatedAt) }}</span>
              </div>
            </div>
          </nck-card>
        </div>

        <div v-else class="no-results">
          <nck-icon
            iconName="search"
            :iconSize="IconSize.XL"
            :primaryColor="IconColors.BLUE_GREY_400"
            iconAltText=""
          />
          <p>No results found for "{{ searchQuery }}"</p>
          <nck-button
            label="Clear Search"
            type="outline"
            @click="clearSearch"
          />
        </div>

        <nck-pagination
          v-if="searchResults.length > 0"
          :total="totalResults"
          :current-page="currentPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  `,

  /**
   * Settings page with grouped options
   */
  settingsPage: `
    <div class="settings-page">
      <nck-header title="Settings" />

      <nck-tabs :tabs="settingsTabs" v-model:active-tab="activeTab">
        <template #general>
          <div class="settings-section">
            <h3>General Settings</h3>
            <nck-form>
              <nck-text-input
                name="displayName"
                label="Display Name"
                v-model="settings.displayName"
              />
              <nck-dropdown
                name="language"
                label="Language"
                :options="languageOptions"
                v-model="settings.language"
              />
              <nck-dropdown
                name="timezone"
                label="Timezone"
                :options="timezoneOptions"
                v-model="settings.timezone"
              />
            </nck-form>
          </div>
        </template>

        <template #notifications>
          <div class="settings-section">
            <h3>Notification Preferences</h3>
            <nck-form>
              <nck-switch
                name="emailNotifications"
                label="Email Notifications"
                v-model="settings.emailNotifications"
              />
              <nck-switch
                name="pushNotifications"
                label="Push Notifications"
                v-model="settings.pushNotifications"
              />
              <nck-switch
                name="smsNotifications"
                label="SMS Notifications"
                v-model="settings.smsNotifications"
              />
            </nck-form>
          </div>
        </template>

        <template #security>
          <div class="settings-section">
            <h3>Security Settings</h3>
            <nck-form>
              <nck-switch
                name="twoFactorAuth"
                label="Two-Factor Authentication"
                v-model="settings.twoFactorAuth"
              />
              <nck-button
                label="Change Password"
                type="outline"
                leftIcon="key"
                @click="showChangePassword = true"
              />
              <nck-button
                label="Download Data"
                type="outline"
                leftIcon="download"
                @click="handleDataDownload"
              />
            </nck-form>
          </div>
        </template>
      </nck-tabs>

      <div class="settings-actions">
        <nck-button
          label="Save Changes"
          type="filled"
          :loading="isSaving"
          @click="handleSave"
        />
        <nck-button
          label="Reset to Defaults"
          type="outline"
          @click="handleReset"
        />
      </div>
    </div>
  `,
};

// Export individual templates for specific use cases
export const FormTemplates = {
  login: CommonUIPatterns.loginForm,
  registration: CommonUIPatterns.registrationForm,
  contact: CommonUIPatterns.contactForm,
};

export const DataTemplates = {
  tableWithPagination: CommonUIPatterns.dataTableWithPagination,
  searchInterface: CommonUIPatterns.searchInterface,
};

export const LayoutTemplates = {
  userProfile: CommonUIPatterns.userProfileCard,
  settingsPage: CommonUIPatterns.settingsPage,
};

export const ModalTemplates = {
  confirmation: CommonUIPatterns.confirmationModal,
};

// Template generator functions
export const generateTemplate = {
  /**
   * Generate a form based on field specifications
   */
  form: (fields) => {
    const fieldTemplates = fields.map((field) => {
      switch (field.type) {
        case "text":
        case "email":
        case "password":
          return `<nck-text-input name="${field.name}" label="${field.label}" type="${field.type}" ${field.required ? "required" : ""} />`;
        case "select":
          return `<nck-dropdown name="${field.name}" label="${field.label}" :options="${field.name}Options" ${field.required ? "required" : ""} />`;
        case "textarea":
          return `<nck-text-area name="${field.name}" label="${field.label}" ${field.required ? "required" : ""} />`;
        case "checkbox":
          return `<nck-checkbox name="${field.name}" label="${field.label}" />`;
        default:
          return `<nck-text-input name="${field.name}" label="${field.label}" />`;
      }
    });

    return `
      <nck-form @submit="handleSubmit">
        ${fieldTemplates.join("\n        ")}
        <div class="form-actions">
          <nck-button label="Submit" type="filled" />
          <nck-button label="Cancel" type="outline" />
        </div>
      </nck-form>
    `;
  },

  /**
   * Generate a data table with specified columns
   */
  table: (columns) => {
    const columnConfig = columns.map((col) => `{ key: '${col.key || col}', label: '${col.label || col}' }`);

    return `
      <div class="data-table-container">
        <nck-table
          :columns="[${columnConfig.join(", ")}]"
          :data="tableData"
        />
        <nck-pagination :total="totalItems" @page-change="handlePageChange" />
      </div>
    `;
  },
};

// Export all templates
export default {
  CommonUIPatterns,
  FormTemplates,
  DataTemplates,
  LayoutTemplates,
  ModalTemplates,
  generateTemplate,
};
