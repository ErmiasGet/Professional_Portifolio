/**
 * Shared navigation helpers so the Navbar, Footer and any consumer resolve
 * anchor links the same way and the header/drawer heights can never drift.
 */

/** CSS classes for the fixed header height. Add `sm:` variants here only. */
export const NAVBAR_HEIGHT_CLASS = "h-16 sm:h-18";

/** CSS classes that position the mobile drawer directly below the header. */
export const NAVBAR_DRAWER_TOP_CLASS = "top-16 sm:top-18";

/**
 * Anchor-aware link resolution.
 *
 * `#contact` should stay `#contact` on the homepage (smooth in-page scroll)
 * but become `/#contact` on any other page so the section can be reached.
 */
export function resolveHref(pathname: string, href: string): string {
  if (href.startsWith("#") && pathname !== "/") {
    return `/${href}`;
  }
  return href;
}