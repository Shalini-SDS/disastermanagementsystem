# 🎨 Visual Design Guide - Mobile Theme

## 📱 Screen Layout Hierarchy

### Auth Flow Screens
```
┌─────────────────────────────────────┐
│  Header (Vibrant Color)             │  ← 100% width
│  Title + Subtitle (White Text)      │
└─────────────────────────────────────┘
│                                     │
│  Content Area (Light Gray BG)       │
│  ┌──────────────────────────────┐  │
│  │  Card/Form Components        │  │ ← Lg = 16px padding
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  Button (Vibrant Color)      │  │ ← Full width
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

### Dashboard/Listing Screens
```
┌─────────────────────────────────────┐
│  Header (Vibrant Color)             │
│  Title + Subtitle (White)           │
└─────────────────────────────────────┘
│  Padding Lg                         │
│  ┌──────────────────────────────┐  │
│  │ Section Title (Dark Gray)    │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  Item Card                   │  │ ← White BG + Shadow
│  │  ┌─ Status Badge (Color)     │  │
│  │  └─ Info Text (Gray)         │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  Item Card                   │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

### Tab Navigation
```
┌─────────────────────────────────────┐
│         Screen Content              │
│                                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐  ← Height: 65px
│ 🏠    🚨    📍    👤             │
│ Home  Emrgcy Loc. Prof             │
│ [Pink] [Red]  [Cyan] [Purp]        │ ← Colored on Focus
└─────────────────────────────────────┘
```

---

## 🎯 Component Styling Guide

### Headers (All Screens)
```
┌─────────────────────────────────────┐
│ 🎨 VIBRANT COLOR BACKGROUND        │  ← Colors: Primary/Secondary/Accent
│                                     │     Padding: xl (24px)
│ Big Title (white, fontWeight 800)  │     BorderRadius: lg (bottom only)
│ Subtitle (white, opacity 0.9)      │     Height: ~100px
└─────────────────────────────────────┘
```

**Colors Used:**
- Auth: Magenta, Cyan, Hot Pink, Cyan
- Trainee: Cyan (mostly)
- Trainer: Hot Pink, Cyan, Red, Green, Blue

---

### Cards
```
┌──────────────────────────────────┐
│  ┌─────────────────────────────┐ │
│  │ Card Content (white label)  │ │  ← Background: White
│  │ Info text (gray)            │ │     Padding: lg (16px)
│  │ Status badge (color)        │ │     BorderRadius: md (12px)
│  └─────────────────────────────┘ │     Elevation: 5-8
└──────────────────────────────────┘      Margin bottom: lg
```

**Card Variants:**
- Primary: Hot Pink accent
- Secondary: Cyan accent
- Danger: Red accent
- Success: Green accent
- Default: Ghost (transparent, outline)

---

### Buttons
```
┌──────────────────────────────────┐
│  ╔══════════════════════════════╗ │
│  ║ 🎨 BUTTON TEXT (White)       ║ │  ← Background: Vibrant
│  ╚══════════════════════════════╝ │     Padding: md/lg
│                                  │     BorderRadius: md (12px)
│  ╔══════════════════════════════╗ │     Active: Darker shade
│  ║ Secondary Button (Outline)   ║ │     Disabled: Gray
│  ╚══════════════════════════════╝ │
└──────────────────────────────────┘
```

**Button Variants:**
- Primary: `Colors.primary.main`
- Secondary: `Colors.secondary.main`
- Danger: `Colors.accent.red`
- Success: `Colors.accent.green`
- Outline: Transparent + border

---

### Input Fields
```
┌──────────────────────────────────┐
│ Label (Dark Gray)                │
│ ┌────────────────────────────┐   │  ← Background: White
│ │ Input placeholder text  |  │   │     Border: Light gray
│ └────────────────────────────┘   │     Padding: md
│ [Error message - red]            │     BorderRadius: sm
└──────────────────────────────────┘
```

---

### Status Badges
```
Active:     ┌─────────────────┐
            │ 🟢 Active       │  ← Colors.accent.green
            └─────────────────┘

Warning:    ┌─────────────────┐
            │ 🟡 Warning      │  ← Colors.accent.orange
            └─────────────────┘

Danger:     ┌─────────────────┐
            │ 🔴 Emergency    │  ← Colors.accent.red
            └─────────────────┘

Info:       ┌─────────────────┐
            │ ℹ️  Info         │  ← Colors.accent.blue
            └─────────────────┘
```

---

## 🎨 Color Application Matrix

| Element | Color | Dark Mode |
|---------|-------|-----------|
| Primary Header | Hot Pink | Darker Magenta |
| Secondary Header | Cyan | Darker Cyan |
| Primary Button | Hot Pink | Magenta Red |
| Secondary Button | Cyan | Sky Blue |
| Danger Action | Red | Dark Red |
| Success Indicator | Green | Dark Green |
| Warning Text | Orange | Dark Orange |
| Primary Text | Dark Gray (800) | Light Gray |
| Secondary Text | Gray (600) | Light Gray |
| Body Background | White | Dark Gray |

---

## 📏 Spacing Reference

```
┌─────────────────────────────────────┐
│ Header (paddingVertical: xl = 24px) │  ← Global padding: lg = 16px
│                                     │
│  lg                                 │
├─ ┌─────────────────────────────┐   │
│  │ Card (padding: lg = 16px)   │   │
│  │ ┌─────────────────────────┐ │   │
│  │ │ Text + md gap           │ │   │
│  │ ├─────────────────────────┤ │   │
│  │ │ Button (padding: md)    │ │   │
│  │ └─────────────────────────┘ │   │
│  └─────────────────────────────┘   │
│  lg (bottom margin)                │
│  ┌─────────────────────────────┐   │
│  │ Another Card                │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎯 Typography Hierarchy

### Page Title
```
fontSize: 32px      (FontSizes.xxxl)
fontWeight: 800
color: White        (on vibrant headers)
marginBottom: 8px
```

### Section Title
```
fontSize: 18px      (FontSizes.lg)
fontWeight: 700
color: Dark Gray    (Colors.neutral.gray800)
marginBottom: 12px
marginTop: 12px
```

### Card Title/Header
```
fontSize: 18px      (FontSizes.lg)
fontWeight: 700
color: Gray         (Colors.neutral.gray800)
marginBottom: 12px
```

### Body Text
```
fontSize: 16px      (FontSizes.base)
fontWeight: 400/500
color: Gray         (Colors.neutral.gray600)
lineHeight: 22px
```

### Small Text/Label
```
fontSize: 12px      (FontSizes.xs)
fontWeight: 600
color: Light Gray   (Colors.neutral.gray400)
marginBottom: 4px
```

---

## 🌈 Complete Color Codes

### Hot Pink Shade (Primary)
```
#FF1654 - Dark (Headers)
#FF2E7E - Main (Buttons, Primary Actions)
#FF6BA1 - Light (Hover, Subtle BG)
#FFACC7 - Lighter (Very subtle BG)
```

### Cyan Shade (Secondary)
```
#0EA5E9 - Dark (Dark mode)
#00D9FF - Main (Buttons, Secondary)
#7FF7FF - Light (Hover)
#BFFFFE - Lighter (Subtle BG)
```

### Alert/Status Colors
```
#FF0A3E - Red (Critical, Emergency)
#FF6B1A - Orange (Warning)
#FFD200 - Yellow (Caution)
#00D98C - Green (Success, Positive)
#A855F7 - Purple (Special Actions)
#0066FF - Blue (Info)
```

### Gray/Neutral
```
#FFFFFF - White (Base BG)
#F0F9FF - Light 50 (Secondary BG)
#0C2D48 - Dark 800 (Primary Text)
#0284C7 - Dark 600 (Secondary Text)
#0A1929 - Almost Black (Dark mode)
```

---

## ✅ Design System Checklist

- ✅ Consistent header styling across all screens
- ✅ Color-coded buttons by action type
- ✅ Proper text contrast ratios (WCAG AA)
- ✅ Adequate touch target sizes (48px min)
- ✅ Consistent spacing and padding
- ✅ Rounded corners for modern feel
- ✅ Semantic color usage
- ✅ Shadow/elevation for depth
- ✅ Typography hierarchy established
- ✅ Icons and emojis for quick recognition

---

## 🎨 Theme Swatch Export

```css
/* Vibrant Mobile Theme - CSS Variables */
:root {
  /* Primary Brand - Hot Pink */
  --color-primary-dark: #FF1654;
  --color-primary-main: #FF2E7E;
  --color-primary-light: #FF6BA1;
  --color-primary-lighter: #FFACC7;

  /* Secondary Brand - Cyan */
  --color-secondary-dark: #0EA5E9;
  --color-secondary-main: #00D9FF;
  --color-secondary-light: #7FF7FF;
  --color-secondary-lighter: #BFFFFE;

  /* Accents */
  --color-accent-red: #FF0A3E;
  --color-accent-orange: #FF6B1A;
  --color-accent-yellow: #FFD200;
  --color-accent-green: #00D98C;
  --color-accent-purple: #A855F7;
  --color-accent-blue: #0066FF;

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-50: #F0F9FF;
  --color-gray-800: #0C2D48;
  --color-gray-600: #0284C7;
  --color-black: #0A1929;
}
```

---

*Visual Design Guide v1.0*  
*Mobile App Theme - Vibrant Edition*  
*Updated: February 9, 2026*
