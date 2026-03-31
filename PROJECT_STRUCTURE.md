# ChromaLens Project Structure

## 📁 Root Directory
```
chromalens/
├── .git/                          # Git version control
├── .next/                         # Next.js build output
├── node_modules/                  # Dependencies
├── public/                        # Static assets
├── src/                           # Source code
├── .gitignore                     # Git ignore rules
├── AGENTS.md                      # AI agent documentation
├── CLAUDE.md                      # Claude AI notes
├── README.md                      # Project documentation
├── components.json                # Shadcn UI configuration
├── eslint.config.mjs              # ESLint configuration
├── next-env.d.ts                  # Next.js TypeScript definitions
├── next.config.js                 # Next.js configuration (legacy)
├── next.config.ts                 # Next.js configuration (current)
├── package-lock.json              # Dependency lock file
├── package.json                   # Project dependencies & scripts
├── postcss.config.mjs             # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 📁 src/ Directory
```
src/
├── app/                           # Next.js App Router
├── components/                    # React components
├── hooks/                         # Custom React hooks
├── lib/                           # Utility libraries
└── store/                         # State management
```

## 📁 src/app/ Directory
```
src/app/
├── api/                           # API routes
├── favicon.ico                    # Favicon
├── globals.css                    # Global styles
├── layout.tsx                     # Root layout component
└── page.tsx                       # Home page component
```

## 📁 src/components/ Directory
```
src/components/
├── Canvas/                        # Canvas-related components
├── Output/                        # Output display components
├── Picker/                        # Color picker components
└── UI/                            # Reusable UI components
```

## 📁 src/components/Canvas/
```
src/components/Canvas/
└── ImageCanvas.tsx                # Image canvas for color picking
```

## 📁 src/components/Output/
```
src/components/Output/
├── CopyButton.tsx                 # Copy to clipboard button
├── FormatLine.tsx                 # Color format display line
├── FormatRow.tsx                  # Color format row component
├── PickerCopyButton.tsx           # Picker-specific copy button
└── index.ts                       # Output components barrel export
```

## 📁 src/components/Picker/
```
src/components/Picker/
├── UploadZone.tsx                 # File upload zone
└── index.ts                       # Picker components barrel export
```

## 📁 src/components/UI/
```
src/components/UI/
├── FadeInUp.tsx                   # Animation component
├── ImageSelectModal.tsx           # Image selection modal
├── LogoisumHero.tsx               # Hero section component
├── Tabs.tsx                       # Tab navigation component
├── button.tsx                     # Button component (Shadcn)
├── glowy-waves-hero-shadcnui.tsx  # Animated hero component
└── minimal-footer.tsx             # Footer component
```

## 📁 src/hooks/ Directory
```
src/hooks/
├── useEyeDropper.ts               # EyeDropper API hook
└── index.ts                       # Hooks barrel export
```

## 📁 src/lib/ Directory
```
src/lib/
├── colour/                        # Color utilities
├── utils.ts                       # General utilities
└── index.ts                       # Library barrel export
```

## 📁 src/lib/colour/
```
src/lib/colour/
├── convert.ts                     # Color format conversions
├── index.ts                       # Color utilities barrel export
└── types.ts                       # Color type definitions
```

## 📁 src/store/ Directory
```
src/store/
└── useColourStore.ts              # Zustand color state store
```

## 📁 public/ Directory
```
public/
├── demo-image.jpg                 # Demo image for testing
├── next.svg                       # Next.js logo
└── vercel.svg                     # Vercel logo
```

## 🔧 Configuration Files

### package.json
- **Dependencies**: React, Next.js, Framer Motion, Lucide React, Zustand
- **Dev Dependencies**: TypeScript, Tailwind CSS, ESLint, Shadcn UI
- **Scripts**: Development, build, start, lint commands

### tailwind.config.ts
- **Content Paths**: Component and page file patterns
- **Theme**: Custom colors, fonts (Barlow, Instrument Serif)
- **Plugins**: Tailwind CSS animation and typography plugins

### tsconfig.json
- **Target**: ES2017
- **Module**: ESNext
- **Path Aliases**: `@/*` maps to `./src/*`
- **Strict Mode**: Enabled for type safety

### next.config.ts
- **App Router**: Enabled
- **Dev Indicators**: Disabled for production feel
- **Experimental Features**: Optimized builds

## 🏗️ Architecture Overview

### Component Structure
- **Layout Components**: Page layout and navigation
- **Feature Components**: Color picker, canvas, upload
- **UI Components**: Reusable design system (Shadcn UI)
- **Business Logic**: Color conversion, state management

### State Management
- **Zustand Store**: Global color state and history
- **Local State**: Component-specific UI state
- **URL State**: Image URL and modal states

### Styling Approach
- **Tailwind CSS**: Utility-first styling
- **Custom Fonts**: Barlow (UI), Instrument Serif (headings)
- **Design System**: Consistent spacing, colors, animations
- **Responsive Design**: Mobile-first approach

### Data Flow
1. **User Input** → Canvas/Upload/URL
2. **Color Extraction** → Canvas API processing
3. **State Update** → Zustand store
4. **Format Conversion** → Multiple color formats
5. **UI Update** → Reactive component rendering

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#10986C)
- **Grayscale**: White to black spectrum
- **Gradients**: Soft color transitions (0.7 opacity)
- **Semantic**: Success, error, warning colors

### Typography
- **Barlow**: UI text, buttons, labels
- **Instrument Serif**: Headings, emphasis
- **Font Sizes**: Responsive scaling (12px to 48px)
- **Weights**: 300-700 for hierarchy

### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64px
- **Layout**: Consistent padding/margins
- **Responsive**: Adaptive spacing per breakpoint

### Animations
- **Framer Motion**: Page transitions, micro-interactions
- **FadeInUp**: Staggered content reveals
- **Hover States**: Smooth color/transform transitions
- **Loading States**: Skeleton screens and spinners

## 🚀 Build & Deployment

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Deployment
- **Platform**: Vercel (recommended)
- **Build Output**: Static site with client-side features
- **Environment**: Production optimizations enabled
- **CI/CD**: Git-based automatic deployments

## 📊 Performance Considerations

### Optimization
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Bundle Analysis**: Webpack Bundle Analyzer

### Accessibility
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Tab order and focus management
- **Color Contrast**: WCAG AA compliance

## 🔄 Future Enhancements

### Potential Features
- **Color Palettes**: Generate and save color schemes
- **Export Options**: Download color data as JSON/CSV
- **API Integration**: External color databases
- **Collaboration**: Share color collections
- **Mobile App**: React Native implementation

### Technical Improvements
- **PWA Support**: Offline functionality
- **WebAssembly**: Faster color processing
- **Cloud Storage**: Sync across devices
- **Analytics**: Usage tracking and insights
- **Testing**: Unit and integration tests
