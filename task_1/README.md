# Collapsible Sidebar - Task 1

![alt text](sidebar-demo.png)

A fully responsive collapsible sidebar implementation with smooth animations and modern design.

## Features

### Core Requirements ✅
- **Logo Placeholder**: Clean logo section at the top of the sidebar
- **Navigation Links**: 5 navigation links with Font Awesome icons
- **Toggle Functionality**: Collapse/expand functionality for all screen sizes
- **Smooth Animations**: CSS transitions and cubic-bezier timing functions
- **Clean Layout**: Modern design with gradients and hover effects

### Desktop Features
- **In-Sidebar Toggle Button**: Circular collapse button positioned at the bottom of the sidebar
- **Width Animation**: Sidebar smoothly transitions between 280px (open) and 80px (collapsed)
- **Content Adjustment**: Main content area adjusts its margin when sidebar is collapsed
- **Icon-Only Mode**: When collapsed, only icons are visible with tooltips on hover

### Mobile & Tablet Features
- **Mobile Menu Button**: Hamburger menu button in the top-left corner
- **Overlay**: Semi-transparent overlay when sidebar is open on mobile
- **Slide Animation**: Sidebar slides in from the left on mobile devices
- **Touch Support**: Swipe gestures to open/close sidebar
- **Responsive Design**: Adaptive layout for different screen sizes

### Additional Features
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Active States**: Visual indication of the current page
- **Escape Key**: Close sidebar with ESC key on mobile
- **Smooth Scrolling**: Enhanced user experience
- **Performance Optimized**: Debounced resize events and smooth animations


## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Flexbox, Grid, Transitions, Media Queries
- **JavaScript ES6+**: DOM manipulation, Event handling
- **Font Awesome 6**: Icons for navigation and buttons

## Responsive Breakpoints

- **Desktop**: > 1024px - Full sidebar with collapse functionality
- **Tablet**: 768px - 1024px - Mobile menu with slide-out sidebar
- **Mobile**: < 768px - Optimized for touch devices

## Key Implementation Details

### Toggle Buttons
1. **Desktop**: Collapse button inside sidebar (always visible)
2. **Mobile/Tablet**: Menu button in top-left corner (fixed position)
3. **Both buttons have the same toggle functionality**

### Animation System
- **CSS Transitions**: Smooth width changes and transforms
- **Cubic-bezier Easing**: Natural feeling animations
- **Transform3d**: Hardware-accelerated animations

### Responsive Strategy
- **Mobile-first**: Base styles for mobile, enhanced for desktop
- **Progressive Enhancement**: Features added based on screen size
- **Flexible Grid**: Cards adapt to available space

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Usage

1. **Desktop**: Use the circular arrow button at the bottom of the sidebar
2. **Mobile/Tablet**: Use the hamburger menu button in the top-left
3. **Keyboard**: Tab navigation and Enter/Space to activate
4. **Touch**: Swipe right from left edge to open, swipe left to close

## Customization

### Colors
- Primary: #2c3e50 (Dark blue-gray)
- Secondary: #34495e (Lighter blue-gray)
- Accent: #3498db (Blue)
- Background: #f8f9fa (Light gray)

### Measurements
- Sidebar width (open): 280px
- Sidebar width (collapsed): 80px
- Animation duration: 0.3s
- Mobile breakpoint: 1024px

## Performance Features

- **Debounced Resize**: Prevents excessive function calls
- **Hardware Acceleration**: Uses transform3d for smooth animations
- **Minimal Repaints**: Optimized CSS properties for better performance
- **Event Delegation**: Efficient event handling

This implementation fully satisfies the task requirements and provides additional enhancements for a production-ready component.
