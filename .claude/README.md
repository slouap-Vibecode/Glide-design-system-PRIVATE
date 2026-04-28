# Claude Code Workspace Configuration

## 📋 Permissions automatiques pour Claude Code

Ce workspace est pré-configuré avec des permissions optimales pour Claude Code permettant :

### ✅ **Permissions accordées automatiquement :**

#### **Modifications de fichiers**
- ✅ Lecture/écriture dans tout le workspace
- ✅ Modification des composants Vue.js
- ✅ Création/édition des stories Storybook
- ✅ Gestion de la documentation

#### **Commandes de développement**
- ✅ `npm run storybook` - Lancement de Storybook
- ✅ `npm run build` - Build de production
- ✅ `npm run typecheck` - Vérification TypeScript
- ✅ `npm run dev` - Serveur de développement
- ✅ `npm install/uninstall` - Gestion des packages

#### **Outils intégrés**
- ✅ Chrome DevTools (tests automatisés)
- ✅ Figma integration (design sync)
- ✅ Git operations (lecture seule)
- ✅ Process management

### 🔧 **Configuration automatique**

Le fichier `.claude-settings.json` à la racine configure automatiquement toutes les nouvelles instances de Claude Code dans ce workspace.

### 📁 **Structure supportée**
```
Glide-workspace/
├── .claude-settings.json          # Configuration principale
├── Neo Design System/             # Système de design Neo
│   ├── neo-component-kit-ai-enhanced/  # Composants Vue.js
│   └── neo-icon-kit/             # Librairie d'icônes
├── docs/                         # Documentation
└── .claude/                      # Configuration Claude
    ├── README.md                 # Ce fichier
    ├── agents/                   # Agents spécialisés
    └── skills/                   # Compétences métier
```

### 🚀 **Utilisation**

1. **Nouvelle session :** Ouvrez Claude Code dans n'importe quel sous-dossier
2. **Permissions héritées :** Les permissions sont automatiquement appliquées
3. **Développement :** Claude peut modifier, tester et valider automatiquement

### ⚙️ **Personnalisation**

Pour modifier les permissions :
1. Éditez `.claude-settings.json`
2. Relancez Claude Code
3. Les nouvelles permissions s'appliquent immédiatement

### 🔒 **Sécurité**

- ❌ **Pas d'accès :** Fichiers système, autres projets
- ❌ **Pas de commits :** Git en lecture seule
- ✅ **Contrôle total :** Workspace Glide-workspace uniquement

---

**Note :** Cette configuration garantit une expérience de développement optimale avec Claude Code tout en maintenant la sécurité du système.