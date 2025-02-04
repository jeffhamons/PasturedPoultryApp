const COLORS = {
  // Theme Colors
  earthBrown: '#8B4513',    // Deep brown
  softGreen: '#7C9B72',     // Muted sage green
  lightGreen: '#A5C0A3',    // Lighter sage
  paleGreen: '#E8F0E7',     // Very light green
  sandBeige: '#F5E6D3',     // Warm beige
  darkBrown: '#5D4037',     // Dark brown for text
  accentGreen: '#4CAF50',   // For success states/buttons
  warningRed: '#FF6B6B',    // For warnings/errors
  alertYellow: '#FFD93D',   // For alerts/notifications

  // UI Colors
  background: '#FFFFFF',    // Default background
  text: '#000000',         // Primary text
  label: '#666666',        // Secondary text/labels
  border: '#E0E0E0',       // Border color
  
  // Status Colors
  success: '#4CAF50',      // Same as accentGreen
  error: '#FF6B6B',        // Same as warningRed
  warning: '#FFD93D',      // Same as alertYellow
  info: '#2196F3',         // Information blue
  
  // Component-specific colors can be added here
  statusPlanned: '#FFE0B2',  // Light orange for planned status
  statusActive: '#C8E6C9',   // Light green for active status
  statusCompleted: '#B2DFDB', // Light teal for completed status
  statusCancelled: '#FFCDD2'  // Light red for cancelled status
} as const;

export default COLORS;

// Add type for accessing color keys
export type ColorName = keyof typeof COLORS;

// Helper function to get status color
export function getStatusColor(status: string): string {
  switch (status.toUpperCase()) {
    case 'PLANNED':
      return COLORS.statusPlanned;
    case 'ACTIVE':
      return COLORS.statusActive;
    case 'COMPLETED':
      return COLORS.statusCompleted;
    case 'CANCELLED':
      return COLORS.statusCancelled;
    default:
      return COLORS.background;
  }
}