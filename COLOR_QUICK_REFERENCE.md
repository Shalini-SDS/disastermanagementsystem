# 🎨 Quick Color Reference Guide

## Primary Brand Colors
```
Hot Pink     #FF2E7E  - Main actions, CTAs
Magenta Red  #FF1654  - Dark header, emphasis
Light Pink   #FF6BA1  - Hover/active states
Soft Pink    #FFACC7  - Light backgrounds
```

## Secondary Brand Colors
```
Sky Blue     #0EA5E9  - Secondary actions
Cyan         #00D9FF  - Modern accents, highlights
Light Cyan   #7FF7FF  - Subtle backgrounds
```

## Alert & Status Colors
```
Red          #FF0A3E  - Emergency (CRITICAL)
Orange       #FF6B1A  - Warning (Caution)
Yellow       #FFD200  - Info (Attention)
Green        #00D98C  - Success (Completed)
Purple       #A855F7  - Special (Actions)
```

## Text & Backgrounds
```
Dark Gray    #0A1929  - Dark text
Gray 800     #0C2D48  - Primary text
Gray 600     #0284C7  - Secondary text
Light Gray   #BAE6FD  - Tertiary text
White        #FFFFFF  - Default background
Light BG     #F0F9FF  - Secondary background
```

---

## 🎯 Usage by Screen Type

### Auth Screens
- **RoleSelection**: `Colors.primary.dark` (#FF1654) header
- **TraineeLogin**: `Colors.secondary.main` (#00D9FF) header  
- **TrainerLogin**: `Colors.primary.main` (#FF2E7E) header
- **Signup**: `Colors.secondary.main` (#00D9FF) header

### Trainee Screens  
- **Home**: `Colors.secondary.main` header
- **Emergency**: `Colors.accent.red` header
- **Location**: `Colors.secondary.main` header
- **Profile**: `Colors.secondary.main` header

### Trainer Screens
- **Dashboard**: `Colors.primary.main` header
- **Monitoring**: `Colors.secondary.main` header
- **Alerts**: `Colors.accent.red` header
- **Sessions**: `Colors.secondary.main` header
- **Reports**: `Colors.accent.green` header
- **Profile**: `Colors.primary.main` header

---

## 💡 Design Patterns

### For Buttons
```
Primary Button (CTA)      → Colors.primary.main
Secondary Button          → Colors.secondary.main
Danger/Emergency Button  → Colors.accent.red
Success Button           → Colors.accent.green
Outline Button           → transparent + border
```

### For Status Badges
```
Active      → Colors.accent.green
Completed   → Colors.accent.blue
Warning     → Colors.accent.orange
Emergency   → Colors.accent.red
Pending     → Colors.neutral.gray600
```

### For Cards & Containers
```
Primary Card     → white background + shadow
Secondary Card   → Colors.neutral.gray50
Highlight Card   → subtle color tint
Error Card       → Colors.accent.red with white text
Success Card     → Colors.accent.green with white text
```

---

## 📏 Spacing Reference (in pixels)

```
xs    = 4px   (minimal spacing)
sm    = 8px   (small gaps)
md    = 12px  (medium spacing)
lg    = 16px  (standard padding)
xl    = 24px  (large sections)
xxl   = 32px  (major divisions)
xxxl  = 48px  (full headers)
```

---

## 🔤 Font Sizes

```
xs     = 12px  (small labels)
sm     = 14px  (secondary text)
base   = 16px  (body text)
lg     = 18px  (section titles)
xl     = 20px  (card headers)
xxl    = 24px  (large titles)
xxxl   = 32px  (screen headers)
giant  = 40px  (splash screens)
```

---

## 📐 Border Radius

```
xs  = 4px   (subtle)
sm  = 8px   (light rounding)
md  = 12px  (standard rounded)
lg  = 16px  (modern curves)
xl  = 24px  (bold rounding)
full = 999px (circles/pills)
```

---

## 🎨 Color Hex Values Quick Copy

### Vibrant Palette
```
#FF1654 - Magenta Red (Primary Dark)
#FF2E7E - Hot Pink (Primary Main)
#FF6BA1 - Light Pink (Primary Light)
#FFACC7 - Soft Pink (Primary Lighter)

#0EA5E9 - Sky Blue (Secondary Dark)
#00D9FF - Cyan (Secondary Main)
#7FF7FF - Light Cyan (Secondary Light)
#BFFFFE - Ultra Light Cyan (Secondary Lighter)

#FF0A3E - Vivid Red (Alert)
#FF6B1A - Vibrant Orange (Warning)
#FFD200 - Bright Yellow (Caution)
#00D98C - Vibrant Green (Success)
#A855F7 - Vibrant Purple (Special)
#0066FF - Bright Blue (Info)
```

### Grayscale
```
#FFFFFF - White
#F0F9FF - Light Gray 50
#E0F2FE - Light Gray 100
#BAE6FD - Light Gray 200
#7DD3FC - Light Gray 300
#38BDF8 - Light Gray 400
#0EA5E9 - Light Gray 500
#0284C7 - Light Gray 600
#075985 - Light Gray 700
#0C2D48 - Light Gray 800
#0A1929 - Almost Black 900
```

---

## 🚀 Implementation Example

### Screen Header Setup
```typescript
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary.main,      // #FF2E7E
    paddingVertical: Spacing.xl,              // 24px
    paddingHorizontal: Spacing.lg,            // 16px
    borderBottomLeftRadius: BorderRadius.lg,  // 16px
    borderBottomRightRadius: BorderRadius.lg, // 16px
  },
  title: {
    fontSize: FontSizes.xxl,                  // 24px
    fontWeight: '800',
    color: Colors.neutral.white,              // #FFFFFF
  },
});
```

### Button Setup
```typescript
const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.primary.main,    // #FF2E7E
    paddingVertical: Spacing.md,             // 12px
    paddingHorizontal: Spacing.lg,           // 16px
    borderRadius: BorderRadius.md,           // 12px
  },
  dangerButton: {
    backgroundColor: Colors.accent.red,      // #FF0A3E
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
});
```

### Card Setup
```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.primary.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
```

---

## ✅ Best Practices

1. **Always use spacing constants** - Never hardcode pixels
2. **Use semantic colors** - Red for errors, green for success
3. **Maintain contrast** - Use Color.neutral.white text on vibrant backgrounds
4. **Round corners** - Use `BorderRadius.lg` for modern look
5. **Add shadows** - Use elevation for depth on card components
6. **Consistent padding** - Use `Spacing.lg` for standard padding
7. **Text color hierarchy** - Dark gray for primary, lighter for secondary

---

*Quick Reference Guide v1.0*
*Updated: February 9, 2026*
