/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

exports.shouldUpdateScroll = ({ routerProps: { location } }) => {
    // Preserve scroll position when toggling query params / navivate()
    if (location.pathname.includes("/dessert-person/")) return false
}